document.getElementById("signin-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;

    const username = sanitizeInput(form.querySelector('input[name="name"]').value);
    const password = sanitizeInput(form.querySelector('input[name="password"]').value);

    if (!validateFields(username, password)) {
        document.getElementById("response-message").innerText = "Please fill in both fields correctly.";
        return;
    }

    const formData = new FormData(form);

    fetch("http://localhost/ManagerAccess/Login.php", {
        method: "POST",
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("A apărut o problemă la server.");
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            document.getElementById("response-message").innerText = "Successful authentication!";
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("response-message").innerText = data.message || "Failed authentication!";
        }
    })
    .catch(error => {
        console.error("Eroare:", error);
        document.getElementById("response-message").innerText = "Error.";
    });
});

function validateFields(username, password) {
    if (!username) return false;
    if (!password) return false;
    if (!validatePassword(password)) return false;

    return true;
}

function validatePassword(password) { return password.length >= 8 && password.length <= 32; }

function sanitizeInput(input) { return input.trim(); }
