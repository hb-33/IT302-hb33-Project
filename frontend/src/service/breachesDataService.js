//Harshit Bansal, 4/26/24, IT302-002, Phase 5 Assignment: CUD Node.js Data using React.js, hb33@njit.edu

import axios from "axios";

class BreachDataService {


  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches?page=${page}`
    );
  }
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches/id/${id}`
    );
  }

  
  find(query, by = "name", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches?${by}=${query}&page=${page}`
    )
  }
  find(query, by = "domain", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches?${by}=${query}&page=${page}`
    )
  }

  createAnalysis(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches/analysis`, data)
  }

  updateAnalysis(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches/analysis`, data)
  }
  deleteAnalysis(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/hb33/breaches/analysis`,
      { data: { analysis_id: id, user_id: userId } }
    )
  }
}
export default new BreachDataService();
