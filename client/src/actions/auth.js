import axios from "axois";

export const register =
  ({ name, profession, username, password }) =>
  async (dipatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, profession, username, password });

    try {
      const res = await axios.post("/doctors", body, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
      });
    }
  };
