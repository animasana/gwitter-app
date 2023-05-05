import { auth } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = null;
      if (isNew) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleAccount = () => setIsNew((prev) => !prev);

  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          className="authInput"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="on"
          required
          value={password}
          className="authInput"
        />
        <input
          type="submit"
          value={isNew ? "Create Account" : "Log In"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {isNew ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
