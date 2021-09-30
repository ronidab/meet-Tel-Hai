import axios from "axios";

class SplitBillService {
	allGroups = () => axios.get("/api/groups");
	groupById = (id) => axios.get(`/api/groups/${id}`);
	addGroup = ({ name }) => axios.post("/api/groups", { name });

	addExpense = (groupId, { title, sum, category, date }) => {
		return axios.post(`/api/groups/${groupId}`, { title, sum, category, date });
	};
	deleteExpense = (groupId, expenseId) => {
		return axios.delete(`/api/groups/${groupId}/${expenseId}`);
	};
	joinGroup = (groupId) => {
		return axios.post(`/api/groups/${groupId}/join`);
	};
}

export default new SplitBillService();
