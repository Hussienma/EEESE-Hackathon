const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
