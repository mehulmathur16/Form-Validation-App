window.addEventListener("message", (event) => {
    document.getElementsByClassName("result")[0].innerHTML = event.data;
}, false);

var validatorObject = {
    "validators": [
        {
            "field": "name",
            "validator": [
                {
                    "required": true,
                    "minlength": 4,
                    "maxlength": 10,
                }
            ]
        },

        {
            "field": "state",
            "validator": [
                {
                    "required": true,
                }
            ]
        },

        {
            "field": "email",
            "validator": [
                {
                    "required": false,
                }
            ]
        },

        {
            "field": "contact",
            "validator": [
                {
                    "contactlength": 10,
                }
            ]
        },

        {
            "field": "country",
            "validator": [
                {
                    "required": true,
                }
            ]
        }
    ]
}

setTimeout(() => {
    const iframe = document.getElementById("frame").contentWindow;
    iframe.postMessage(validatorObject, "*");
}, 1000)
