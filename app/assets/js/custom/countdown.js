// Define la función como una exportación
export function updateCountdown(elementId, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calcula los días, horas, minutos y segundos restantes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualiza el elemento HTML con el tiempo restante
    document.getElementById(elementId).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // Actualiza el contador cada segundo
    if (distance <= 0) {
        clearInterval(updateInterval);
        document.getElementById(elementId).innerHTML = "EXPIRED";
    }
}

// Define la fecha objetivo para el contador (formato: "YYYY-MM-DDTHH:MM:SS")
// const targetDate = new Date("2024-03-01T00:00:00").getTime();

// Actualiza el contador cada segundo
const updateInterval = setInterval(function () {
    updateCountdown("counter1", targetDate);
    updateCountdown("counter2", targetDate);
    updateCountdown("counter3", targetDate);
    updateCountdown("counter4", targetDate);
}, 1000);
