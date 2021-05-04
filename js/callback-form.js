const callbackForm = document.querySelector(".callback-form-container");
const callbackFormRequest = document.querySelector("#modal-request");
const callbackFormInputName = document.querySelector(
    "#callback-form-input-name"
);
const callbackFormInputEmail = document.querySelector(
    "#callback-form-input-email"
);
const callbackFormInputPhone = document.querySelector(
    "#callback-form-input-phone"
);

callbackFormInputPhone.addEventListener("click", function (event) {
    if (!callbackFormInputPhone.value.trim()) {
        callbackFormInputPhone.value = "+380";
    }
});
callbackFormInputPhone.addEventListener("blur", function (event) {
    if (callbackFormInputPhone.value === "+380") {
        callbackFormInputPhone.value = "";
    }
});

callbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let hasError = false;

    if (!callbackFormInputName.value.trim()) {
        callbackFormInputName.classList.add("callback-form-input-error");
        hasError = "true";
    } else {
        callbackFormInputName.classList.remove("callback-form-input-error");
    }
    if (
        !callbackFormInputEmail.value.trim() ||
        !isEmailValid(callbackFormInputEmail.value)
    ) {
        callbackFormInputEmail.classList.add("callback-form-input-error");
        hasError = "true";
    } else {
        callbackFormInputEmail.classList.remove("callback-form-input-error");
    }
    if (
        !callbackFormInputPhone.value.trim() ||
        !isPhoneValid(callbackFormInputPhone.value)
    ) {
        callbackFormInputPhone.classList.add("callback-form-input-error");
        hasError = "true";
    } else {
        callbackFormInputPhone.classList.remove("callback-form-input-error");
    }

    if (hasError) {
        return;
    }

    callbackFormInputName.value = "";
    callbackFormInputEmail.value = "";
    callbackFormInputPhone.value = "";

    callbackFormRequest.classList.add("modal-active"); // views modal Request

    setTimeout('callbackFormRequest.classList.remove("modal-active")', 2000);
});

// checking phone format
function isPhoneValid(phone = "") {
    const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

    return phone.match(regexp);
}

// checking email format
function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
