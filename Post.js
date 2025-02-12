import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Post({ user }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const handlePost = async () => {
    if (!text) return;
    
    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "posts"), { text, imageUrl, user: user.email, timestamp: Date.now() });
    setText("");
    setImage(null);
    fetchPosts();
  };

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Create Post</h2>
      <input type="text" placeholder="What's on your mind?" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handlePost}>Post</button>
      <h3>Posts</h3>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.user}: {post.text}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" width="200px" />}
        </div>
      ))}
    </div>
  );
}