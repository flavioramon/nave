//Definições do canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

//Variáveis iniciais
var inicio=false;
var velocidade_astro=1;
var vida=5;
var astronauta = {};
var pontos = 0;
var keysDown = {};
var then = Date.now();
var nave = {
	velocidade: 256

};

//Carrega imagens
var bgCarregado = false;
var bgFundo = new Image();
bgFundo.onload = function () {
bgCarregado = true;
};

bgFundo.src = "imgs/fundo.png";

var naveCarregado = false;
var naveImagem = new Image();
naveImagem.onload = function () {
	naveCarregado = true;
};

naveImagem.src = "imgs/disco.png";

var astronautaCarregado = false;
var astronautaImagem = new Image();
astronautaImagem.onload = function () {
	astronautaCarregado = true;
};
astronautaImagem.src = "imgs/astronauta.png";

//Verifica tecla pressionadas

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var update = function (atualiza) {

	//Limita movimentação
	moveastronauta();
	
	
	//Movimenta o astronauta
	if (38 in keysDown) { 
		nave.y -= nave.velocidade * atualiza;
	}
	if (40 in keysDown) { 
		nave.y += nave.velocidade * atualiza;
	}
	if (37 in keysDown) { 
		nave.x -= nave.velocidade * atualiza;
	}
	if (39 in keysDown) { 
		nave.x += nave.velocidade * atualiza;
	}
	
	//Identifica colisao
	if (
		nave.x <= (astronauta.x + 59)
		&& astronauta.x <= (nave.x + 120)
		&& nave.y <= (astronauta.y + 32)
		&& astronauta.y <= (nave.y + 32)
	)
{
		++pontos;
		velocidade_astro+=0.1;
		
		
		//Reposiciona o astronauta
		
		reset();
	}
};

//Reinicia jogo
var reset = function () {

	if (inicio==false) {
	nave.x=150;
	nave.y=150;
	}
	astronauta.x = (Math.random() * (canvas.width - 59));
	astronauta.y = 0;
	
};

//Renderiza o canvas

var render = function () {
	
	if (bgCarregado) {
		ctx.drawImage(bgFundo, 0, 0);
	}

	if (naveCarregado) {
		ctx.drawImage(naveImagem, nave.x, nave.y);
	}

	if (astronautaCarregado) {
		ctx.drawImage(astronautaImagem, astronauta.x, astronauta.y);
	}

	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Pontos: " + pontos, 32, 32);
	
	ctx.fillStyle = "rgb(250, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Vidas: " + vida, 450, 32);
};

//Loop Principal

var principal = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	inicio=true;
};

reset();
setInterval(principal, 1);


function moveastronauta() {

	astronauta.y+=velocidade_astro;
	if (astronauta.y>400) {
	astronauta.y=0;
	vida-=1;
	
	if (vida<0) {
	gameOver();
	}
	
	}
	
}

//Função GameOver

function gameOver() {
	alert ("Game Over");
	window.location.reload();
}

