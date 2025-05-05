import apiKljuc from './env.js';

const dugme= document.querySelector("#pretraga");
const unospolje = document.querySelector("#grad");

dugme.addEventListener("click",()=>{
    const grad = unospolje.value.trim();
    if (!grad) {
        alert("Unesite naziv grada.");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${grad}&appid=${apiKljuc}&units=metric&lang=sr`;

    fetch(url)
    .then(response => {
            if (!response.ok) {
                throw new Error("Greška u preuzimanju podataka");
            }
            return response.json();
        })
        .then(data => {
            const vremeDiv = document.getElementById("rezultat");
            const { name, main, weather, wind, visibility, sys } = data;
            const ikonica = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

            vremeDiv.innerHTML = `
                <h2>${name}, ${sys.country}</h2>
                <img src="${ikonica}" alt="Vremenska ikonica">
                <p><strong>Opis:</strong> ${weather[0].description}</p>
                <p><strong>Temperatura:</strong> ${main.temp.toFixed(1)}°C</p>
                <p><strong>Oseća se kao:</strong> ${main.feels_like.toFixed(1)}°C</p>
                <p><strong>Minimalna / Maksimalna:</strong> ${main.temp_min}°C / ${main.temp_max}°C</p>
                <p><strong>Vlažnost vazduha:</strong> ${main.humidity}%</p>
                <p><strong>Pritisak:</strong> ${main.pressure} hPa</p>
                <p><strong>Vidljivost:</strong> ${(visibility / 1000).toFixed(1)} km</p>
                <p><strong>Vetar:</strong> ${wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            console.error("Greška:", error);
            document.getElementById("rezultat").innerHTML = `<p style="color:red;">Greška: Proverite naziv grada.</p>`;
        });
});
