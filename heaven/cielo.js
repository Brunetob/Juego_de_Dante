const TOTAL_PREGUNTAS = 10;
//base de datos de las preguntas
const bd_juego = [
    {
        id:'A',
    pregunta: '¿Cuál es el motivo principal por el cual las almas están rodeadas de una luz tenue y se mueven en un círculo? ',
respuesta: "compromiso" },
]
//variables para controlar el tiempo 
const timer = document.getElementById("tiempo");
//tiempo del juego en segundos 
const TIEMPO_DEL_JUEGO = 5;
//variable que indica el tiempo restante 
let timeleft = TIEMPO_DEL_JUEGO;
//variable de maneja el contador 
var countdown;
//creamos letras de la 
const container = document.querySelector(".container");
for(let i = 1; i  <= TOTAL_PREGUNTAS; i++){
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96);
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI/2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}
//boton cemenzar 
var comenzar = document.getElementById("start");
comenzar.addEventListener("click",function(event){
    document.getElementById("pantalla-incial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";

    largarTiempo()
    cargarPregunta() 
})
function largarTiempo(){
    countdown = setInterval(()=>{
        //restar un segundo al tiempo restante 
        timeleft--;
        //acutalizamos el texto del cronometro 
        timer.innerText = timeleft;
        //si el tiempo llega  a 0, detener el cronometro 
        if(timeleft<0){
            clearInterval(countdown);
            //mostrarPantallaFinal;
            alert("se acabo el tiempo")
        }
    },1000);
}


