const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

mongoose.connect("mongodb+srv://seniya:8116@eutechassesment.x0qyyyq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log(err);
});

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const bookRouter = require('./routes/bookRoute');
app.use('/api/books', bookRouter);