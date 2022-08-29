const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
require('dotenv').config();

const port = 5000;

app.use(cors());
app.use(express.json({ extended: false }));
app.use('/images', express.static('images'))
const uri = "mongodb+srv://tushar:Manthan8*@cluster0.hfuyfkj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo DB success');
});



const employeeRouter = require('./router/employee');
app.use('/employee', employeeRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})