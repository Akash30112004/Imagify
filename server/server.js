import 'dotenv/config';

import app from './app.js';
import connectDB from './config/mongodb.js';

const PORT = process.env.PORT || 4000

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`))
	} catch (error) {
		console.error('Database connection failed:', error?.message || error)
		process.exit(1)
	}
}

start()