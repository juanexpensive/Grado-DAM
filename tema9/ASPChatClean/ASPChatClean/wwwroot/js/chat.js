"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

// Deshabilitar el botón hasta que la conexión esté lista
document.getElementById("sendButton").disabled = true;

// Recibir mensaje
connection.on("ReceiveMessage", function (mensaje) {

    console.log("mensaje recibido:", mensaje);

    const li = document.createElement("li");
    li.textContent = `${mensaje.name}: ${mensaje.message}`;
    document.getElementById("messagesList").appendChild(li);
});

// Iniciar la conexión
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Enviar mensaje
document.getElementById("sendButton").addEventListener("click", function (event) {

    const mensaje = {
        name: document.getElementById("userInput").value,
        message: document.getElementById("messageInput").value
    };

    console.log("mensaje enviado:", mensaje);

    connection.invoke("SendMessage", mensaje)
        .catch(function (err) {
            return console.error(err.toString());
        });

    event.preventDefault();
});
