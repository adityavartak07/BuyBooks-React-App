import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BOOK, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state = { isLoading: true, books: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        books: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, books: action.payload.data };
    case FETCH_BOOK:
      return { ...state, book: action.payload.book };
    case LIKE:
      return { ...state, books: state.books.map((book) => (book._id === action.payload._id ? action.payload : book)) };
    case CREATE:
      return { ...state, books: [...state.books, action.payload] };
    case UPDATE:
      return { ...state, books: state.books.map((book) => (book._id === action.payload._id ? action.payload : book)) };
    case DELETE:
      return { ...state, books: state.books.filter((book) => book._id !== action.payload) };
    default:
      return state;
  }
};

