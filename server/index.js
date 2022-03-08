require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const matchRouter = require("./routes/matches");
const authRouter = require("./routes/auth");
const path = require('path');
const jwtMiddleware = require("./middleware/jwt");

const PORT = process.env.PORT || 3001;
const PRODUCTION = process.env.NODE_ENV === 'production'

mongoose
	.connect(process.env.DB_URI, {
		auth: {
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		useNewUrlParser: true,
	})
	.then(() => console.log("connected to DB"));


const app = express();
if (PRODUCTION) {
	app.use(express.static(path.resolve('build')));
}
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/match', jwtMiddleware, matchRouter);
if (PRODUCTION) {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('build/index.html'));
	})
}
app.listen(PORT);
