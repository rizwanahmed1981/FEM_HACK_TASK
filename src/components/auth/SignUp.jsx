import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Sign Up with Google
        </button>
        <p className="mt-2 text-center">
          Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;