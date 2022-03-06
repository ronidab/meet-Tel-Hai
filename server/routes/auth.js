const express = require("express");
const jwtHelper = require("jsonwebtoken");
const UserModel = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
	const { name, gender, attract_to, email, password} = req.body;
	console.log("Route Auth Recieving Registration Request with the following:");
	console.log(name,gender,attract_to,email,password);
	let user = await UserModel.findOne({ email });
	if (user !== null) {
		return res.sendStatus(400);
		console.log("User already exists")
	}
	user = await UserModel.create({ name, gender, attract_to, email, password });
	console.log("Creation of user model sucessfull");
	console.log(user);
	const token = jwtHelper.sign(
		{
			userId: user._id,
			userName: user.name,
		},
		process.env.JWT_SECRET
	);
	res.send({ token });
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log("routing posting email + password")
	console.log(email,password)
	let user = await UserModel.findOne({ email, password });
	if (user === null) {
		console.log("user is null")
		return res.sendStatus(400);
	}
	const token = jwtHelper.sign(
		{
			userId: user._id,
			userName: user.name,
		},
		process.env.JWT_SECRET
	);

	res.send({ token });
});

module.exports = router;