import axios from "axios";

class meetTelHaiService {
	allMatches = () => axios.get("/api/match");
	matchById = (id) => axios.get(`/api/match/${id}`);
	addMatch = ({ name }) => axios.post("/api/match", { name });

	addExpense = (matchId, { title, sum, category, date }) => {
		return axios.post(`/api/match/${matchId}`, { title, sum, category, date });
	};
	deleteExpense = (matchId, expenseId) => {
		return axios.delete(`/api/match/${matchId}/${expenseId}`);
	};
	joinMatch = (matchId) => {
		return axios.post(`/api/match/${matchId}/join`);
	};
}

export default new meetTelHaiService();
