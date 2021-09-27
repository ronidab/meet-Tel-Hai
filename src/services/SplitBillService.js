import axios from "axios";

class SplitBillService {
  allGroups = () => axios.get("/groups");
  groupById = (id) => axios.get(`/groups/${id}`);
  addGroup = ({ name }) => axios.post("/groups", { name });
  addExpence = (groupId, { title, sum, category, date }) =>
    axios.post(`/group/${groupId}`, { title, sum, category, date });
}

export default new SplitBillService();
