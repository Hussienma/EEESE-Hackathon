import React, { useState } from "react";

export const RegisterDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
    profession: "",
  });

  const { name, username, password, password2, profession } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("here");
    if (password !== password2) {
      console.log("Passwords don't match");
    } else {
      console.log(formData);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <label for="name" className="large-label">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => onChange(e)}
          type="text"
          name="name"
          placeholder=""
        />
      </div>
      <div>
        <label for="Username" className="large-label">
          Username
        </label>
        <input
          id="Username"
          name="username"
          type="text"
          placeholder=""
          value={username}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <label for="name" className="large-label">
          Password
        </label>
        <input
          id="name"
          name="password"
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <label for="email" className="large-label">
          Confirm Password
        </label>
        <input
          id="password"
          name="password2"
          type="password"
          placeholder=""
          value={password2}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <label for="profession" className="large-label">
          Profession
        </label>
        <input
          name="profession"
          id="profession"
          type="text"
          placeholder=""
          value={profession}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="full-width">
        <button type="submit">Register Patient</button>
      </div>
    </form>
  );
};

export default RegisterDoctor;
