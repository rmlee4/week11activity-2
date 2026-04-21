import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyAVAbp_egSYPJGxGr0o7nG_a0E-iUd_B_w",
  authDomain: "week11groupactivity-2.firebaseapp.com",
  projectId: "week11groupactivity-2",
  storageBucket: "week11groupactivity-2.firebasestorage.app",
  messagingSenderId: "709593184150",
  appId: "1:709593184150:web:9d82f8bc7830673fa58fb7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const outputDiv = document.getElementById("output");

function displayResults(title, docs) {
  let html = `<h2>${title}</h2>`;
  if (docs.length === 0) {
    html += `<p>No results found.</p>`;
  } else {
    html += "<ul>";
    docs.forEach(doc => {
      html += `<li>${JSON.stringify(doc.data())}</li>`;
    });
    html += "</ul>";
  }
  outputDiv.innerHTML += html;
}

const teams = [
  {
    teamName: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Ronaldo", "Benzema", "Hazard"],
    fans: 798,
    isNationalTeam: false
  },
  {
    teamName: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    topScorers: ["Messi", "Suarez", "Puyol"],
    fans: 738,
    isNationalTeam: false
  },
  {
    teamName: "Manchester United",
    city: "Manchester",
    country: "England",
    topScorers: ["Cantona", "Rooney", "Ronaldo"],
    fans: 755,
    isNationalTeam: false
  },
  {
    teamName: "Manchester City",
    city: "Manchester",
    country: "England",
    topScorers: ["Sterling", "Aguero", "Haaland"],
    fans: 537,
    isNationalTeam: false
  },
  {
    teamName: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
    fans: 950,
    isNationalTeam: true
  },
  {
    teamName: "Argentina National Team",
    city: "Not applicable",
    country: "Argentina",
    topScorers: ["Messi", "Batistuta", "Maradona"],
    fans: 888,
    isNationalTeam: true
  },
  {
    teamName: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Aragonés", "Griezmann", "Torez"],
    fans: 400,
    isNationalTeam: false
  }
];

async function addTeams() {
  for (const team of teams) {
    await addDoc(collection(db, "teams"), team);
  }
  console.log("All teams added");
}

// addTeams();

// query 1: Show all teams in Spain
async function getTeamsInSpain() {
  const q = query(collection(db, "teams"), where("country", "==", "Spain"));
  const snapshot = await getDocs(q);
  displayResults("Teams in Spain", snapshot.docs);
}

// query 2: Show all teams in Madrid, Spain
async function getTeamsInMadridSpain() {
  const q = query(
    collection(db, "teams"),
    where("country", "==", "Spain"),
    where("city", "==", "Madrid")
  );
  const snapshot = await getDocs(q);
  displayResults("Teams in Madrid, Spain", snapshot.docs);
}

// query 3: show all national teams
async function getNationalTeams() {
  const q = query(collection(db, "teams"), where("isNationalTeam", "==", true));
  const snapshot = await getDocs(q);
  displayResults("National Teams", snapshot.docs);
}
