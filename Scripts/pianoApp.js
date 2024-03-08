// const noteDo = document.querySelector(".do_note");
// const noteRe = document.querySelector(".re_note");
// const noteMi = document.querySelector(".mi_note");
// const noteFa = document.querySelector(".fa_note");
// const noteSol = document.querySelector(".sol_note");
// const noteLa = document.querySelector(".la_note");
// const noteSi = document.querySelector(".si_note");

// const audioDo = document.querySelector(".audio__do");
// const audioRe = document.querySelector(".audio__re");
// const audioMi = document.querySelector(".audio__mi");
// const audioFa = document.querySelector(".audio__fa");
// const audioSol = document.querySelector(".audio__sol");
// const audioLa = document.querySelector(".audio__la");
// const audioSi = document.querySelector(".audio__si");

// let

const startPianoButton = document.querySelector(".piano__button__start");
let audioPlaying;

startPianoButton.addEventListener("click", userPlayPiano);

function userPlayPiano () {
    document.body.addEventListener("keydown", playAudio);
}

function playAudio (event) {
    
    audioPlaying = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if (audioPlaying.play()) {
        audioPlaying.pause()    
        audioPlaying.currentTime = 0;
    }
    audioPlaying.play();

}

