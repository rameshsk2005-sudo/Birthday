function createParticle() {
  const container = document.getElementById("particle-container");
  const particle = document.createElement("div");

  const isHeart = Math.random() < 0.5;
  particle.innerHTML = isHeart ? "❤️" : "⭐";
  particle.style.fontSize = Math.random() * 25 + 10 + "px";

  particle.classList.add("particle");
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDuration = Math.random() * 4 + 4 + "s";

  container.appendChild(particle);
  setTimeout(() => particle.remove(), 9000);
}

setInterval(createParticle, 300);

function createBalloon() {
  const container = document.getElementById("balloon-container");
  const balloon = document.createElement("div");
  const colors = ["🎈", "🎉", "🎊"];
  balloon.innerHTML = colors[Math.floor(Math.random() * colors.length)];

  balloon.classList.add("balloon");
  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.fontSize = Math.random() * 40 + 30 + "px";
  balloon.style.animationDuration = Math.random() * 5 + 5 + "s";

  container.appendChild(balloon);
  setTimeout(() => balloon.remove(), 12000);
}

setInterval(createBalloon, 700);
