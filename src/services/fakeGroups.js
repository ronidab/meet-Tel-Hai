import * as usersAPI from "./fakeUsers";
import axios from "axios";

export const groups = [
  {
    _id: "3b21ca3eeb7f6fbccd471818",
    name: "Me",
    groupsMemers: [{ _id: "6b21ca3eeb7f6fbccd471818" }],
    expenses: [
      {
        _id: "5b21ca3eeb7f6fbccd471815",
        title: "21.8.20-shopping",
        sum: 235.1,
        category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Groceries" },
        date: "2021-01-03T19:00:28.809Z",
        user: { _id: "6b21ca3eeb7f6fbccd471818", name: "Hadas" },
      },
      {
        _id: "5b21ca3eeb7f6fbccd471819",
        title: "april-electricity",
        sum: 115.3,
        category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Bills" },
        date: "2021-05-15T19:00:28.809Z",
        user: { _id: "6b21ca3eeb7f6fbccd471818", name: "Rira" },
      },
    ],
  },
  {
    _id: "3b21ca3הeeb7f6fbccd471814",
    name: "Green",
    groupsMemers: [
      { _id: "6b21ca3eeb7f6fbccd471814" },
      { _id: "6b21ca3eeb7f6fbccd471820" },
    ],
    expenses: [
      {
        _id: "5b21ca3eeb7f6fbccd471814",
        title: "21.8.20-shopping",
        sum: 25.2,
        category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Groceries" },
        date: "2021-01-03T19:00:28.809Z",
        user: { _id: "6b21ca3eeb7f6fbccd471814", name: "Hadas" },
      },
    ],
  },
  {
    _id: "3b21ca3eeb7f6fbccd471820",
    name: "Havradim4",
    groupsMemers: [
      { _id: "6b21ca3eeb7f6fbccd471818" },
      { _id: "6b21ca3eeb7f6fbccd471814" },
      { _id: "6b21ca3eeb7f6fbccd471820" },
    ],
    expenses: [
      {
        _id: "5b21ca3eeb7f6fbccd431815",
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
    ],
  },
];
//move expenses inside the group

export async function getGroups() {
  // try {
  //   const { data } = await axios.post("/groups", {
  //     name: this.state.groupName,
  //   });
  //   // add new group to navbar at to gruops
  //   this.props.onAddGroup(data);
  // } catch (err) {
  //   console.log(err);
  // }
  // return groups;
}

export function getGroup(groupId) {
  const group = groups.find((g) => g._id === groupId);
  console.log({ group });
  return group;
}
