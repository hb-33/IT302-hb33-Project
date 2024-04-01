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

  /*
  createReview(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/review`, data)
  }

  updateReview(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/review`, data)
  }
  deleteReview(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/review`,
      { data: { review_id: id, user_id: userId } }
    )
  }

  getRatings() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/ratings`)

  }
  */
}
export default new BreachDataService();
