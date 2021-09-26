import axios from "axios";

export const category = [
	{ _id: "5b21ca3eeb7f6fbccd471818", name: "Groceries" },
	{ _id: "5b21ca3eeb7f6fbccd471814", name: "Bills" },
	{ _id: "5b21ca3eeb7f6fbccd471820", name: "Others" },
];

export function getCategorys() {
	return category;
}

export function getCategory() {
	return category.filter((g) => g);
}
