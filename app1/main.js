
let canvas; // referencia al elemento canvas
let ctx; // contexto para manipular el canvas
let fichas_tablero = [];
const lado = 100;
let game_over = false;
let turnos = 0;

const MENSAJE_TURNO_USUARIO = "Es tu turno!";
const MENSAJE_TURNO_MAQUINA = "Turno máquina ...";
const MENSAJE_EMPATE = "Empatamos!!";
const MENSAKE_VICTORIA_USUARIO = "Has ganado!! Felicidades!";
const MENSAKE_VICTORIA_MAQUINA = "Has perdido......contra una máquina tonta....";
const VALOR_USUARIO = "x";
const VALOR_MAQUINA = "o";
const RONDA_MAXIMAS = 9;
const COLUMNAS = 3
const FILAS = COLUMNAS


// Clase para gestionar cada una de las fichas del tablero
function Ficha(x,y,w,h,i,r,c) {

    function pintar (valor) {
        ctx.save();
        this.valor = valor;
        ctx.font = "bold 100px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(this.valor, this.x+30, this.y+lado, this.w, this.h);
        ctx.restore();
    }

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = i;
    this.r = r;
    this.c = c;
    this.valor = ""; // indica X o O
    this.pintar = pintar
}

function buscarFicha(r, c) {
    let ficha;

    for (let i = 0; i < fichas_tablero.length; i++) {
        ficha = fichas_tablero[i];

        if (ficha.r == r && ficha.c == c) {
            break;
        }
    }

    return ficha;
}


window.onload = function(){
    iniciar();
}

function iniciar () {
    fichas_tablero = [];
    game_over = false;
    turnos = 0;
    canvas = document.getElementById("tablero")

    if (canvas && canvas.getContext){
        ctx = canvas.getContext("2d");
        if (ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujar_tablero();
            dibujar_fichas();
            mensaje(MENSAJE_TURNO_USUARIO)
            activar_eventos_click();
        } else{
            alert("Error al crear el contexto!");
        }
   }
}

function activar_eventos_click() {
    canvas.addEventListener("click", gestionar_click_usuario, false);
}

function desactivar_eventos_click() {
    canvas.removeEventListener("click", gestionar_click_usuario, false);
}

function dibujar_tablero() {
    const inicio_linea_X = 35;
    const inicio_linea_Y = 280;
    const margen_h = 135
    const lado = 405;

    ctx.save();

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(inicio_linea_Y, inicio_linea_X + i*margen_h);
        ctx.lineTo(inicio_linea_Y+lado, inicio_linea_X + i*margen_h);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(inicio_linea_Y + i*margen_h, inicio_linea_X);
        ctx.lineTo(inicio_linea_Y + i*margen_h, inicio_linea_X+lado);
        ctx.stroke();
    }

    ctx.restore();
}


function dibujar_fichas() {
    /*Insertando fichas en array y las dibujamos   F,R,C */
    fichas_tablero.push(new Ficha(288,29,lado,lado,0,0,0));
    fichas_tablero.push(new Ficha(423,29,lado,lado,1,0,1));
    fichas_tablero.push(new Ficha(556,29,lado,lado,2,0,2));
    fichas_tablero.push(new Ficha(288,160,lado,lado,3,1,0));
    fichas_tablero.push(new Ficha(420,160,lado,lado,4,1,1));
    fichas_tablero.push(new Ficha(560,160,lado,lado,5,1,2));
    fichas_tablero.push(new Ficha(286,295,lado,lado,6,2,0));
    fichas_tablero.push(new Ficha(424,295,lado,lado,7,2,1));
    fichas_tablero.push(new Ficha(560,295,lado,lado,8,2,2));
}


function mensaje(mensaje) {
    let lon = (canvas.width-(20*mensaje.length))/2;
    ctx.fillStyle = "grey";
    ctx.clearRect(0,440,canvas.width,100);
    ctx.font = "bold 40px Courier";
    ctx.fillText(mensaje,lon,490);
}


