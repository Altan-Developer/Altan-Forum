// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2TBDAI7AseqZSMnVgyBuqbKhmqnjsPRU",
  authDomain: "altan-forum.firebaseapp.com",
  databaseURL: "https://altan-forum-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "altan-forum",
  storageBucket: "altan-forum.appspot.com",
  messagingSenderId: "490273623604",
  appId: "1:490273623604:web:93c774600c5d13a3240461",
  measurementId: "G-V8NL4Q4RF2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentRef = ref(db, "komentar");

const commentBox = document.querySelector("textarea");
const commentList = document.getElementById("comments");

// Submit komen ke Firebase
commentBox.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const isi = commentBox.value.trim();
    if (isi !== "") {
      push(commentRef, { text: isi });
      commentBox.value = "";
    }
  }
});

// Ambil komen dari Firebase
onChildAdded(commentRef, function(snapshot) {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.className = "comment";
  div.textContent = "Netijen +62: " + data.text;
  commentList.prepend(div);
});