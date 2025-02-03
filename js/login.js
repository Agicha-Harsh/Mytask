const loginForm = document.getElementById("loginForm");
const togglePassword = document.querySelector(".toggle-password");

window.addEventListener("DOMContentLoaded", () => {
    // right: 10px;
    togglePassword.style.right = "10px";
    togglePassword.style.top = "50%";
});


loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    resetErrors();
    let isValid = true;

    const password = document.getElementById("password").value;
    if (!password.trim()) {
        isValid = false;
        togglePassword.style.right = "3rem";
        togglePassword.style.top = "1.8rem";
        showError("passwordError", "Password is required");
        showErrorIcon("passwordErrorIcon");
    }


    const email = document.getElementById("email").value;
    if (!email.trim() || !validateEmail(email)) {
        isValid = false;
        showError("emailError", "Valid email is required");
        showErrorIcon("emailErrorIcon");
    }

    

    if (isValid) {
        alert("Form submitted successfully!");
        loginForm.reset();
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

document.querySelector('.toggle-password').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordField.type = 'password';
        this.classList.replace('fa-eye-slash', 'fa-eye');
    }
});
