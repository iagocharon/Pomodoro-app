function timer() {
  const circularProgress = document.querySelector(".circular-progress");
  const toggles = document.getElementsByClassName("toggle");
  let start,
    stop,
    reset,
    time,
    totalSeconds,
    currentSeconds,
    degrees,
    progress,
    minutes,
    seconds;

  function loadButtons() {
    start = document.getElementById("start");
    stop = document.getElementById("stop");
    reset = document.getElementById("reset");

    if (start) {
      start.addEventListener("click", () => {
        setTimeout(loadButtons(), 10);
        progress = setInterval(() => {
          time = document.getElementsByClassName("time")[0];
          if (time.innerHTML.length == 5) {
            minutes = time.innerHTML[0] + time.innerHTML[1];
            seconds = time.innerHTML[3] + time.innerHTML[4];
          } else {
            minutes = time.innerHTML[0];
            seconds = time.innerHTML[2] + time.innerHTML[3];
          }
          currentSeconds = parseInt(minutes) * 60 + parseInt(seconds);
          degrees = (currentSeconds / totalSeconds) * 360;

          circularProgress.style.background = `conic-gradient(var(--accent-color) ${degrees}deg, var(--background-dark) 0deg)`;
        }, 1000);
      });
    }
    if (stop) {
      stop.addEventListener("click", () => {
        setTimeout(loadButtons(), 10);
        clearInterval(progress);
      });
    }
    if (reset) {
      reset.addEventListener("click", () => {
        clearInterval(progress);
        circularProgress.style.background = `conic-gradient(var(--accent-color) ${360}deg, var(--background-dark) 0deg)`;
        setTimeout(loadButtons(), 10);
      });
    }
  }

  function initTime() {
    let time = document.getElementsByClassName("time")[0];
    if (time.innerHTML.length == 5) {
      minutes = time.innerHTML[0] + time.innerHTML[1];
      seconds = time.innerHTML[3] + time.innerHTML[4];
    } else {
      minutes = time.innerHTML[0];
      seconds = time.innerHTML[2] + time.innerHTML[3];
    }

    totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  }

  setTimeout(function initTimer() {
    loadButtons();
    initTime();
  }, 10);

  for (let i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", () => {
      clearInterval(progress);
      initTime();
      setTimeout(() => {
        currentSeconds = parseInt(minutes) * 60 + parseInt(seconds);

        degrees = (currentSeconds / totalSeconds) * 360;
      }, 10);
    });
  }
}
