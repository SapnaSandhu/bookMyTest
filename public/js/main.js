// * fetching the URL
const url = window.location.href;
// * checking if the URL contains "showError=true"
const isShowError = url.indexOf("showError=true") > 0;
const isUserOnG2Page = url.indexOf('g2Test') > -1
const isUserOnEditDriverDetails = url.indexOf('editDriverDetails') > -1
const isUserOnAppointmentPage = url.indexOf('loginUser') > -1 || url.indexOf('appointment') > -1
const isUserOnGPage = url.indexOf('gTest') > -1
const isUserOnExaminerPage = url.indexOf('examiner') > -1

// * if it contains, then it will displays an alert with the text
if (isShowError) {
    alert("No User Found")
}

if (isUserOnG2Page) {
    // * regex to check for 9 characters alphanumeric
    const alphaNumericRegex = /^[a-z0-9]{9}$/i;
    // * getting the submit button
    const g2SubmitButton = document.getElementById("g2submit");

    g2SubmitButton.onclick = (e) => {
        const licenseNumberValue = document.getElementById("licenseNumber").value;
        // * checking the value against the regex
        if (!alphaNumericRegex.test(licenseNumberValue)) {
            e.preventDefault();
            alert("License Number should be 9 characters aplhnumeric");
        }
    }
}

const getUpdatedTimeSlotsByDate = (date, type) => {
    let data = new URLSearchParams();
    data.append('date', date)
    data.append('type', type)
    return fetch('http://127.0.0.1:3000/getTimeSlots', {
        method: 'POST',
        "Content-Type": "application/x-www-form-urlencoded",
        body: data

    })
}

if (isUserOnEditDriverDetails || isUserOnGPage) {
    //? get html elements from the DOM
    const datePicker = document.querySelector('#date');
    const timePicker = document.querySelector('#time');
    const appointmentId = document.querySelector('#appointmentId')

    timePicker.addEventListener('change', function () {
        appointmentId.value = this.options[this.selectedIndex].getAttribute("data-id");
    })

    //? Fetching the details from the server
    datePicker.addEventListener('change', function () {
        getUpdatedTimeSlotsByDate(this.value, 'driver')
            .then(data => data.json()).then(data => {
                console.log('data: ', data);
                timePicker.innerHTML = '';

                const option = document.createElement("option");
                option.value = '';
                option.text = 'Select time';
                timePicker.appendChild(option);

                for (const slot of data) {
                    const option = document.createElement("option");
                    option.value = slot.time;
                    option.text = slot.time;
                    option.setAttribute('data-id', slot._id)
                    timePicker.appendChild(option);
                }
            })
    })
}

if (isUserOnAppointmentPage) {
    //? get html elements from the DOM
    const datePicker = document.querySelector('#slot-date');
    const timePicker = document.querySelector('#slot-time');

    //? Fetching the details from the server
    datePicker.addEventListener('change', function () {
        getUpdatedTimeSlotsByDate(this.value, 'admin')
            .then(data => data.json()).then(data => {
                timePicker.innerHTML = '';

                const option = document.createElement("option");
                option.value = '';
                option.text = 'Select time';
                timePicker.appendChild(option);

                for (const slot of data) {
                    const option = document.createElement("option");
                    option.value = slot.time;
                    option.text = slot.time;
                    if (slot.isSlotActive) {
                        option.setAttribute('disabled', 'disabled')
                    }
                    timePicker.appendChild(option);
                }
            })
    })
}

const getDriverFilterData = (driverType) => fetch(`http://127.0.0.1:3000/getFilteredDrivers?driverType=${driverType}`)

if(isUserOnExaminerPage){
const driverTypePicker = document.querySelector('#driverType');
const dataDisplay = document.querySelector('#data-display');

let htmlString = '';

driverTypePicker.addEventListener('change',function(){
    dataDisplay.innerHTML = "";
    htmlString = '';
    getDriverFilterData(this.value).then(data => data.json())
    .then(data=>{
        dataDisplay.innerHTML = "";
        htmlString = '';
        data.forEach(driver => {
            htmlString += `
            <div id="drivers-info">
            <div id="driver-name">
                    <a id="driver-link" href="/driver/${driver._id}">
                    <p> ${driver.FName} ${driver.LName}</p>
                    </a>
                </div>
                <div id="carinfo-parent">
                    <p>Car Details:</p>
                    <div id="car-info">
                        <p>Make: ${driver.carDeatils.make} </p>
                        <p>Model: ${driver.carDeatils.model} </p>
                        <p>Plate Number: ${driver.carDeatils.plateNumber} </p>
                    </div>
                </div>
            </div>
            `
        });

        dataDisplay.innerHTML = htmlString
    })
})
}

/* 
    ? Student Name: Meet Yogesh Panchal
    ? Student Id: 8771023
*/