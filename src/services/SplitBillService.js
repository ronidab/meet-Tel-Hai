import axios from "axios";

class SplitBillService {
  allGroups = () => axios.get("/groups");
  groupById = (id) => axios.get(`/groups/${id}`);
  addGroup = ({ name }) => axios.post("/groups", { name });

  addExpense = (groupId, { title, sum, category, date }) => {
    return axios.post(`/groups/${groupId}`, { title, sum, category, date });
  };
  deleteExpense = (groupId, expense) => {
    console.log("delete");

    return axios.delete(`/groups/${groupId}`, expense);
  };
}

export default new SplitBillService();
