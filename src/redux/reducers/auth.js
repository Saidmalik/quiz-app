import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};
export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.token = action.token;
    },
    authLogOut: (state) => {
      state.token = null;
    },
  },
});

export const { authSuccess, authLogOut } = authReducer.actions;
export default authReducer.reducer;

// import { AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes';

// const initialState = {
//   token: null,
// };
// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AUTH_SUCCESS:
//       return {
//         ...state,
//         token: action.token,
//       };
//     case AUTH_LOGOUT:
//       return {
//         ...state,
//         token: null,
//       };

//     default:
//       return state;
//   }
// };
