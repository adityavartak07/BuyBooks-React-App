import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null,isAuthenticated:false }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state,isAuthenticated:true, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state,isAuthenticated:false, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
