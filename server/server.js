import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000
const app = express();

app.use(express.json());
app.use(cors());

// Defensive: normalize accidental double-slashes in paths (e.g. //api/user/login)
app.use((req, _res, next) => {
	if (req.url && req.url.includes('//')) {
		req.url = req.url.replace(/\/\/{2,}/g, '/')
	}
	next()
})

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res) => res.send('API is Working'))

const start = async () => {
	try {
		await connectDB();
	} catch (error) {
		console.error('Database connection failed:', error?.message || error);
	}

	app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`))
}

start()