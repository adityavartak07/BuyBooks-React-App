import axios from 'axios';

const API = axios.create({ baseURL: 'https://bookswale.herokuapp.com/' });

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
