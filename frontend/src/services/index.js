import axios from "axios";
let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "here should be your production endpoint")
  : (baseURL = "http://localhost:3000");

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get("/");
  },
  signup: async (user) => {
    return await service.post("/signup", user);
  },
  login: async (user) => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },
  getProfile: async () => {
    return await service.get("/profile");
  },
  getUserInfo: async () => {
    return await service.get("/info");
  },
  getAllEmployers: async () => {
    return await service.get("/employers");
  },
  requestEmployer: async (employerId) => {
    return await service.get(`/requestEmployer/${employerId}`);
  },
  getPois: async () => {
    return await service.get(`/pois`);
  },
};

export default MY_SERVICE;
