import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

declare let toggler: any;
declare let timer: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Pomodoro-App";
  minutes!: number;
  seconds!: number;
  timer: any;
  pomodoro: boolean = true;
  shortBreak: boolean = false;
  longBreak: boolean = false;
  paused: boolean = false;
  ended: boolean = false;

  pomodoroMinutes!: number;
  pomodoroSeconds!: number;
  shortBreakMinutes!: number;
  shortBreakSeconds!: number;
  longBreakMinutes!: number;
  longBreakSeconds!: number;

  closeResult!: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    new toggler();
    new timer();
    this.initVariables();
  }

  initVariables() {
    if (localStorage.getItem("pomodoroMinutes") === null) {
      localStorage.setItem("pomodoroMinutes", "25");
      localStorage.setItem("pomodoroSeconds", "0");
      localStorage.setItem("shortBreakMinutes", "5");
      localStorage.setItem("shortBreakSeconds", "0");
      localStorage.setItem("longBreakMinutes", "10");
      localStorage.setItem("longBreakSeconds", "0");
    }
    this.pomodoroMinutes = parseInt(localStorage.getItem("pomodoroMinutes")!);
    this.pomodoroSeconds = parseInt(localStorage.getItem("pomodoroSeconds")!);
    this.shortBreakMinutes = parseInt(
      localStorage.getItem("shortBreakMinutes")!
    );
    this.shortBreakSeconds = parseInt(
      localStorage.getItem("shortBreakSeconds")!
    );
    this.longBreakMinutes = parseInt(localStorage.getItem("longBreakMinutes")!);
    this.longBreakSeconds = parseInt(localStorage.getItem("longBreakSeconds")!);

    this.setClock();
  }

  showSeconds(): string {
    if (this.seconds < 10) {
      return "0" + this.seconds;
    }
    return this.seconds.toString();
  }

  startTimer() {
    this.paused = false;
    if (!this.timer) {
      this.timer = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else if (this.minutes > 0) {
          this.seconds = 59;
          this.minutes--;
        } else {
          this.seconds = 0;
          this.minutes = 0;
          let audio = new Audio();
          audio.src = "../assets/alarm.m4a";
          audio.load();
          audio.play();
          this.ended = true;
          clearInterval(this.timer);
          setTimeout(() => {
            alert("Se acabó el tiempo");
          }, 100);
        }
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.paused = true;
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.setClock();
    this.paused = false;
    this.ended = false;
  }

  setClock() {
    if (this.pomodoro) {
      this.setPomodoro();
    }
    if (this.shortBreak) {
      this.setShortBreak();
    }
    if (this.longBreak) {
      this.setLongBreak();
    }
  }

  setPomodoro() {
    clearInterval(this.timer);
    this.timer = null;
    this.minutes = parseInt(localStorage.getItem("pomodoroMinutes")!);
    this.seconds = parseInt(localStorage.getItem("pomodoroSeconds")!);
    this.pomodoro = true;
    this.shortBreak = false;
    this.longBreak = false;
  }

  setShortBreak() {
    clearInterval(this.timer);
    this.timer = null;
    this.minutes = parseInt(localStorage.getItem("shortBreakMinutes")!);
    this.seconds = parseInt(localStorage.getItem("shortBreakSeconds")!);
    this.pomodoro = false;
    this.shortBreak = true;
    this.longBreak = false;
  }

  setLongBreak() {
    clearInterval(this.timer);
    this.timer = null;
    this.minutes = parseInt(localStorage.getItem("longBreakMinutes")!);
    this.seconds = parseInt(localStorage.getItem("longBreakSeconds")!);
    this.pomodoro = false;
    this.shortBreak = false;
    this.longBreak = true;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  saveSettings() {
    localStorage.setItem("pomodoroMinutes", this.pomodoroMinutes.toString());
    localStorage.setItem("pomodoroSeconds", this.pomodoroSeconds.toString());
    localStorage.setItem(
      "shortBreakMinutes",
      this.shortBreakMinutes.toString()
    );
    localStorage.setItem(
      "shortBreakSeconds",
      this.shortBreakSeconds.toString()
    );
    localStorage.setItem("longBreakMinutes", this.longBreakMinutes.toString());
    localStorage.setItem("longBreakSeconds", this.longBreakSeconds.toString());

    location.reload();
  }
}
