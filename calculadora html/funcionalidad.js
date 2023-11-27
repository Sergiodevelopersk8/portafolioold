//Declaramos variables
var Memory = 0;
var operandoa;
var operandob;
var operacion;

function init()
{
	//variables
	var resultado = document.getElementById('resultado');
	var reset = document.getElementById('reset');
	var suma = document.getElementById('suma');
	var resta = document.getElementById('resta');
	var multiplicacion = document.getElementById('multiplicacion');
	var division = document.getElementById('division');
	var igual = document.getElementById('igual');
	var uno = document.getElementById('uno');
	var dos = document.getElementById('dos');
	var tres = document.getElementById('tres');
	var cuatro = document.getElementById('cuatro');
	var cinco = document.getElementById('cinco');
	var seis = document.getElementById('seis');
	var siete = document.getElementById('siete');
	var ocho = document.getElementById('ocho');
	var nueve = document.getElementById('nueve');
	var cero = document.getElementById('cero');
	///////////////// E X T R A ///////////////////////////////
	var porcentaje = document.getElementById('porcentaje');
	var sen = document.getElementById('sen');
	var cos = document.getElementById('cos');
	var tan = document.getElementById('tan');
	var potencia = document.getElementById('potencia');
	var grados = document.getElementById('grados');
	var radianes = document.getElementById('radianes');
	var Memoriaplus= document.getElementById('M+');
	var Memoriarest= document.getElementById('M-');
	var Memoriarecov= document.getElementById('MR');
	var punto=document.getElementById('punto');
	var mcclear=document.getElementById('MC');

	//eventos de click
	punto.onclick = function(e){
		resultado.textContent = resultado.textContent  + ".";
		punto.disabled=true;
		
  }
  dos

	/**/ 
	uno.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "1";
	}
	dos.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "2";
	}
	tres.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "3";
	}
	cuatro.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "4";
	}
	cinco.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "5";
	}
	seis.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "6";
	}
	siete.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "7";
	}
	ocho.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "8";
	}
	nueve.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "9";
	}
	cero.onclick = function(e){
  		resultado.textContent = resultado.textContent  + "0";
	}
	reset.onclick = function(e){
  		resetear();
	}
	suma.onclick = function(e){
  		operandoa = resultado.textContent;
		  operacion = "+";
		  punto.disabled=false;
  		limpiar();
	}
	resta.onclick = function(e){
  		operandoa = resultado.textContent;
		  operacion = "-";
		  punto.disabled=false;
  		limpiar();
	}
	multiplicacion.onclick = function(e){
  		operandoa = resultado.textContent;
		  operacion = "*";
		  punto.disabled=false;
  		limpiar();
	}
	division.onclick = function(e){
  		operandoa = resultado.textContent;
		  operacion = "/";
		  punto.disabled=false;
  		limpiar();
	}
	///////// E X T R A ///////
	porcentaje.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "%";
		punto.disabled=false;
		limpiar();
  	}
  	sen.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "sen";
		punto.disabled=false;
		//limpiar();
	}
	cos.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "cos";
		punto.disabled=false;
	}
	tan.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "tan";
		punto.disabled=false;
	}
	potencia.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "potencia";
		punto.disabled=false;
		limpiar();
	}
	grados.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "grados";
		
		limpiar();
	}
	radianes.onclick = function(e){
		operandoa = resultado.textContent;
		operacion = "radianes";
		//limpiar();
	}
	igual.onclick = function(e){
  		operandob = resultado.textContent;
  		resolver();
	}
	
	Memoriaplus.onclick = function(e){
		operacion="m+";
        Memory=parseFloat(Memory)+parseFloat(resultado.textContent);
        limpiar();
	}
	Memoriarest.onclick = function(e){
		if(Memory==0)
        {
            Memory=parseFloat(-resultado.textContent);
        }
        else
        {
            Memory=parseFloat(Memory)+parseFloat(-resultado.textContent);
        }
        limpiar();
	}
	Memoriarecov.onclick = function(e){
		resultado.textContent=Memory;
	}
	mcclear.onclick = function(e){
		//resultado.textContent=Memory;
		Memory=Memory=0;
		limpiar();
	}
	
}


function limpiar(){
	resultado.textContent = "";
}

function resetear(){
	resultado.textContent = "";
	operandoa = 0;
	operandob = 0;
	operacion = "";
}

function resolver(){
	var res = 0;
	switch(operacion){
		case "+":
			res = parseFloat(operandoa) + parseFloat(operandob);
			break;

		case "-":
		    res = parseFloat(operandoa) - parseFloat(operandob);
		    break;

		case "*":
			res = parseFloat(operandoa) * parseFloat(operandob);
			break;

		case "/":
			res = parseFloat(operandoa) / parseFloat(operandob);
			break;
		case "%":
			res = (parseFloat(operandoa) * parseFloat(operandob))/100;
			break;
		case "sen":
			res = Math.sin(parseFloat(operandob * Math.PI/180));
			
			break;
		case "cos":
			res = Math.cos(parseFloat(operandoa * Math.PI/180));
			break;
		case "tan":
			res = Math.tan(parseFloat(operandoa * Math.PI/180));
			break;
		case "potencia":
			res = Math.pow(parseFloat(operandoa), parseFloat(operandob));
			break;
		case "grados":
			res = ((parseFloat(operandoa)*180)/Math.PI);
			break;
		case "radianes":
			res = ((parseFloat(operandoa)*Math.PI)/180);
			break;						
	}
	resetear();
	resultado.textContent = res;
}

//https://codepen.io/6

//https://codepen.io/jhoward/pen/tqazd

//https://medium.freecodecamp.org/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98

