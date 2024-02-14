import { createContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticate: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticate: false,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticate }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "LOGIN",
        payload: FAKE_USER,
      });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
