const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MatchModel = require("../models/Match");
const UserModel = require("../models/User");

// get matches
router.get("/", async (req, res) => {
	const { userId } = req.user;
	const result = await MatchModel.find({ members: userId })
		.populate("members", "name")
		.populate("expenses.user", "name")
		.lean();
	res.send(result);
});

// get single match
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await MatchModel.findById(id)
		.populate("members", "name")
		.populate("expenses.user", "name")
		.lean();
	res.send(result);
});

// create match
router.post("/", async (req, res) => {
	const { userId } = req.user;
	const user = await UserModel.findById(userId);
	const { name } = req.body;
	const match = await matchModel.create({
		name,
		members: [{ _id: user.id }],
	});
	user.matches.push({ _id: match.id });
	await user.save();
	res.send(match);
});

//add expense to match
router.post("/:matchId", async (req, res) => {
	const matchId = req.params.matchId;
	const { userId } = req.user;
	const { title, sum, category, date } = req.body;
	let match = await MatchModel.findById(MatchId);
	if (!match) return res.status(404);
	// There is no such thing MsgModel

	const expense = {
		_id: new mongoose.Types.ObjectId(),
		title,
		sum,
		category,
		date,
		user: userId,
	};
	match.expenses.push(expense);
	match = await match.save();
	match = await match.populate("expenses.user", "name");
	let output = match.expenses.find((x) => x._id === expense._id);
	res.send(output);
});

// delete expense
router.delete("/:matchId/:expenseId", async (req, res) => {
	const { matchId, expenseId } = req.params;
	let match = await MatchModel.findById(matchId);
	if (!match) return res.status(404);
	try {
		const index = match.expenses.findIndex((x) => x._id.toString() === expenseId);
		match.expenses.splice(index, 1);
		await match.save();
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

// join match

router.post("/:matchId/join", async (req, res) => {
	const { userId } = req.user;
	const { matchId } = req.params;

	const user = await UserModel.findById(userId);
	if (!user) return res.status(404);
	const match = await MatchModel.findById(matchId);
	if (!match) return res.status(404);
	// check if user is allredy in the match
	const index = match.members.findIndex((x) => x._id.toString() === userId);

	if (index >= 0) {
		return res.send(match);
	}
	//push user into match's users and match into user's match

	user.match.push({ _id: matchId });
	match.members.push({ _id: userId });
	await user.save();
	await match.save();
	res.send(match);
});

module.exports = router;
