require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const groupRouter = require("./routes/groups");
const authRouter = require("./routes/auth");
const path = require('path');
const jwtMiddleware = require("./middleware/jwt");


mongoose
	.connect(process.env.DB_URI, {
		auth: {
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		useNewUrlParser: true,
	})
	.then(() => console.log("connected to DB"));

const port = process.env.PORT || 3001;

const app = express();

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('/build'));
// }
app.use(express.static('build'));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/groups', jwtMiddleware, groupRouter);
app.get('/*', (req, res) => {
	res.sendFile(path.resolve('build/index.html'));
})

// http://localhost:3000/groups 
app.listen(port);