function gestionar_click_usuario(e) {

    function ajustar(xx, yy){
        var pos = canvas.getBoundingClientRect();
        var x = xx - pos.left;
        var y = yy - pos.top;
        return {x:x, y:y}
    }

    const pos = ajustar(e.clientX, e.clientY)
    let ficha = null; // variable para saber la ficha seleccionada
    let i;

    for (i = 0; i < fichas_tablero.length; i++) {
        ficha = fichas_tablero[i];

        if (ficha.x > 0){
            if ((pos.x > ficha.x)&&
                (pos.x < ficha.x + ficha.w)&&
                (pos.y > ficha.y)&&
                (pos.y < ficha.y + ficha.h)
            ){
                turnos++; break;
            }
        }
    }

    if (ficha !== null) {
        if (i < fichas_tablero.length) {
            ficha.pintar(VALOR_USUARIO);
            setTimeout(turno_maquina, 1000);

            verificar();
        
            if(game_over == false && turnos < RONDA_MAXIMAS){
                mensaje(MENSAJE_TURNO_MAQUINA);
                // evitar detectar clicks
                desactivar_eventos_click();
            } else {
                if(game_over == false){
                    mensaje(MENSAJE_EMPATE);
                }
            }
        }
    
    }
}


function turno_maquina() {
    // la selección de ficha se hace de forma aleatoria (evitar calcular pesos por ficha, etc etc)
    turnos ++;

    if(game_over == false) {
        let elegibles = fichas_tablero.filter(ficha => ficha.valor === "");
        let ficha = elegibles[Math.floor(Math.random()*elegibles.length)];
        ficha.pintar(VALOR_MAQUINA);

        verificar();

        if(game_over == false){
            if(turnos < 9){
                activar_eventos_click();
                mensaje(MENSAJE_TURNO_USUARIO);
            }
        }
    }
}


function verificar() {

    let sum = 0;
    console.log(sum,fichas_tablero);

    // verificamos columnas
    if(game_over == false){
        for (let c = 0; c < COLUMNAS; c++) {
            sum = 0;
            for (let r = 0; r < FILAS; r++) {
                let ficha = buscarFicha(r, c);

                console.log(c, r, ficha.valor);
    
                if (ficha.valor === VALOR_USUARIO) {
                    sum ++;
                } else if (ficha.valor === VALOR_MAQUINA) {
                    sum --;
                }
                
                verificar_victoria(sum);
                if(game_over ) break;
            }
        }

    }

    // verificamos filas
    if(game_over == false){
        for (let r = 0; r < FILAS; r++) {
            sum = 0;
            for (let c = 0; c < COLUMNAS; c++) {
                let ficha = buscarFicha(r, c);
    
                if (ficha.valor === VALOR_USUARIO) {
                    sum ++;
                } else if (ficha.valor === VALOR_MAQUINA) {
                    sum --;
                }
                
                verificar_victoria(sum);
                if(game_over ) break;
            }
        }
    }

    // verificamos diagonal
    if(game_over == false){
        sum = 0;
        for (let r = 0; r < FILAS; r++) {
            let ficha = buscarFicha(r, r);

            if (ficha.valor === VALOR_USUARIO) {
                sum ++;
            } else if (ficha.valor === VALOR_MAQUINA) {
                sum --;
            }
        }
        verificar_victoria(sum);
    }

    // verificamos diagonal2
    if(game_over == false){
        let c = 2;
        sum = 0;
        for (let r = 0; r < FILAS; r++) {
            let ficha = buscarFicha(r, c);

            if (ficha.valor === VALOR_USUARIO) {
                sum ++;
            } else if (ficha.valor === VALOR_MAQUINA) {
                sum --;
            }
            c --;
        }
        verificar_victoria(sum);
    }

}


function verificar_victoria(sumatorio) {
    if (sumatorio == 3) {
        mensaje(MENSAKE_VICTORIA_USUARIO);
        desactivar_eventos_click();
        game_over = true;
        window.app.victorias++;
    } else if (sumatorio === -3) {
        mensaje(MENSAKE_VICTORIA_MAQUINA);
        desactivar_eventos_click();
        game_over = true;
    }
}
