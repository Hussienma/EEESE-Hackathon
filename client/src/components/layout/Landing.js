import React, { useState } from "react";

export const Landing = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="center">
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("success");
        }}
      >
        <div className="txt_field">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login" />
        <div className="signup_link">You need to be a member to sign in.</div>
      </form>
    </div>
  );
};

export default Landing;
