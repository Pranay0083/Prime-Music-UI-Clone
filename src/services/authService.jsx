import axios from 'axios';

const API_URL = 'https://academics.newtonschool.co/api/v1/user';

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
    appType: 'music',
  }, {
    headers: {
      'Content-Type': 'application/json',
      'projectID': 'f104bi07c490',
      'accept': 'application/json'
    }
  });
};

export const signup = (name, email, password) => {
  return axios.post(`${API_URL}/signup`, {
    name,
    email,
    password,
    appType: 'music',
  }, {
    headers: {
      'Content-Type': 'application/json',
      'projectID': 'f104bi07c490',
      'accept': 'application/json'
    }
  });
};

export const logout = () => {
  // Implement logout functionality if required
};
