import mongoose from 'mongoose';

let connectionPromise;

const buildMongoUri = () => {
    const raw = process.env.MONGODB_URI;

    if (!raw) {
        throw new Error('MONGODB_URI is missing');
    }

    // Handle accidental surrounding quotes from env dashboards.
    const cleaned = raw.trim().replace(/^['"]|['"]$/g, '');

    // If db name is already present, use as-is; otherwise append /imagify.
    const hasDbName = /mongodb\.net\/[^/?]+/.test(cleaned) && !/mongodb\.net\/?$/.test(cleaned);
    if (hasDbName) {
        return cleaned;
    }

    return `${cleaned.replace(/\/+$/, '')}/imagify`;
};

const connectDB = async () => {

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    mongoose.connection.on('connected', ()=>{
        console.log("Database connected");
        
    })

    connectionPromise = mongoose.connect(buildMongoUri())
        .then((connection) => {
            connectionPromise = null;
            return connection;
        })
        .catch((error) => {
            connectionPromise = null;
            throw error;
        });

    return connectionPromise;
}

export default connectDB;