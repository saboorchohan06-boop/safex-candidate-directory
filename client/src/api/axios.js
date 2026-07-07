import axios from "axios";

// Points straight at your existing candidate routes.
// GET    /            -> get all candidates
// GET    /:id         -> get one candidate
// POST   /            -> create candidate
// PUT    /:id         -> update candidate
// DELETE /:id         -> delete candidate
const api = axios.create({
  baseURL: "http://localhost:5000/api/candidates",
});

export default api;
