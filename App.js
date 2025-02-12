import { useState } from "react";
import Auth from "./components/Auth";
import Post from "./components/Post";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>Social Media App</h1>
      {user ? <Post user={user} /> : <Auth setUser={setUser} />}
    </div>
  );
}