const pizarra = document.querySelector("canvas");
const pincel = pizarra.getContext("2d");
const contenedorPalabra = document.getElementById('palabraOculta');
const contenedorLetrasUsadas = document.getElementById('letrasUsadas');
const mensajeGanaste = document.getElementById('mensajeGanaste');
const mensajePerdiste = document.getElementById('mensajePerdiste');
const idLetras = document.getElementById("letras");
const menu = document.getElementById('menu');
const juego = document.getElementById('juego');
const palabras = document.getElementById('palabras');
var contadorErrores;
var contadorAcierto;
var letrasUsadas = [];
const abecedario = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','W','X','Y','Z'];


function nuevoJuego(){
    actualizarLista();
    eliminarPalabraOculta();
    eliminarLetrasUsadas();
    eliminarTeclado();
    letrasUsadas = [];
    mensajeGanaste.classList.add('ocultar');
    mensajePerdiste.classList.add('ocultar');
    reiniciarMuñeco();
    crearPalabraOculta(generarPalabraRandom());
    mostrarJuego();
    document.addEventListener('keydown', adivinarPalabra);
    construirTeclado(abecedario);
}

function crearMuñeco(){
    switch (contadorErrores) {
        case 0:
            pincel.fillStyle = "#462255";
            pincel.fillRect(0, 290, 250, 5);
            break;
        case 1:
            pincel.fillRect(50, 25, 5, 270);
            break;
        case 2:
            pincel.fillRect(50, 25, 130, 5);
            break;
        case 3:
            pincel.fillRect(180, 25, 5, 50);
            break;
        case 4:
            pincel.beginPath();
            pincel.arc(182.5, 100, 25, 0, 2 * Math.PI);
            pincel.fill();
            pincel.fillStyle = "#FFFBDB";
            pincel.beginPath();
            pincel.arc(182.5, 100, 20, 0, 2 * Math.PI);
            pincel.fill();
            break;
        case 5:
            pincel.fillStyle = "#462255";
            pincel.fillRect(180, 125, 5, 100);
            break;
        case 6:
            pincel.strokeStyle = "#462255";
            pincel.lineWidth = 5;
            pincel.beginPath();
            pincel.moveTo(182.5, 135);
            pincel.lineTo(150, 170);
            pincel.stroke();
            break;
        case 7:
            pincel.moveTo(182.5, 135);
            pincel.lineTo(215, 170);
            pincel.stroke();
            break;
        case 8:
            pincel.moveTo(182.5, 225);
            pincel.lineTo(150, 260);
            pincel.stroke();
            break;
        case 9:
            pincel.moveTo(182.5, 225);
            pincel.lineTo(215, 260);
            pincel.stroke();
            break;
    }
}

function reiniciarMuñeco(){
    contadorAcierto = 0;
    contadorErrores = 0;
    pincel.clearRect(0,0,pizarra.width, pizarra.height);
    pincel.fillRect(0, 290, 250, 5);
    crearMuñeco();
}

function generarPalabraRandom(){
    var palabraAleatoria = listaPalabras[Math.floor((Math.random() * listaPalabras.length))].toUpperCase();
    return palabraAleatoria;
}

function crearPalabraOculta(palabra){
    var newP;

    for(var i=0; i < palabra.length; i++){
        newP = document.createElement("p");
        newP.innerHTML = palabra[i];
        newP.classList.add('letter');
        newP.classList.add('hidden');
        contenedorPalabra.appendChild(newP);
    }
}

function eliminarPalabraOculta(){
    while(contenedorPalabra.firstChild){
        contenedorPalabra.removeChild(contenedorPalabra.firstChild);
    }
}

function eliminarLetrasUsadas(){
    while(contenedorLetrasUsadas.firstChild){
        contenedorLetrasUsadas.removeChild(contenedorLetrasUsadas.firstChild);
    }
}

function adivinarPalabra(event){
    var letraIngresada = event.key.toUpperCase();
    var contenedorHijos = contenedorPalabra.childNodes;
    var acierto = false;

    if((letraIngresada.match(/^[a-zñ]$/i)) && (letrasUsadas.includes(letraIngresada) != true)){
        
        mostrarLetraUsada(letraIngresada);
        letrasUsadas.push(letraIngresada);

        for(var i = 0; i < contenedorHijos.length; i++){
            if(contenedorHijos[i].innerHTML === letraIngresada){
                contenedorHijos[i].classList.remove('hidden');
                acierto = true;
                contadorAcierto += 1;
            }
        }

        if(acierto == false){
            contadorErrores += 1;
            if(contadorErrores < 9){
                crearMuñeco();
            }else{
                crearMuñeco();
                mostrarMensajePerdiste();
            }
        }else{
            if(contadorAcierto == contenedorHijos.length){
                mostrarMensajeGanaste();
            }
        }
    }
}

function mostrarLetraUsada(letraUsada){
    var newP;
    newP = document.createElement("p");
    newP.innerHTML = letraUsada;
    newP.classList.add('letterUsed');
    contenedorLetrasUsadas.appendChild(newP);
}

function construirTeclado(letras){
    var newP;

    for(var i=0; i < letras.length; i++){
        newP = document.createElement("span");
        newP.innerHTML = letras[i];
        newP.classList.add('tecla');
        idLetras.appendChild(newP);
    }
}

function eliminarTeclado(){
    while(idLetras.firstChild){
        idLetras.removeChild(idLetras.firstChild);
    }
}

function mostrarMensajePerdiste(){
    mensajePerdiste.classList.remove('ocultar');
    var contenedorHijos = contenedorPalabra.childNodes;
    for(var i = 0; i < contenedorHijos.length; i++){
        contenedorHijos[i].classList.remove('hidden');
    }
    document.removeEventListener('keydown', adivinarPalabra);
}

function mostrarMensajeGanaste(){
    mensajeGanaste.classList.remove('ocultar');
    document.removeEventListener('keydown', adivinarPalabra);
}

function mostrarJuego(){
    menu.classList.add('ocultar');
    juego.classList.remove('ocultar');
}

function mostrarAgregarPalabra(){
    menu.classList.add('ocultar');
    palabras.classList.remove('ocultar');
}

function volverMenu(){
    juego.classList.add('ocultar');
    palabras.classList.add('ocultar');
    menu.classList.remove('ocultar');
}