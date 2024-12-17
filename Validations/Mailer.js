document.getElementById("send-mail").addEventListener("submit", function (event) {
    event.preventDefault(); // Oprește comportamentul implicit al formularului

    const form = event.target;

    // Creăm un obiect FormData din formular
    const formData = new FormData(form);

    // Trimiterea datelor prin AJAX folosind fetch
    fetch("http://localhost/ManagerAccess/SendMail.php", {
        method: "POST",
        body: formData,
    })
    .then(response => {
        // Verifică dacă răspunsul este valid
        if (!response.ok) {
            throw new Error(`Eroare la server: ${response.status}`);
        }
        return response.json(); // Parsează răspunsul ca JSON
    })
    .then(data => {
        // Verifică răspunsul de la server
        if (data.success) {
            document.getElementById("response-message").innerText = "Emailul a fost trimis cu succes!";
            document.getElementById("response-message").style.color = "green";
        } else {
            document.getElementById("response-message").innerText = data.message || "A apărut o eroare!";
            document.getElementById("response-message").style.color = "red";
        }
    })
    .catch(error => {
        console.error("Eroare:", error);
        document.getElementById("response-message").innerText = "Eroare la trimiterea formularului.";
        document.getElementById("response-message").style.color = "red";
    });
});
