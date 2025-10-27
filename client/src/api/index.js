import axios from 'axios';

// Use REACT_APP_API_URL when provided (useful for local dev or different environments).
// Fallback to localhost:5000 for development if the env var isn't set.
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchBook = (id) => API.get(`/books/${id}`);
export const fetchBooks = (page) => API.get(`/books?page=${page}`);
export const fetchBooksBySearch = (searchQuery) => API.get(`/books/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createBook = (newBook) => API.post('/books', newBook);
export const likeBook = (id) => API.patch(`/books/${id}/likeBook`);
export const updateBook = (id, updatedBook) => API.patch(`/books/${id}`, updatedBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
