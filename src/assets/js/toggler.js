function toggler() {
  const toggles = document.getElementsByClassName("toggle");
  const selector = document.getElementById("selector");

  for (let i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", () => {
      for (let j = 0; j < toggles.length; j++) {
        toggles[j].classList.remove("active");
      }
      toggles[i].classList.add("active");

      if (i == 0) {
        selector.className = "first";
      }
      if (i == 1) {
        selector.className = "second";
      }
      if (i == 2) {
        selector.className = "third";
      }
    });
  }
}
