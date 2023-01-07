var countryData = null;
var validatorObject = null;

async function getCountryData() {
    await fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
        .then(response => response.json())
        .then((data) => {
            countryData = data;
            const countryDropdown = document.getElementById("country_dropdown");

            for (let i = 0; i < data.length; i++) {
                const optionNode = document.createElement("option");
                optionNode.setAttribute("value", data[i]['name']);

                const optionName = document.createTextNode(data[i]['name']);
                optionNode.appendChild(optionName);

                countryDropdown.appendChild(optionNode);
            }
        });
}

async function start() {
    await getCountryData();
}

start();

document.getElementById("country_dropdown").addEventListener('change', (event) => {
    const selectedCountryName = event.target.value;

    const stateDropdown = document.getElementById("state_dropdown");
    stateDropdown.style.display = 'block';
    stateDropdown.innerHTML = "";

    for (let i = 0; i < countryData.length; i++) {
        if (countryData[i]['name'] === selectedCountryName) {
            const states = countryData[i]['states'];

            for (let j = 0; j < states.length; j++) {
                const optionNode = document.createElement("option");
                optionNode.setAttribute("value", states[j]['name']);

                const optionName = document.createTextNode(states[j]['name']);
                optionNode.appendChild(optionName);

                stateDropdown.appendChild(optionNode);
            }
        }
    }
})


function verifyEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return 1;
    }

    return 0;
}

function validateForm() {
    const countryInput = document.getElementById('country_dropdown');
    const stateInput = document.getElementById('state_dropdown');

    const name = document.getElementById('name').value;
    const state = stateInput.options[stateInput.selectedIndex].value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const country = countryInput.options[countryInput.selectedIndex].value;

    const nameValidators = validatorObject[0]['validator'][0];
    const stateValidators = validatorObject[1]['validator'][0];
    const emailValidators = validatorObject[2]['validator'][0];
    const contactValidators = validatorObject[3]['validator'][0];
    const countryValidators = validatorObject[4]['validator'][0];

    if (name === "") {
        window.parent.postMessage(`Result: {"Name": {"error": "name is a required field."}}`, "*");
    }
    else if (name.length < nameValidators.minlength || name.length > nameValidators.maxlength) {
        window.parent.postMessage(`Result: {"Name": {"error": "length should be in between 4-10 characters."}}`, "*");
    }
    else if (country === "") {
        window.parent.postMessage(`Result: {"Country": {"error": "country is a required field."}}`, "*");
    }
    else if (state === "") {
        window.parent.postMessage(`Result: {"State": {"error": "state is a required field."}}`, "*");
    }
    else if (!verifyEmail(email)) {
        window.parent.postMessage(`Result: {"Email Address": {"error": "email address entered is not a valid email address."}}`, "*");
    }
    else if (contact.length != contactValidators.contactlength) {
        window.parent.postMessage(`Result: {"Contact Number": {"error": "length should be 10."}}`, "*");
    }
    else {
        window.parent.postMessage(`Result: {"Success": "All fields are valid."}`, "*");
    }
}

document.getElementsByClassName('submit-button')[0].addEventListener('click', (event) => {
    event.preventDefault();
    validateForm();
})

window.addEventListener("message", (event) => {
    validatorObject = event.data.validators;
}, false);