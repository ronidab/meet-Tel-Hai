import * as categoryAPI from "./fakeCategoryService";

const expenses = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "21.8.20-shopping",
    sum: 235.1,
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Groceries" },
    date: "2021-01-03T19:00:28.809Z",
    user: { _id: "6b21ca3eeb7f6fbccd471818", name: "Hadas" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    title: "21.8.20-shopping",
    sum: 25.2,
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Groceries" },
    date: "2021-01-03T19:00:28.809Z",
    user: { _id: "6b21ca3eeb7f6fbccd471818", name: "Hadas" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "april-electricity",
    sum: 115.3,
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Bills" },
    date: "2021-05-15T19:00:28.809Z",
    user: { _id: "6b21ca3eeb7f6fbccd471814", name: "Rira" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "party",
    sum: 69,
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Others" },
    date: "2021-05-16T19:00:28.809Z",
    user: { _id: "6b21ca3eeb7f6fbccd471820", name: "Shahar" },
  },
];

export function getExpenses() {
  return expenses;
}

export function getExpence(id) {
  return expenses.find((e) => e._id === id);
}

export function saveExpence(expense) {
  let expenceInDb = expenses.find((e) => e._id === expense._id) || {};
  expenceInDb.name = expense.name;
  expenceInDb.sum = expense.sum;
  expenceInDb.category = categoryAPI.category.find(
    (c) => c._id === expense.categoryId
  );
  expenceInDb.date = expense.date;
  expenceInDb.user = expense.user;

  if (!expenceInDb._id) {
    expenceInDb._id = Date.now();
    expenses.push(expenceInDb);
  }

  return expenceInDb;
}

export function deleteExpence(id) {
  let expenceInDb = expenses.find((e) => e._id === id);
  expenses.splice(expenses.indexOf(expenceInDb), 1);
  return expenceInDb;
}
