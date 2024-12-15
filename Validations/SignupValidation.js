document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone").value;

    if (!phone.startsWith(country)) {
        alert(`Numărul de telefon trebuie să înceapă cu prefixul (${country})`);
        return;
    }

    const birthdateInput = document.getElementById('birthdate');
    const birthdateValue = new Date(birthdateInput.value);
    const today = new Date();

    const age = today.getFullYear() - birthdateValue.getFullYear();
    const monthDiff = today.getMonth() - birthdateValue.getMonth();
    const dayDiff = today.getDate() - birthdateValue.getDate();
    const adjustedAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

    if (adjustedAge < 18 || adjustedAge > 84) { alert("Vârsta trebuie să fie între 18 și 84 de ani."); return; }

    const formData = new FormData(form);

    fetch('http://localhost/ManagerAccess/SignUp.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('response-message').innerText = data;
        form.reset();
    })
    .catch(error => {
        document.getElementById('response-message').innerText = 'error!';
        console.error('Eroare:', error);
    });
});
