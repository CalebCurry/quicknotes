import axios from "axios";

//const jwt =
//  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM5ODI4Mzk3MywiaWF0IjoxNzU4MzcwMzczLCJqdGkiOiIyOTI5YzE3MTNkMzg0Yjg0OWU3MTBlZGYzZTgxOTg4MyIsInVzZXJfaWQiOiIxIn0.5d3O3hAK5mdChp6p-x5jbuxSXoZF5HSSV_pA3AUrnpQ"

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    //Authorization: `Bearer ${jwt}`,
  },
});


// Add a request interceptor
api.interceptors.request.use((config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  }, (error) => Promise.reject(error)
);


let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;


api.interceptors.response.use((response) => {
  return response;
}, async (error) => 
  {
    if (error.response.status == 401 && !error.config._retry && !error.config.url.includes("/api/auth/refresh/")) {
      error.config._retry = true;

      console.log(isRefreshing)
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = (async () => { 
          try { 

            const refresh = localStorage.getItem("refresh"); 
            const res = await api.post("/api/auth/refresh/", {
            refresh,
            });

            const newAccess = res.data.access;
            const newRefresh = res.data.refresh;
            localStorage.setItem("access", newAccess);
            localStorage.setItem("refresh", newRefresh);

            //Allow you to see the pause
            //await new Promise((resolve) => setTimeout(resolve, 5000));
            return newAccess;
            
          } finally { 
            isRefreshing = false;
          }
        })();
      }

      const newAccess = await refreshPromise;
      error.config.headers.Authorization = `Bearer ${newAccess}`;
      return api.request(error.config);
    }
  }
);


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

export type User = {
  id?: number,
  email?: string,
  password?: string,
  username: string,
}
// Register a new user
async function register(data: User) {
  const res = await api.post("/api/auth/register/", data);
    if (res.data.access && res.data.refresh) {
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
  }
  return res.data;
}

// Login an existing user
async function login(data: User) {
  const res = await api.post("/api/auth/login/", data);
    if (res.data.access && res.data.refresh) {
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
  }
  return res.data;
}


async function getNotes(url?: string | null, params?: {
  collection_id?: number
  page_size?: number
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

    register,
    login
};
