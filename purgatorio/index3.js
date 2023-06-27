const pecadosCapitales = [
    {
      nombre: "La soberbia",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la soberbia?",
          opciones: ["Arrogancia", "Humildad", "Generosidad", "Paciencia"],
          respuestaCorrecta: "Arrogancia"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría simbolizar el pecado de la soberbia?",
          opciones: ["Una corona", "Una vela", "Un espejo", "Un reloj"],
          respuestaCorrecta: "Una corona"
        }
      ]
    },
    {
      nombre: "La avaricia",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la avaricia?",
          opciones: ["Generosidad", "Desprendimiento", "Codicia", "Satisfacción"],
          respuestaCorrecta: "Codicia"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría simbolizar el pecado de la avaricia?",
          opciones: ["Una bolsa de dinero", "Una flor", "Un libro", "Una llave"],
          respuestaCorrecta: "Una bolsa de dinero"
        }
      ]
    },
    {
      nombre: "La lujuria",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la lujuria?",
          opciones: ["Castidad", "Lealtad", "Deseo desenfrenado", "Amor puro"],
          respuestaCorrecta: "Deseo desenfrenado"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría representar el pecado de la lujuria?",
          opciones: ["Un corazón rojo", "Una pluma", "Una espada", "Una copa de vino"],
          respuestaCorrecta: "Un corazón rojo"
        }
      ]
    },
    {
      nombre: "La ira",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la ira?",
          opciones: ["Paciencia", "Tolerancia", "Violencia", "Compasión"],
          respuestaCorrecta: "Violencia"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría representar el pecado de la ira?",
          opciones: ["Un puño cerrado", "Una nube", "Una pluma", "Un árbol"],
          respuestaCorrecta: "Un puño cerrado"
        }
      ]
    },
    {
      nombre: "La gula",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la gula?",
          opciones: ["Moderación", "Sobriedad", "Exceso", "Disciplina"],
          respuestaCorrecta: "Exceso"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría simbolizar el pecado de la gula?",
          opciones: ["Un plato lleno de comida", "Una flor", "Una pelota", "Un sombrero"],
          respuestaCorrecta: "Un plato lleno de comida"
        }
      ]
    },
    {
      nombre: "La envidia",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la envidia?",
          opciones: ["Alegría por el éxito ajeno", "Empatía", "Respeto", "Celos"],
          respuestaCorrecta: "Celos"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría simbolizar el pecado de la envidia?",
          opciones: ["Un ojo verde", "Una montaña", "Una pluma", "Un zapato"],
          respuestaCorrecta: "Un ojo verde"
        }
      ]
    },
    {
      nombre: "La pereza",
      preguntas: [
        {
          pregunta: "¿Cuál de los siguientes comportamientos está asociado con el pecado de la pereza?",
          opciones: ["Esfuerzo", "Dedicación", "Inactividad", "Productividad"],
          respuestaCorrecta: "Inactividad"
        },
        {
          pregunta: "¿Cuál de los siguientes objetos podría simbolizar el pecado de la pereza?",
          opciones: ["Un sofá", "Una nube", "Una pluma", "Una bicicleta"],
          respuestaCorrecta: "Un sofá"
        }
      ]
    }
  ];
  
  let currentPecadoIndex = 0;
let currentQuestionIndex = 0;
let attemptsLeft = 3;

const pecadoTitle = document.getElementById("pecado-title");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const attemptsCounter = document.getElementById("attempts-counter");

function selectRandomPecado() {
    currentPecadoIndex = Math.floor(Math.random() * pecadosCapitales.length);
}

function selectRandomQuestion() {
    const currentPecado = pecadosCapitales[currentPecadoIndex];
    const currentQuestion = currentPecado.preguntas[currentQuestionIndex];

    pecadoTitle.innerText = currentPecado.nombre;
    questionText.innerText = currentQuestion.pregunta;
    optionsList.innerHTML = "";

    currentQuestion.opciones.forEach((opcion, index) => {
        const listItem = document.createElement("li");
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "option";
        radioButton.value = opcion;
        radioButton.id = "option" + index;
        const label = document.createElement("label");
        label.innerText = opcion;
        label.htmlFor = "option" + index;
        listItem.appendChild(radioButton);
        listItem.appendChild(label);
        optionsList.appendChild(listItem);
    });

    attemptsCounter.innerText = attemptsLeft;
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {
        const currentPecado = pecadosCapitales[currentPecadoIndex];
        const currentQuestion = currentPecado.preguntas[currentQuestionIndex];
        const selectedAnswer = selectedOption.value;

        if (selectedAnswer === currentQuestion.respuestaCorrecta) {
            alert("¡Respuesta correcta!");
            nextQuestion();
        } else {
            attemptsLeft--;
            attemptsCounter.innerText = attemptsLeft;

            if (attemptsLeft === 0) {
                alert("Se agotaron tus intentos. As fracasado.");
                window.location.href = "index.html";
            } else {
                alert("Respuesta incorrecta. Intenta de nuevo.");
            }
        }
    } else {
        alert("Selecciona una opción antes de enviar tu respuesta.");
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= pecadosCapitales[currentPecadoIndex].preguntas.length) {
        currentQuestionIndex = 0;
        attemptsLeft = 3;
        currentPecadoIndex++;

        if (currentPecadoIndex >= pecadosCapitales.length) {
            alert("Has respondido todas las preguntas sobre los 7 pecados capitales. Regresando a la página principal.");
            window.location.href = "index.html";
        }
    }

    selectRandomQuestion();
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", checkAnswer);

selectRandomPecado();
selectRandomQuestion();