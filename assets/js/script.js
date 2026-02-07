"use stricts";

//////////////////////////////////
// SELECTING ELEMENTS
const containerSelection = document.querySelector(".selection");
const containerOption = document.querySelector(".options");
const containerOptionPlayer = document.querySelector(".options__player");
const containerOptionResult = document.querySelector(".options__result");
const optionCPU = document.querySelector(".options__option--empty");
const drawEl = document.querySelector(".options__subtitle");
const containerSelectionOptionAll =
  document.querySelectorAll(".selection__option");

const arrOption = ["paper", "scissors", "rock"];
const random = Math.trunc(Math.random() * 3);
console.log(random);

containerSelectionOptionAll.forEach(function (element) {
  element.addEventListener("click", function () {
    containerSelection.classList.add("none");
    containerOption.classList.add("grid");
    let iconSVG = element.lastElementChild.src.split("/").at(-1);

    const html = `
    <div class="options__option ${element.classList.value.slice(-6)}">
    <img class="selection__icon" src="assets/images/${iconSVG}" width="99" height="118" alt="">
    </div>
    `;
    containerOptionPlayer.insertAdjacentHTML("afterbegin", html);

    setTimeout(function () {
      const html = `
          <div class="options__option color-${random}">
            <img class="options__icon" src="assets/images/icon-${arrOption[random]}.svg" width="99" height="118" alt="">
          </div> 
        `;
      optionCPU.insertAdjacentHTML("afterbegin", html);
      optionCPU.classList.add("grid");
      optionCPU.style.opacity = "1";

      // DEFININDO VENCEDOR
      const player = iconSVG.split("-")[1].split(".")[0];
      const cpu = arrOption[random];

      const win = function () {
        containerOptionResult.classList.add("grid");
        containerOption.style.maxWidth = "938px";
      };

      const draw = function () {
        containerOptionResult.classList.toggle("grid");
        containerOption.style.maxWidth = "938px";
        drawEl.textContent = "Draw";
      };

      const lose = function () {
        containerOptionResult.classList.add("grid");
        containerOption.style.maxWidth = "938px";
        drawEl.textContent = "You Lose";
      };

      // regras
      if (player === cpu) return draw();

      if (player.includes("rock") && cpu.includes("scissors")) return win();

      if (player.includes("scissors") && cpu.includes("paper")) return win();

      if (player.includes("paper") && cpu.includes("rock")) return win();

      lose();
    }, 1000);
  });
});

// selectionElAll.forEach(function (element) {
//   element.addEventListener("click", function () {
//     selection.classList.add("none");
//     options.classList.add("grid");

//     let img = element.lastElementChild;

//     optionsOption.appendChild(img);
//     if (img.src.includes("paper")) return optionsOption.classList.add("grid-1");

//     img.src.includes("scissors")
//       ? optionsOption.classList.add("grid-2")
//       : optionsOption.classList.add("grid-3");
//     optionsOption.style.bottom = "0";

//     // setTimeout(function () {
//     //   optionsCPU.appendChild(img);
//     //   optionsIcon.src = `assets/images/icon-${arrOption[random]}.svg`;
//     // }, 1000);
//   });
// });
