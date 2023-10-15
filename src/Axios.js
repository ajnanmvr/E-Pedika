import axios from "axios";

const Axios = axios.create({
baseURL: "http://localhost:5000/api",
// baseURL: "https://e-pedika-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    Authorization:`${localStorage.getItem('token')}`
  },
  withCredentials: true,

});

export default Axios;