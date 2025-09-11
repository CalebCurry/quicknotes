import axios from "axios";

const api = axios.create({
  baseURL: "http://webdev:8000",
  headers: {
    Authorization: "Bearer 123"
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