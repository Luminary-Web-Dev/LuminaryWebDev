import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyCwuxhS7Jv3jb09RAeiDyiRaQdgM2ZtuWQ",
  authDomain: "luminarywebdev.firebaseapp.com",
  projectId: "luminarywebdev",
  storageBucket: "luminarywebdev.firebasestorage.app",
  messagingSenderId: "780856317271",
  appId: "1:780856317271:web:9a2d86d54065d2367c9a12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load menu from Firestore
async function loadMenu() {
  const querySnapshot = await getDocs(collection(db, "menu"));
  const container = document.getElementById("menu-items");

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const dish = doc.data();

    container.innerHTML += `
      <div class="dish-card">
        <img src="${dish.image}" alt="${dish.title}">
        <h3>${dish.title}</h3>
        <p>${dish.description}</p>
      </div>
    `;
  });
}

loadMenu();
