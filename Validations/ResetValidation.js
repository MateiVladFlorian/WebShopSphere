 document.getElementById("Reset").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;

    const email = document.getElementById("email").value;
    document.getElementById("Email").value = email;
    const username = document.getElementById("Username").value;
    document.getElementById("username").value = username;

    if (!email || !username) return;

    const formData = new FormData(form);

    fetch("http://localhost/ManagerAccess/Reset.php", {
        method: "POST",
        body: formData,
    })
    .then(response => {
        if (!response.ok) throw new Error("A apărut o problemă la server.");

        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = "https://mateivladflorian.github.io/WebShopSphere/Reset.html";
        }
        else document.getElementById("response-message").innerText = data.message || "Failed authentication!";
    })
    .catch(error => {
        console.error("Eroare:", error);
        document.getElementById("response-message").innerText = "Error.";
    });
});
