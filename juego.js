let numero = 0;
let intentos = 0;
let listaNumeros = [];
let numeroMax = 10;
let emoji = document.getElementById('face');
let mensaje = document.getElementById('parrafo_alerta');
emoji.src=""

//asigna un texto a un elemento html
function asignarElemento(elemento,texto){
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
}

function mostrar(){
    document.querySelector('#alerta').classList.remove('oculto');
}
function ocultar(){
    document.querySelector('#alerta').classList.add('oculto');
}
function fallo(){
    mensaje.classList.remove("correcto")
    let nueva = 'emoji1.svg'
    emoji.src = nueva;

    emoji.classList.add('shake');
    emoji.addEventListener('animationend',()=>{
        emoji.classList.remove('shake')
    },{ once: true });
    mensaje.classList.add("error")
}

function confeti(){
    mensaje.classList.remove("error")
    let nueva = 'confeti.svg';
    emoji.src= nueva;

    emoji.classList.add('aparecer');
    emoji.addEventListener('animationend',()=>{
    emoji.classList.remove('aparecer')
    },{ once: true });
    mensaje.classList.add("correcto")
}

//verificamos el intento
function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById("inputUsuario").value);
    //numero correcto
    if(numeroUsuario === numero){
        asignarElemento('#parrafo_alerta',`ACERTASTE EN ${intentos} ${(intentos===1) ? 'INTENTO!': 'INTENTOS' }`)
        document.getElementById("reset").removeAttribute('disabled');
        confeti();
        mostrar();
    }else{
      //numero incorrecto
            fallo()
            mostrar()
        if(numeroUsuario > numero){
            asignarElemento('#parrafo_alerta','FALLASTE! EL NUMERO SECRETO ES MENOR');
        }else{
            asignarElemento('#parrafo_alerta','FALLASTE! EL NUMERO SECRETO ES MAYOR');
        }
        intentos++;
        limpiarInput();
    }
    return
}

function numeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMax)+1;
    //si el numero generado esta incluido en la lista

    console.log(numeroGenerado);
    console.log(listaNumeros);
    if(listaNumeros.length == numeroMax){
        asignarElemento('.parrafo','Todos los numeros ya sorteados!');
        document.querySelector('.parrafo').classList.add('correcto')
        document.querySelector("#intento").setAttribute('disabled','true');          
    }else{
        if(listaNumeros.includes(numeroGenerado)){
            return numeroSecreto();
        }else{
            listaNumeros.push(numeroGenerado);
            return numeroGenerado;
        }
    }   
}

function limpiarInput(){
    document.querySelector("#inputUsuario").value = '';
}

function condicionesIniciales(){
    asignarElemento("p",`Numero Secreto entre 1 y ${numeroMax}`);
    numero = numeroSecreto();
    asignarElemento('#parrafo_alerta','');
    intentos = 1;
    ocultar();
}

function reiniciarJuego(){
    limpiarInput();
    condicionesIniciales();
    document.querySelector("#reset").setAttribute('disabled','true');
}

condicionesIniciales();

document.addEventListener('DOMContentLoaded', () => {
    const botonIntentar = document.getElementById('intento');
    const botonRestart = document.getElementById('reset');
    
    botonRestart.addEventListener('click', reiniciarJuego);
    botonIntentar.addEventListener('click', verificarIntento);
    inputUsuario.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previene el comportamiento por defecto, como enviar un formulario
            verificarIntento();
        }
    })
});





