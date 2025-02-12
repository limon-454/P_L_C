import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

// Login functionality
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in!");
        document.getElementById("profile-section").classList.remove("hidden");
        loadPosts(); // Load posts once logged in
    } catch (error) {
        alert(error.message);
    }
});

// Upload profile picture
document.getElementById("uploadPicBtn").addEventListener("click", () => {
    const file = document.getElementById("profile-pic").files[0];
    if (file) {
        // Upload image logic here
    }
});

// Post functionality
document.getElementById("postBtn").addEventListener("click", async () => {
    const postText = document.getElementById("post-input").value;
    const user = auth.currentUser;

    if (postText && user) {
        await addDoc(collection(db, "posts"), {
            text: postText,
            uid: user.uid,
            displayName: user.email,
            timestamp: new Date(),
            comments: []
        });

        document.getElementById("post-input").value = ''; // Clear the input
    } else {
        alert("Please log in and enter a post.");
    }
});

// Load posts in real-time
const loadPosts = () => {
    const postsContainer = document.getElementById("posts-container");

    onSnapshot(collection(db, "posts"), (snapshot) => {
        postsContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const post = doc.data();
            postsContainer.innerHTML += `
                <div class="post">
                    <strong>${post.displayName}</strong>
                    <p>${post.text}</p>
                    <div class="comment-section">
                        <input type="text" id="comment-input-${doc.id}" placeholder="Add a comment"/>
                        <button onclick="addComment('${doc.id}')">Comment</button>
                    </div>
                </div>
            `;
        });
    });
};

// Add comment to post
const addComment = async (postId) => {
    const commentText = document.getElementById(`comment-input-${postId}`).value;
    const user = auth.currentUser;

    if (commentText && user) {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            comments: arrayUnion({
                text: commentText,
                uid: user.uid,
                displayName: user.email,
                timestamp: new Date(),
            }),
        });

        document.getElementById(`comment-input-${postId}`).value = ''; // Clear the input
    }
};

// Real-time chat functionality
document.getElementById("sendBtn").addEventListener("click", async () => {
    const message = document.getElementById("message-input").value;
    const user = auth.currentUser;

    if (message && user) {
        await addDoc(collection(db, "messages"), {
            text: message,
            uid: user.uid,
            displayName: user.email,
            timestamp: new Date(),
        });

        document.getElementById("message-input").value = ''; // Clear the input
    } else {
        alert("Please log in and enter a message.");
    }
});

// Load chat messages in real-time
const loadMessages = () => {
    const messagesContainer = document.getElementById("messages-container");

    onSnapshot(collection(db, "messages"), (snapshot) => {
        messagesContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const msg = doc.data();
            messagesContainer.innerHTML += `
                <div class="message">
                    <strong>${msg.displayName}:</strong> ${msg.text}
                </div>
            `;
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
    });
};
