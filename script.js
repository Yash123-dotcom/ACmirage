// Quiz logic
function checkAnswer(button, isCorrect) {
  if (isCorrect) {
    button.style.backgroundColor = 'green';
    button.textContent = 'Correct';
  } else {
    button.style.backgroundColor = 'darkred';
    button.textContent = 'Incorrect';
  }

  const buttons = button.parentElement.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

// Voting system logic
const votes = { story: 0, graphics: 0, mechanics: 0 };

function vote(option) {
  if (localStorage.getItem("voted")) {
    alert("You've already voted!");
    return;
  }

  votes[option]++;
  localStorage.setItem("voted", true);

  const results = document.getElementById("poll-results");
  const total = votes.story + votes.graphics + votes.mechanics;
  results.innerHTML = `
    <h4>Live Poll Results</h4>
    <ul>
      <li>Narrative Structure: ${votes.story}</li>
      <li>Visual Fidelity: ${votes.graphics}</li>
      <li>Gameplay Mechanics: ${votes.mechanics}</li>
      <li><strong>Total Votes:</strong> ${total}</li>
    </ul>
  `;
}

// Handle feedback form submission & nav highlighting
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your suggestion!");
      this.reset();
    });
  }

  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".sidebar nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });

    // Scroll Progress
    const scrollProgress = document.getElementById("scroll-progress");
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  });
});
