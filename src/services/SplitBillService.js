import axios from 'axios';

class SplitBillService {
	allGroups = () => axios.get("/groups");
	groupById = (id) => axios.get(`/groups/${id}`);
	addGroup = ({ name }) => axios.post('/groups', { name });
}


export default new SplitBillService();