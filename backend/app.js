const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRoute = require('./api/modules/user/user.routes');
const applicationRoutes = require('./api/modules/application/application.routes');

require('dotenv/config')

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connection established...")
);
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});


app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/application",applicationRoutes)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;