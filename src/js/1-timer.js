import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { stringify } from "postcss";

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




const startButton = document.querySelector(`button`)
const daysData = document.querySelector('[data-days]');
 const hoursData = document.querySelector('[data-hours]');
const minuteData = document.querySelector('[data-minutes]');
const secondData = document.querySelector('[data-seconds]');




let userSelectedDate = null



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const selectedDate = selectedDates[0];
        let currentTime = new Date();
        if (selectedDate <= currentTime ) {
            iziToast.error({
                title: 'error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            userSelectedDate = null;
            startButton.disabled = true;
        }
        else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    },
};


const timer = {
    startedTimer: false,
    timerId: null,
    start() {
        if (this.startedTimer) {
            return
        }
        this.startedTimer = true
        const dateNow = new Date();
        startButton.disabled = true
        
        
         this.timerId = setInterval(() => {
            startButton.disabled = true
             const timerData = new Date();
             const Data = userSelectedDate - timerData;
            const timeGive = convertMs(Data)
             ClockTimeData(timeGive)
             if (Data <= 0) {
                 clearInterval(this.timerId)
                 this.startedTimer = false
                 ClockTimeData({ days: 0, hours: '00', minutes: '00', seconds: '00' });
                 startButton.disabled = false
                 return;
             }
        }, 1000);
    },
    

      
}


function addLeadingZero(value) {
    return String(value).padStart(2, `0`)
}


flatpickr(`input#datetime-picker`, options);

function ClockTimeData({ days, hours, minutes, seconds }) {
    daysData.textContent = `${days}`;
    hoursData.textContent = `${hours}`;
    minuteData.textContent = `${minutes}`
    secondData.textContent = `${seconds}`
}


startButton.addEventListener(`click`, timer.start.bind(timer))

