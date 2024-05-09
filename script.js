const hour_1 = document.querySelector(".hour_1");
const hour_2 = document.querySelector(".hour_2");
const minute_1 = document.querySelector(".minute_1");
const minute_2 = document.querySelector(".minute_2");
const second_1 = document.querySelector(".second_1");
const second_2 = document.querySelector(".second_2");
const timer_section = document.querySelector(".timer_section");
const timer_submit = document.querySelector("#minute_submit");
const input_text = document.querySelector("#minutes");
const minute_input = document.querySelector(".minute_input");
const error_msg = document.querySelector(".error_text");


const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const restart = document.querySelector("#restart");
const reset = document.querySelector("#reset");

let updateTimer;
let timer = null;
let timer_length = 0;

input_text.addEventListener("keydown", (event)=>{
   const entered_val = event.key;
   if(entered_val == "1" || entered_val == "2" || entered_val == "3"|| entered_val == "4"|| entered_val == "5" ||entered_val == "6" || entered_val=="7" || entered_val == "8" || entered_val == "9" || entered_val == "0"){
      timer_submit.textContent += entered_val;
    }

   console.log(entered_val);
  if(entered_val == "Backspace"){
      timer_submit.textContent = "Set timer for: ";
  }
});

timer_submit.addEventListener("click", ()=> {
   let str_timer_len = input_text.value;
   timer_length = Number(input_text.value);
   if(timer_length <= 60){
   minute_input.style.display = "none";
   error_msg.style.display = "none";
   timer_section.style.display = "block";
   
   const timer_arr = str_timer_len.split("");
   if(timer_arr.length > 1){
       minute_1.textContent = timer_arr[0];
       minute_2.textContent = timer_arr[1];
   }
   else{
      minute_1.textContent = "0";
      minute_2.textContent = timer_arr[0];
   }
 }
 else{
     error_msg.style.display = "block";
 }
   
});

start.addEventListener("click", ()=>{
  timer = startTimer(timer_length);
  start.disabled = true;
  restart.disabled = true;
  reset.disabled = true;
  pause.disabled = false;
});


pause.addEventListener("click", ()=>{
   timer.pause();
   pause.disabled = true;
   start.disabled = true;
   reset.disabled = false;
   restart.disabled = false;
   
});

restart.addEventListener("click", ()=>{
   timer.resume();
   pause.disabled = false;
   start.disabled = true;
   reset.disabled = false;
   restart.disabled = true;
   
});


function resetTimer(){
  clearInterval(updateTimer);
  second_1.textContent = "0";
  second_2.textContent = "0";
  minute_1.textContent = "0";
  minute_2.textContent = "0";
  hour_1.textContent = "0";
  hour_2.textContent = "0";
}
reset.addEventListener("click", ()=>{
   resetTimer();
   pause.disabled = true;
   start.disabled = false;
   reset.disabled = true;
   restart.disabled = true;
});

let isPaused = false;
function startTimer(duration){
    const milliseconds = duration * 60000;
    let remainingTime = milliseconds;
    updateTimer = setInterval(() => {
    if (isPaused) return;    

    remainingTime -= 1000;

    // Calculate minutes and seconds
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    const str_min = String(minutes);
    const str_sec = String(seconds);
    
    const minute_array = str_min.split("");
    const second_array = str_sec.split("");
    if(minute_array.length > 1){
       minute_1.textContent = minute_array[0];
       minute_2.textContent = minute_array[1];
    }
    else{
      minute_1.textContent = "0";
      minute_2.textContent = minute_array[0];
    }
    if(second_array.length > 1){
       second_1.textContent = second_array[0];
       second_2.textContent = second_array[1];
    }
    else{
      second_1.textContent = "0";
      second_2.textContent = second_array[0];
    }

    if (remainingTime <= 0) {
    clearInterval(updateTimer);
    imerElement.textContent = "Time's Up!";
    }
  }, 1000);
   return {
    pause: () => {
      isPaused = true;
    },
    resume: () => {
      isPaused = false;
    }
  };
}