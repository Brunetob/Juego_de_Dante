const TOTAL_PREGUNTAS = 10;

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


var comenzar = document.getElementById("start");
comenzar.addEventListener("click",function(event){
    document.getElementById("pantalla-incial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
})


