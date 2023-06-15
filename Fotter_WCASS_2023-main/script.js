
var buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    alert("Has hecho clic en el botón " + button.textContent);
  });
});