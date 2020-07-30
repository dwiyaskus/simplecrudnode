import http from "./urlEnv";

class Services {
  getAll() {
    return http.get("/getAllUsers");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(data) {
    return http.put(`/users`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new Services();
