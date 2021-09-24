import { groups } from "./fakeGroups";
export const users = [
  {
    _id: "6b21ca3eeb7f6fbccd471818",
    user: "Hadas",
    groups: [
      { _id: "3b21ca3eeb7f6fbccd471818" },
      { _id: "3b21ca3eeb7f6fbccd471820" },
    ],
  },
  {
    _id: "6b21ca3eeb7f6fbccd471814",
    user: "Rira",
    groups: [
      { _id: "3b21ca3eeb7f6fbccd471814" },
      { _id: "3b21ca3eeb7f6fbccd471820" },
    ],
  },
  {
    _id: "6b21ca3eeb7f6fbccd471820",
    user: "Shahar",
    groups: [
      { _id: "3b21ca3eeb7f6fbccd471814" },
      { _id: "3b21ca3eeb7f6fbccd471820" },
    ],
  },
];

export function getUsers() {
  return users;
}

export function getUser() {
  return users.filter((u) => u);
}

export function getCurrUser() {
  return users[0];
}
