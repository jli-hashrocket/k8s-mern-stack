const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const accountRoute = require('./routes/account');
require('dotenv').config();
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/pages');
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(`${__dirname}/public`)));

app.use('/', accountRoute);

const port = process.env.PORT || 8080;
console.log(process.env)
mongoose
	.connect(process.env.DB_HOST, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => {
		app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
	})
	.catch((err) => {
		console.log(err);
	});