import "../cssFiles/Signup.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

const SignupPage = (props) => {
  const navigation = useNavigate();
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const createUser = await axios.post(`${env.BACKEND_URL}/signup`, {
        first_name: fn,
        last_name: ln,
        username: username,
        age: age,
        role: role,
        email: email,
        password: password,
      });
      // console.log(createUser);
      navigation("/signin");
    } catch (error) {
      setError("Fill all the boxes");
    }
  };
  const handleClick = () => {
    setError("errorRemove");
  };
  return (
    <div className='signup'>
      <h2>Sign up for an accout!</h2>

      {error && <div className={`${error} errorDisplay`}>{error}</div>}

      <form onSubmit={handleSubmit} className='signup-form'>
        <div>
          <label htmlFor='signup-fn'>First Name:</label>
          <input
            id='signup-fn'
            value={fn}
            onChange={(e) => setFn(e.target.value)}
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor='signup-ln'>Last name:</label>
          <input
            id='signup-ln'
            value={ln}
            onChange={(e) => setLn(e.target.value)}
            onClick={handleClick}
          />
        </div>

        <div>
          <label htmlFor='signup-username'>Username:</label>
          <input
            id='signup-username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor='signup-age'>Age:</label>
          <input
            id='signup-age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor='signup-email'>Email:</label>
          <input
            id='signup-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor='signup-password'>Password:</label>
          <input
            id='signup-password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={handleClick}
          />
        </div>
        <div>
          <label htmlFor='role'>Choose a role:</label>

          <select
            name='role'
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onClick={handleClick}
          >
            <option>-----</option>
            <option value='Owner'>Owner</option>
            <option value='Renter'>Renter</option>
          </select>
          {/* <div>
            <label htmlFor='signup-role'>Role:</label>
            <input
              id='signup-role'
              type='text'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div> */}
        </div>
        <div>
          <input type='submit' value='Sign up!'></input>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
