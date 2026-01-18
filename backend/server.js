const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
//mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/TODOAPP2')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        console.log('Database Name:', mongoose.connection.name);
})
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));