import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`)
const button = document.querySelector(`button`);
const textInput = document.querySelector(`input`)
const fulfilled = document.querySelector(`input[value="fulfilled"]`)
const rejected = document.querySelector(`input[value="rejected"]`)




function msSpeedValue(event) {
    event.preventDefault();
    const delay = textInput.value;

    const checkRadio = document.querySelector('input[name="state"]:checked').value

    personTake(delay, checkRadio).
        then(value => {
            console.log(value)
            iziToast.success({
                title: `Succes`,
                message: value,
                position: "topRight"
            })
        }).catch(error => {
            console.log(error)
            iziToast.error({
                title: `Error`,
                message: error,
                position: "topRight"
            }
            )
        })
}
const personTake = (msHours, state) => {
    if (state === "fulfilled") {
        return Promise.resolve(`✅ Fulfilled promise in ${msHours} ms`)
    }
    else {
       return Promise.reject(`❌ Rejected promise in ${msHours} ms`)
    }
}










form.addEventListener('submit', msSpeedValue);