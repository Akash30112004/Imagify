import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

// Defensive: normalize accidental double-slashes in paths (e.g. //api/user/login)
app.use((req, _res, next) => {
	if (req.url && req.url.includes('//')) {
		req.url = req.url.replace(/\/{2,}/g, '/')
	}
	next()
})

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res) => res.send('API is Working'))
app.get('/api', (req, res) => res.send('API is Working'))

export default app