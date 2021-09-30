const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const GroupModel = require("../models/Group");
const UserModel = require("../models/User");

// get groups
router.get("/", async (req, res) => {
	const { userId } = req.user;
	const result = await GroupModel.find({ members: userId })
		.populate("members", "name")
		.populate("expenses.user", "name")
		.lean();
	res.send(result);
});

// get single group
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await GroupModel.findById(id)
		.populate("members", "name")
		.populate("expenses.user", "name")
		.lean();
	res.send(result);
});

// create group
router.post("/", async (req, res) => {
	const { userId } = req.user;
	const user = await UserModel.findById(userId);
	const { name } = req.body;
	const group = await GroupModel.create({
		name,
		members: [{ _id: user.id }],
	});
	user.groups.push({ _id: group.id });
	await user.save();
	res.send(group);
});

//add expense to group
router.post("/:groupId", async (req, res) => {
	const groupId = req.params.groupId;
	const { userId } = req.user;
	const { title, sum, category, date } = req.body;
	let group = await GroupModel.findById(groupId);
	if (!group) return res.status(404);
	// There is no such thing ExpenseModel

	const expense = {
		_id: new mongoose.Types.ObjectId(),
		title,
		sum,
		category,
		date,
		user: userId,
	};
	group.expenses.push(expense);
	group = await group.save();
	group = await group.populate("expenses.user", "name");
	let output = group.expenses.find((x) => x._id === expense._id);
	res.send(output);
});

// delete expense
router.delete("/:groupId/:expenseId", async (req, res) => {
	const { groupId, expenseId } = req.params;
	let group = await GroupModel.findById(groupId);
	if (!group) return res.status(404);
	try {
		const index = group.expenses.findIndex((x) => x._id.toString() === expenseId);
		group.expenses.splice(index, 1);
		await group.save();
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(400);
	}
});

// join group

router.post("/:groupId/join", async (req, res) => {
	const { userId } = req.user;
	const { groupId } = req.params;

	const user = await UserModel.findById(userId);
	if (!user) return res.status(404);
	const group = await GroupModel.findById(groupId);
	if (!group) return res.status(404);
	// check if user is allredy in the group
	const index = group.members.findIndex((x) => x._id.toString() === userId);

	if (index >= 0) {
		return res.send(group);
	}
	//push user into group's users and group into user's groups

	user.groups.push({ _id: groupId });
	group.members.push({ _id: userId });
	await user.save();
	await group.save();
	res.send(group);
});

module.exports = router;
