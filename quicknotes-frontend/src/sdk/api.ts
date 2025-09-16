import axios from "axios";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM5NzcwNzc1NSwiaWF0IjoxNzU3Nzk0MTU1LCJqdGkiOiIzZDAzMjI5ZWU0NjI0MGQ5ODMwYjJmYWE1ZmQwZWY4YyIsInVzZXJfaWQiOiIxIn0.vigR__GU_YbuOBpSplu6TSPb0td4LFE_3wunR3BLqu4"
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

export type PaginatedResponse<T> = {
  next: string | null,
  previous: string | null,
  data: T[]
};

async function getHome(): Promise<string> {
  const res = await api.get("/");
  return res.data
}

async function getNotes(url: string | null, params?: {
  collection_id?: number
}): Promise<PaginatedResponse<Note>> {
  const res = await api.get(url ? url : "/api/notes/", {params});
  return res.data; 
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
