// // const axios = require('axios');
// // import axios from 'axios';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function obtenerProximaCita() {
    try {
        // Realizar la solicitud a la API usando fetch en lugar de axios
        const response = await fetch('https://api.vyte.in/v2/slots/next?duration=15&emails=praxis@tierarzt-ffm.de', {
            headers: {
                'Authorization': process.env.VYTE_API_KEY // Clave de autorización
            }
        });
        let todayMilliseconds = Date.now(); 
        let today = new Date(todayMilliseconds);
        console.log(today);
        // Obtener el año, el mes y el día
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses en JavaScript van de 0 a 11
        const day = String(today.getDate()).padStart(2, '0');

        // Formatear la fecha como 'yyyy-mm-dd'
        const formattedToday = `${year}-${month}-${day}`;

        // Usar la fecha formateada en la URL de la solicitud fetch
        const response2 = await fetch(`https://api.vyte.in/v2/slots/?duration=5&emails=praxis@tierarzt-ffm.de&from=${formattedToday}&to=${formattedToday}`, {
            gzip: true,
            method: "get",
            headers: {
                'Authorization': 'p98wfm4baupc6ns5fx8ezazv6209vuu4elvghhuflyxlv0tuff' // Clave de autorización
            }
        });
        // Convertir la respuesta a JSON
        const responseData = await response.json();
        const responseData2 = await response2.json();
        console.log(responseData.nextAvailability);
        console.log(responseData2.nextAvailability);
        // Verificar si la respuesta contiene la propiedad 'nextAvailability'
        if (responseData && responseData.nextAvailability) {
            // Obtener la fecha y hora de la próxima cita disponible
            const availableDate = responseData.nextAvailability.availableDate;
            const startDateTime = responseData.nextAvailability.availableSlot.start.dateTime;
            const endDateTime = responseData.nextAvailability.availableSlot.end.dateTime;

            // Extraer la hora de inicio y fin del slot disponible
            const startHour = startDateTime.slice(11, 16);
            const endHour = endDateTime.slice(11, 16);

            // Mostrar la fecha y hora de la próxima cita
            console.log(`La próxima cita disponible es el ${availableDate} de ${startHour} a ${endHour}.`);

            // Calcular la fecha y hora de la próxima cita en milisegundos
            const fechaProximaCita = new Date(startDateTime).getTime();

            // Llamar a la función para actualizar el contador regresivo
            actualizarContador(fechaProximaCita);
        } else {
            console.log('No hay citas disponibles.');
        }
    } catch (error) {
        console.error('Error al obtener la próxima cita:', error);
    }
}

// Llamar a la función para obtener la próxima cita
// obtenerProximaCita();

// Función para consultar periódicamente la próxima cita y actualizar el contador si cambia
function consultarProximaCitaRegularmente() {
    obtenerProximaCita();
    // Establecer un intervalo de tiempo para consultar cada 5 minutos (300,000 milisegundos)
    setInterval(() => {
        obtenerProximaCita();
    }, 300000); // 5 minutos en milisegundos
}

// Llamar a la función para consultar periódicamente la próxima cita
consultarProximaCitaRegularmente();

// Función para calcular el tiempo restante y actualizar el contador regresivo
function actualizarContador(fechaFinal) {
    const ahora = new Date().getTime();
    let tiempoRestante = fechaFinal - ahora;

    if (tiempoRestante < 0) {
        tiempoRestante = 0; // Establecer el tiempo restante a cero si es negativo
        obtenerProximaCita(); // Llamar a la función para obtener la próxima cita si la fecha final ha pasado
        console.log('La fecha final ha pasado.');
        return; // Salir de la función actualizarContador si la fecha final ha pasado
    }

    const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    let contadorHTML = '';

    if (dias > 0) {
        contadorHTML += `${dias} tag(en), `;
    }

    contadorHTML += `${horas} stunde(n), ${minutos} minute(n), ${segundos} sekunde(n)`;

    // Actualizar el HTML con el tiempo restante
    document.getElementById('countdown').innerHTML = contadorHTML;

    // Actualizar el contador cada segundo
    setTimeout(() => {
        actualizarContador(fechaFinal);
    }, 1000);
}