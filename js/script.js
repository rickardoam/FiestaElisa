// ============================================
// INVITACIÓN DE ELISA
// ============================================


// =========================
// PANTALLA DE BIENVENIDA
// =========================

const welcome =
  document.getElementById("welcome");

const invitation =
  document.getElementById("invitation");

const openButton =
  document.getElementById("openInvitation");


openButton.addEventListener("click", () => {

  welcome.style.transition =
    "opacity .8s ease, transform .8s ease";

  welcome.style.opacity = "0";

  welcome.style.transform =
    "scale(1.04)";


  setTimeout(() => {

    welcome.classList.add("hidden");

    invitation.classList.remove("hidden");

    window.scrollTo(0, 0);

    initRevealAnimations();

  }, 800);

});



// =========================
// ESTRELLAS
// =========================

const canvas =
  document.getElementById("stars");

const ctx =
  canvas.getContext("2d");


let stars = [];

let width;

let height;


function resizeCanvas() {

  width =
    canvas.width =
    window.innerWidth *
    devicePixelRatio;

  height =
    canvas.height =
    window.innerHeight *
    devicePixelRatio;


  canvas.style.width =
    `${window.innerWidth}px`;

  canvas.style.height =
    `${window.innerHeight}px`;


  ctx.setTransform(
    devicePixelRatio,
    0,
    0,
    devicePixelRatio,
    0,
    0
  );


  createStars();

}


function createStars() {

  const amount =
    Math.min(
      150,
      Math.floor(window.innerWidth / 5)
    );


  stars =
    Array.from(
      { length: amount },
      () => ({

        x:
          Math.random() *
          window.innerWidth,

        y:
          Math.random() *
          window.innerHeight,

        radius:
          Math.random() * 1.4 + .3,

        alpha:
          Math.random() * .7 + .2,

        speed:
          Math.random() * .004 + .001,

        phase:
          Math.random() *
          Math.PI * 2

      })
    );

}


function drawStars(time = 0) {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  for (const star of stars) {

    const alpha =
      star.alpha +
      Math.sin(
        time *
        star.speed +
        star.phase
      ) * .2;


    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      `rgba(
        220,
        250,
        255,
        ${Math.max(.05, alpha)}
      )`;


    ctx.fill();

  }


  requestAnimationFrame(drawStars);

}


window.addEventListener(
  "resize",
  resizeCanvas
);


resizeCanvas();

requestAnimationFrame(
  drawStars
);



// =========================
// CUENTA REGRESIVA
// =========================
//
// 14 de octubre de 2026
// 3:00 PM
//
// Zona horaria de Villahermosa:
// UTC-6
// =========================

const eventDate =
  new Date(
    "2026-10-14T15:00:00-06:00"
  );


const daysEl =
  document.getElementById("days");

const hoursEl =
  document.getElementById("hours");

const minutesEl =
  document.getElementById("minutes");

const secondsEl =
  document.getElementById("seconds");


function updateCountdown() {

  const now =
    new Date();


  const difference =
    eventDate - now;


  if (difference <= 0) {

    daysEl.textContent = "0";

    hoursEl.textContent = "0";

    minutesEl.textContent = "0";

    secondsEl.textContent = "0";

    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) /
      3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );


  const seconds =
    totalSeconds % 60;


  daysEl.textContent =
    days;


  hoursEl.textContent =
    String(hours)
      .padStart(2, "0");


  minutesEl.textContent =
    String(minutes)
      .padStart(2, "0");


  secondsEl.textContent =
    String(seconds)
      .padStart(2, "0");

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);



// =========================
// ANIMACIONES AL HACER SCROLL
// =========================

function initRevealAnimations() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: .12
      }

    );


  elements.forEach(
    element =>
      observer.observe(element)
  );

}