import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import connectDB from './db/dbConfig';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send(`Hi, It's working!`);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})