import axios from "axios";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3NzkwNDkxLCJpYXQiOjE3NTc3ODc0OTEsImp0aSI6ImM2OGJmYThlY2FlMzRiMWRhMjM5ZWE3YjliMGNlMDc0IiwidXNlcl9pZCI6IjEifQ.kcnSrj97hbFcdXVuALL2FG_YO9N6fHSo6iNV8qEzLmo"
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  },
});

export type Collection = {
  id?: number;
  name: string;
  notes?: Note[];
};

export type Note = {
  id?: number;
  title: string;
  content: string;
  collection?: number | null;
  collection_data?: Collection | null;
};

async function getHome(): Promise<string> {
  const res = await api.get("/");
  return res.data
}

async function getNotes(): Promise<Note[]> {
  const res = await api.get("/api/notes/");
  return res.data.data; 
}

async function getCollectionWithNotes(collectionId: number): Promise<Collection> {
  const res = await api.get(`/api/collections/${collectionId}/notes/`);
  return res.data.data; 
}

async function createNote(note: Note): Promise<Note> {
  const res = await api.post("/api/notes/", note);
  return res.data; //object itself not nested in data 
}

async function getNote(id: number): Promise<Note> {
  const res = await api.get(`/api/notes/${id}/`);
  return res.data.data; 
}

async function updateNote(id: number, note: Note): Promise<Note> {
  const res = await api.put(`/api/notes/${id}/`, note);
  return res.data; 
}

async function deleteNote(id: number): Promise<void> {
  await api.delete(`/api/notes/${id}/`);
}

async function getCollections(): Promise<Collection[]> {
  const res = await api.get("/api/collections/");
  return res.data.data;
}

async function getCollection(id: number): Promise<Collection> {
  const res = await api.get(`/api/collections/${id}/`);
  return res.data.data; 
}

async function createCollection(collection: Collection): Promise<Collection> {
  const res = await api.post("/api/collections/", collection);
  return res.data; 
}

async function updateCollection(id: number, collection: Collection): Promise<Collection> {
  const res = await api.put(`/api/collections/${id}/`, collection);
  return res.data;
}

async function deleteCollection(id: number): Promise<void> {
  await api.delete(`/api/collections/${id}/`);
}

export default {
    getHome,
    // notes
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote,

    // collections
    getCollections,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection,
    getCollectionWithNotes,
};
