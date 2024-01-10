const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');

const app = express();

// Connect to MongoDB
require("./config/database").connect();
// mongoose.connect('mongodb://localhost:27017/eventManagement', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user/', userRoutes);
app.use('/event/', eventRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
