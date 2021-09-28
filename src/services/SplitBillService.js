import axios from "axios";

class SplitBillService {
  allGroups = () => axios.get("/groups");
  groupById = (id) => axios.get(`/groups/${id}`);
  addGroup = ({ name }) => axios.post("/groups", { name });

  addExpense = (groupId, { title, sum, category, date }) => {
    return axios.post(`/groups/${groupId}`, { title, sum, category, date });
  };
  deleteExpense = (groupId, expenseId) => {
    return axios.delete(`/groups/${groupId}/${expenseId}`);
  };
  joinGroup = (groupId) => {
    return axios.post(`/groups/${groupId}/join`);
  };
}

export default new SplitBillService();
