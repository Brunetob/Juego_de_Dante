
var cartasArray = [1,2,3,4,5,6,1,2,3,4,5,6]; /*array que indica cuántas cartas va a haber en el juego*/
var contadorVolteadas = 0;/*Contador de cartas volteadas para poder comparar solo dos cartas*/
/*Variables para relaizar validaciones como encontrar el par*/
var carta1 = '';
var carta2 = '';
var encontradas = 0;/*Contador de pares encontrados*/
var faltantes = 6;/*Pares faltantes*/
var tiempo = 0;/*Contador del tiempo jugado en segundos */
var temporizador; /*sirve para crear una función con un setinterval. Se inicia cuando empieza el juego y termina cuando se completaron los pares*/
var intentos = 0;/*Conteo de intentos en encontrar los pares*/
var clic = false;

function carta(x,y,w,h,imagenFrente,imagenAtras){/*Funcion u objeto "carta". Es la estructura que llevara cada una de las cartas*/
/*Recibe como parámetros su posición en 'x' y 'y', así como su ancho y altura y dos imágenes, una de frente y una de atrás */
/*Una imagen la lleva todas las cartas y la otra es individual*/
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagenAtras = imagenAtras;
    this.imagenFrente = imagenFrente;
    /*Atributo del template que es el que va a ser cada una de las cartas.Cada una de las cartas al ser invocadas va a insertar el código dentro del html para que se cree la carta*/
    this.template = `
    <div onclick="voltear(this)" class="flip-cartaTemporal ctrlCartas" carta="`+this.imagenAtras+`" 
        style="position: absolute;left: `+this.x+`px;top: `+this.y+`px; margin: 10px; width:`+this.w+`px; height:`+this.h+`px;">
        <div class="flip-cartaTemporal-inner">
            <div class="flip-cartaTemporal-front">
                <img src="`+this.imagenFrente+`" alt="AvatarF" style="width:`+this.w+`px;height:`+this.h+`px;">
            </div>
            <div class="flip-cartaTemporal-back">
                <img src="`+this.imagenAtras+`" alt="AvatarB" style="width: 100%; height: 100px;">
            </div>
        </div>
    </div> 
    `;
}

window.onload = function() {/*Cuando cargue la página va a invocar el método cargarCartas e iniciar temporizador */
    cargaCartas();
    temporizador();
};

function desordenarArrays(arrayX){
    /*Esta función recibe un array (cartasArray) para que desordene las cartas*/
    let arrayReacomodado = arrayX.sort(function(){return Math.random() -0.5});
    return arrayReacomodado;/*retora el array reacomodado*/
}

function temporizador(){
    /*Se setea el setInterval diciendole que incremente el tiempo en 1 y se ejecutará cada 1000milisegundos(1s)*/
    temporizador = setInterval(() => {
        tiempo++
        document.getElementById('temporizador').innerHTML = tiempo;/*se inserta en el elemento con id temporizador (span) en el html para que cambie el contenido a mostrar con la variable tiempo*/
    }, 1000);
}

function cargaCartas(){/*Funcion de cartas*/
    let cartasTemporal = desordenarArrays(cartasArray);/*Sirve para invocar la función que desordena el array y le pasamos el array de cartas. Guarda el array desordenado*/
    let modificador = 10;/*Se utiliza para pasarlo como parámetro 'x' ya que se necesita colocar cada carta en distintas coordenadas x */
    for(let i=0;i<12;i++){
        let lugar = document.getElementById("pantalla");/*variable temporal apra obtener el lugar en donde se vana insertar las cartas en el id pantalla*/
        if(i == 4 || i == 8){ modificador = 10; }/*Condicionales para modificar la variable modificador * cuando i es igual a 4 u 8 reasigna el valor en 10 para que ponga en columna 4 cartas -> 1|2|3|4 y al poner las 5 va a valer 10 y se regresaría hacia atrás apra continuar con la otra fila */
        if(i < 4){ y = 10; }/*Condicionales para modificar la posición en 'y' y posicionar las filas una debajo de otra*/
        if(i < 8 && i >3){ y = 130; }
        if(i < 12 && i >7){ y = 250; }
        let cartaTemporal = new carta(modificador ,y ,100 ,100 ,'img/fondo.png','img/'+cartasTemporal[i]+'.png'); /*instanciamos el objeto carta pasándole los parámetros de x, y, w, h; también en primer lugar la imagen de espaldas y luego la imagen de frente individual que toma de la carpeta imágenes como ruta y luego del array de cartasTemporal la posición de i en ese momento */
        lugar.insertAdjacentHTML("beforeend", cartaTemporal.template);/*Se inserta el código que se tiene como template de la carta y que antes del cierre del div de pantalla, se va a usar el objeto de carta temporal y accedemos al valor de template y lo va a ahcer por cada una de las iteraciones de 0 a 11 */
        modificador = modificador + 120;/*El modificador se le suma 120 para que la siguiente carta se sume en 120 la siguiente carta -> 10 130 */
    }
}

function pasarSiguienteNivel() {
    //Se redirige automáticamente al siguiente nivel una vez completado el primero
    window.location.href = "/heaven/cielo.html";
}

function voltear(e){
    e.setAttribute('onclick',"");
    e.classList.add('volteada');
    if(contadorVolteadas < 2){
        let imagenX = e.getAttribute('carta');
        if(contadorVolteadas == 0){
            carta1 = imagenX;
        }
        if(contadorVolteadas == 1){
            carta2 = imagenX;
        }
        e.firstElementChild.style.transform = ' rotateY(180deg) ';
        contadorVolteadas++;
        if(contadorVolteadas == 2){
            intentos++;
            document.getElementById('intentos').innerHTML = intentos ;
            let cartasArray = document.getElementsByClassName('flip-cartaTemporal-inner');
            setTimeout(() => {
                if(carta1 == carta2){
                    let chequeo = document.getElementsByClassName('ctrlCartas');
                    for (let cartaX of chequeo) {
                        let imagenCarta = cartaX.getAttribute('carta');
                        if(imagenCarta == carta1){
                            cartaX.setAttribute("style", "display: none;");
                            encontradas = encontradas + .5;
                            faltantes = faltantes - .5;
                            document.getElementById('encontrados').innerHTML = encontradas ;
                            document.getElementById('faltantes').innerHTML = faltantes ;
                            if(encontradas == 6){
                                clearInterval(temporizador);
                                document.getElementById('ganaste').style.display = 'block';
                                setTimeout(pasarSiguienteNivel, 1500); // Redirige al siguiente nivel después de 1.5 segundos
                            }
                        }
                    }
                }else{
                    let volteadas = document.getElementsByClassName('volteada');
                    let cantidadVolteadas = volteadas.length - 1;
                    for (let index = cantidadVolteadas; index >= 0; index--) {
                        volteadas[index].setAttribute("onclick","voltear(this);")
                        volteadas[index].classList.remove("volteada");
                    }
                }
                for(let cartaX of cartasArray){
                    cartaX.style.transform = '' ;
                    contadorVolteadas = 0;
                }
            }, 1000);
        }
    }
}