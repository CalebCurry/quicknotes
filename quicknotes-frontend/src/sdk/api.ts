import axios from "axios";

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3NjQ5MDU0LCJpYXQiOjE3NTc2NDYwNTQsImp0aSI6ImY1Mjc1ZTlkODIyMDQzYTA5ZTQ4YjVjMjM4ZTA1NGFhIiwidXNlcl9pZCI6IjEifQ.g0us1y-qu61wlO5oSgeku-3yxm5wOP8T4kWeO0EmqU8';

const api = axios.create({
  baseURL: "http://webdev:8000",
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

async function getHome(): Promise<string> {
  const res = await api.get<string>("/");
  return res.data;
}

async function getNotes(): Promise<any[]> {
  const res = await api.get<any[]>("/api/notes/");
  return res.data;
}

export default {
  getHome,
  getNotes
}