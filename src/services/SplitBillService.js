import axios from "axios";

class SplitBillService {
	allGroups = () => axios.get("/groups");
	groupById = (id) => axios.get(`/groups/${id}`);
	addGroup = ({ name }) => axios.post("/groups", { name });

	addExpence = (groupId, { title, sum, category, date }) => {
		return axios.post(`/groups/${groupId}`, { title, sum, category, date });
	}
}

export default new SplitBillService();
