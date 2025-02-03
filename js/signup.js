const companyButton = document.getElementById("companyButton");
const individualButton = document.getElementById("individualButton");
const companyField = document.querySelector(".company-field");
const signupForm = document.getElementById("signupForm");
const regenCaptchaButton = document.getElementById("regenCaptcha");
const captchaInput = document.getElementById("captcha");
const captchaTextElement = document.getElementById("captchaText");

let generatedCaptcha = '';

// Function to generate random captcha
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    generatedCaptcha = captcha;
    captchaTextElement.textContent = captcha;
}

// Regenerate captcha when icon is clicked
regenCaptchaButton.addEventListener("click", generateCaptcha);

companyButton.addEventListener("click", () => {
    companyButton.classList.add("active");
    individualButton.classList.remove("active");
    companyField.style.display = "block";
});

individualButton.addEventListener("click", () => {
    individualButton.classList.add("active");
    companyButton.classList.remove("active");
    companyField.style.display = "none";
});

// Set initial view
window.addEventListener("DOMContentLoaded", () => {
    companyField.style.display = "block";
    generateCaptcha();
});

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    resetErrors();
    let isValid = true;

    const contactPerson = document.getElementById("contactPerson").value;
    if (!contactPerson.trim()) {
        isValid = false;
        showError("contactPersonError", "Contact person is required");
        showErrorIcon("contactPersonErrorIcon");
    }

    if (companyField.style.display === "block") {
        const surgeryName = document.getElementById("surgeryName").value;
        if (!surgeryName.trim()) {
            isValid = false;
            showError("surgeryNameError", "Surgery name is required");
            showErrorIcon("surgeryNameErrorIcon");
        }
    }

    const email = document.getElementById("email").value;
    if (!email.trim() || !validateEmail(email)) {
        isValid = false;
        showError("emailError", "Valid email is required");
        showErrorIcon("emailErrorIcon");
    }

    const captcha = captchaInput.value;
    if (captcha !== generatedCaptcha) {
        isValid = false;
        showError("captchaError", "Captcha is incorrect");
    }

    const terms = document.getElementById("terms");
    if (!terms.checked) {
        isValid = false;
        showError("termsError", "You must accept the Terms & Conditions");
    }

    if (isValid) {
        alert("Form submitted successfully!");
        signupForm.reset();
        generateCaptcha();
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.visibility = 'visible';
    errorElement.parentElement.querySelector("input").classList.add("input-error");
}

function showErrorIcon(elementId) {
    const errorIconElement = document.getElementById(elementId);
    errorIconElement.style.visibility = 'visible'; // Show the error icon
}

function resetErrors() {
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = '';
        error.style.visibility = 'hidden';
    });
    document.querySelectorAll(".error-icon").forEach(icon => {
        icon.style.visibility = 'hidden'; // Hide all error icons
    });
    document.querySelectorAll(".input-error").forEach(input => {
        input.classList.remove("input-error");
    });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
