const pantallaInicial = document.getElementById("pantalla-inicial");
const pantallaPrincipal = document.getElementById("pantalla-principal");
const copa = document.getElementById("copa");
const contador = document.getElementById("contador");
const lluviaRosas = document.getElementById("lluvia-rosas");

const fechaInicio = new Date("2024-10-31T00:00:00");

let contadorIniciado = false;
let lluviaIniciada = false;

window.onload = function () {
    pantallaInicial.style.display = "flex";
    pantallaPrincipal.style.display = "none";
};

function abrirCarta() {
    const musica = document.getElementById("musicaFondo");

    musica.volume = 0.4;
    musica.play().catch(() => {});

    pantallaInicial.style.display = "none";
    pantallaPrincipal.style.display = "flex";

    crearCorazonDeRosas();

    if (!contadorIniciado) {
        iniciarContador();
        contadorIniciado = true;
    }

    if (!lluviaIniciada) {
        iniciarLluviaDeRosas();
        lluviaIniciada = true;
    }
}

function crearCorazonDeRosas() {
    copa.innerHTML = "";

    const puntos = [];
    const escala = 8.5;
    const centroX = 170;
    const centroY = 145;

    for (let t = 0; t < Math.PI * 2; t += 0.12) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

        puntos.push({
            x: centroX + x * escala,
            y: centroY - y * escala,
            delay: puntos.length * 0.03
        });
    }

    for (let t = 0; t < Math.PI * 2; t += 0.22) {
        for (let factor = 0.2; factor <= 0.75; factor += 0.18) {
            const x = 16 * Math.pow(Math.sin(t), 3) * factor;
            const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * factor;

            puntos.push({
                x: centroX + x * escala,
                y: centroY - y * escala,
                delay: 1 + puntos.length * 0.01
            });
        }
    }

    const union = [
        { x: 170, y: 240 },
        { x: 165, y: 252 },
        { x: 175, y: 252 },
        { x: 160, y: 265 },
        { x: 180, y: 265 },
        { x: 170, y: 278 }
    ];

    for (let i = 0; i < union.length; i++) {
        puntos.push({
            x: union[i].x,
            y: union[i].y,
            delay: 2 + i * 0.05
        });
    }

    for (let i = 0; i < puntos.length; i++) {
        const rosa = document.createElement("div");
        rosa.classList.add("rosa");
        rosa.style.left = puntos[i].x + "px";
        rosa.style.top = puntos[i].y + "px";
        rosa.style.animationDelay = puntos[i].delay + "s";
        copa.appendChild(rosa);
    }
}

function iniciarContador() {
    actualizarContador();
    setInterval(actualizarContador, 1000);
}

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(segundosTotales / (60 * 60 * 24));
    const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((segundosTotales % (60 * 60)) / 60);
    const segundos = segundosTotales % 60;

    contador.textContent =
        dias + " días " +
        horas + " horas " +
        minutos + " minutos " +
        segundos + " segundos";
}

function iniciarLluviaDeRosas() {
    setInterval(crearPetalo, 350);
}

function crearPetalo() {
    const petalo = document.createElement("div");
    petalo.classList.add("petalo");
    petalo.textContent = "🌹";

    petalo.style.left = Math.random() * 100 + "vw";
    petalo.style.animationDuration = 6 + Math.random() * 5 + "s";
    petalo.style.fontSize = 14 + Math.random() * 10 + "px";

    lluviaRosas.appendChild(petalo);

    setTimeout(function () {
        petalo.remove();
    }, 12000);
}
