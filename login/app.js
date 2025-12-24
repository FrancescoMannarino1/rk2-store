

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js"; // ✅ correct URL
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDDS7Co_EloBwRL1OP0Whd_JpU5XSTnHJo",
  authDomain: "rk2store.firebaseapp.com",
  projectId: "rk2store",
  storageBucket: "rk2store.firebasestorage.app",
  messagingSenderId: "141845560678",
  appId: "1:141845560678:web:6a174e271b3c46a5431ca7",
  measurementId: "G-9MT2TWTT7M"
};
const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

// Initialize Auth
const auth = getAuth(app);


// Use persistent login
setPersistence(auth, browserLocalPersistence);

// ------------------ DOM ELEMENTS ------------------
// Login/Register elements (might not exist on home page)
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

const regUsername = document.getElementById("regUsername");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const registerBtn = document.getElementById("registerBtn");

// Home page user dropdown
const userContainer = document.getElementById('userContainer');
const userButton = document.getElementById('userButton');
const userDropdown = document.getElementById('userDropdown');
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

// ------------------ REGISTER ------------------
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const username = regUsername.value;
    const email = regEmail.value;
    const password = regPassword.value;

    if(!username || !email || !password){
      alert("Please fill all fields!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => updateProfile(userCredential.user, { displayName: username }))
      .then(() => {
        window.location.href = "../index.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ------------------ LOGIN ------------------
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    if(!email || !password){
      alert("Please fill all fields!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(`Welcome ${userCredential.user.displayName || email}!`);
        window.location.href = "../index.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ------------------ AUTH STATE ------------------
onAuthStateChanged(auth, (user) => {
  if (user && userButton && userDropdown && usernameDisplay && logoutBtn) {

    const username = user.displayName || user.email;

    usernameDisplay.innerText = username;
    userButton.innerHTML = `<i class="fa-solid fa-user"></i> ${username}`;

    // 🔥 REMOVE LINK WHEN LOGGED IN
    userButton.removeAttribute("href");

    userButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      userDropdown.classList.toggle("hidden");
    });

    logoutBtn.onclick = async () => {
      await signOut(auth);
      window.location.reload();
    };

  } else if (userButton) {
    userButton.innerText = "Login";
    userButton.href = "./login/login.html";
    userDropdown?.classList.add("hidden");
  }
});

// Close dropdown if clicking outside
window.addEventListener('click', (e) => {
  if(userContainer && !userContainer.contains(e.target)){
    userDropdown.classList.add('hidden');
  }
});

// ------------------ FORM SWITCH ------------------
function showLogin() {
  document.getElementById("register")?.classList.add("hidden");
  document.getElementById("login")?.classList.remove("hidden");
}

function showRegister() {
  document.getElementById("login")?.classList.add("hidden");
  document.getElementById("register")?.classList.remove("hidden");
}

window.showLogin = showLogin;
window.showRegister = showRegister;

