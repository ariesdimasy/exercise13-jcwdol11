import axios from "axios";

const fetchUsers = () => {
  return axios.get("http://localhost:4440/users");
};

const addUser = (data) => {
  return axios.post("http://localhost:4440/users", data);
};

const login = (params) => {
  let newParams = { username: params.username, password: params.password };

  // validasi pengechekan apakah dia email atau bukan ?
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  console.log("valid regex error");

  if (params.username.match(validRegex)) {
    newParams = { email: params.username, password: params.password };
  }

  return axios.get("http://localhost:4440/users", {
    params: newParams,
  });
};

export default {
  fetchUsers,
  login,
  addUser,
};
