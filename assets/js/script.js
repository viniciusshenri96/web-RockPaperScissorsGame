"use stricts";

//////////////////////////////////
// SELECTING ELEMENTS

// CONTAINERS
const containerSelection = document.querySelector(".selection");
const containerOption = document.querySelector(".options");
const containerOptionPlayer = document.querySelector(".options__player");
const containerRules = document.querySelector(".rules");
const containerResult = document.querySelector(".options__result ");

// ELEMENTS
const optionCPU = document.querySelector(".options__option--empty");
const drawEl = document.querySelector(".options__subtitle");
const scoreEl = document.querySelector(".header__score");
const overlayEl = document.querySelector(".overlay");
const iconClose = document.querySelector(".rules__img");

const containerSelectionOptionAll =
  document.querySelectorAll(".selection__option");

// BUTTONS
const btnRules = document.querySelector(".btn-rules");
const btnAgain = document.querySelector(".btn__again");

const arrOption = ["paper", "scissors", "rock"];
let random = Math.trunc(Math.random() * 3);
let score = 0;

containerSelectionOptionAll.forEach(function (element) {
  element.addEventListener("click", function () {
    containerSelection.classList.add("hidden");
    containerOption.classList.remove("hidden");

    let iconSVG = element.lastElementChild.src.split("/").at(-1);

    const html = `
        <div class="options__option ${element.classList.value.slice(-6)}">
            <img class="selection__icon" src="assets/images/${iconSVG}" width="99" height="118" alt="">
          </div>
      `;

    containerOptionPlayer.insertAdjacentHTML("afterbegin", html);

    setTimeout(function () {
      random = Math.trunc(Math.random() * 3);
      const html = `
            <div class="options__option color-${random}">
               
              <img class="options__icon" src="assets/images/icon-${arrOption[random]}.svg" width="99" height="118" alt="">
            </div> 
          `;
      optionCPU.insertAdjacentHTML("afterbegin", html);

      optionCPU.style.opacity = "1";
    }, 1000);

    ////////////////////////////////////
    ///// LOGIC GAME
    const resultCSS = function () {
      containerResult.classList.remove("hidden");
      containerOption.style.maxWidth = "938px";
    };

    setTimeout(function () {
      const player = iconSVG.split("-")[1].split(".")[0];
      const cpu = arrOption[random];

      const win = function () {
        resultCSS();
        drawEl.textContent = "You win";

        score++;
        scoreEl.textContent = score;

        const option = document.querySelector(".options__option");

        const html = `
              <div class="hover animar"></div>
              <div class="hover1 animar"></div>
              <div class="hover2 animar"></div>
          `;
        option.insertAdjacentHTML("afterbegin", html);
      };

      const draw = function () {
        resultCSS();
        drawEl.textContent = "Draw";
      };

      const lose = function () {
        resultCSS();
        drawEl.textContent = "You Lose";

        if (score >= 1) {
          score--;
          scoreEl.textContent = score;
        }

        const optionsEmpty = document.querySelector(".options__option--empty");
        const html = `
              <div class="hover animar"></div>
              <div class="hover1 animar"></div>
              <div class="hover2 animar"></div>
          `;
        optionsEmpty.firstChild.nextSibling.insertAdjacentHTML(
          "afterbegin",
          html,
        );
      };

      const arrPlayer = ["rock", "scissors", "paper"];
      const arrCPU = ["scissors", "paper", "rock"];

      // win
      for (let i = 0; i < arrPlayer.length; i++)
        if (player === arrPlayer[i] && cpu === arrCPU[i]) return win();

      // draw
      if (player === cpu) return draw();

      // lose
      lose();
    }, 2000);
  });
});

btnAgain.addEventListener("click", function (e) {
  e.preventDefault();
  containerSelection.classList.remove("hidden");
  containerOption.classList.add("hidden");
  containerOption.style.maxWidth = "623px";
  optionCPU.style.opacity = "0.1";
  containerResult.classList.add("hidden");

  const divOption = document.querySelector(".options__option");
  const option = document.querySelector(".options__player");
  const optionsEmpty = document.querySelector(".options__option--empty");

  option.removeChild(divOption);

  optionsEmpty.removeChild(optionsEmpty.firstChild.nextSibling);
});

// Modal
const close = function () {
  containerRules.classList.add("hidden");
  overlayEl.classList.add("hidden");
};
const open = function () {
  containerRules.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
};

btnRules.addEventListener("click", open);
iconClose.addEventListener("click", close);
overlayEl.addEventListener("click", close);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !containerRules.classList.contains("hidden")) {
    close();
  }
});
