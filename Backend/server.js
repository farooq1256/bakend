
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth/auth-routes.js'

dotenv.config();

const app = express();


// Connect to MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, {
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Server is running...');
});


// Enable CORS with specific configurations
app.use(
    cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET','POST','DELETE','PUT'],
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ]
}));


// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRoutes);




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
