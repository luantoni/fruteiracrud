var url="http://localhost:3000/";
var parametro="product/";
var opc;
var op;
	
$(document).keypress(function(e) {
	if (e.which == 13) {
		incluir();
	}
});

function limpar(){
	document.getElementById("conteudo").innerHTML = "";
	document.getElementById("chave").value = "";
	document.getElementById("valor").value = "";
	document.getElementById("status").value = "";
	document.getElementById("estoque").value = "";
	document.getElementById("identidade").value = "";
	$('.classeinput').show();
}

function ajustes(){
	$('.classeinput').show();
	$('#conteudo').hide();
	$('#botaolimpar').show();
	$('#identidade').show();
}

function esconde(){
	$('#chave').hide();
	$('#valor').hide();
	$('#status').hide();
	$('#estoque').hide();
}

function ajustestodos(){
	$('#conteudo').show();
	$('#botaolimpar').show();
	$('.classeinput').hide();
}

function mostrar(){
	$('#chave').show();
	$('#valor').show();
	$('#status').show();
	$('#estoque').show();
}

function incluir (){
	ajustes();
	$('#identidade').hide();
	opc = 1;
	requi(parametro);
	limpar();
}

function deletar(){
	ajustes();
	esconde();
	var i = document.getElementById ("identidade").value;
	parametro = "product/"+i;
	opc = 2;
	requi(parametro);
	limpar();
}

function pesquisar(){
	ajustes();
	var identidade = document.getElementById ("identidade").value;
	rqpesquisar(parametro);
}

function todos(){
	ajustestodos();
	opc = 5;
	parametro="product/";
	requi(parametro);
	limpar();
}

function editar(){
	ajustes();
	mostrar();
	identidade = document.getElementById("identidade").value;
	parametro = "product/"+identidade;
	opc = 4;
	requi(parametro);
	limpar();
}

function rqpesquisar(parametro){
	var xmlhttp = new XMLHttpRequest();
	var identidade = document.getElementById ("identidade").value;
	xmlhttp.open("GET", url+parametro, true);
	xmlhttp.send(identidade);
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			buscaValores(identidade, myArr);
		}
	}
}

function requi (parametro){
	var xmlhttp = new XMLHttpRequest();
	var identidade = document.getElementById ("identidade").value;
	var chave = document.getElementById("chave").value.toLowerCase();
	var valor = document.getElementById("valor").value;
	var estado = document.getElementById("status").value;
	var estoque = document.getElementById("estoque").value;
	var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
	
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			estante(myArr);
		}
	}
	
	if (opc == 1){ /*opção incluir*/	
		if (chave != "" & valor != "" & estado != "" & estoque != ""){
			xmlhttp.open("POST", url+"product", true);
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		xmlhttp.send(params);
	}
	
	else if (opc == 2){/*opção deletar*/
		xmlhttp.open("DELETE", url+parametro, true);
		xmlhttp.send();	
	}
	
	
	else if (opc == 4){ /*opção editar*/
		xmlhttp.open("PUT", url+parametro, true);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.send(params);
	}

	else if (opc == 5){ //opção todos
		xmlhttp.open("GET", url+parametro, true);
		xmlhttp.send();
	}

}

function buscaValores(identidade, myArr){
	document.getElementById("chave").value = myArr[identidade-1].nome;
	document.getElementById("valor").value = myArr[identidade-1].valor;
	document.getElementById("status").value = myArr[identidade-1].status;
	document.getElementById("estoque").value = myArr[identidade-1].estoque;
}

function estante(produtos){
	var out = "";
	out+='<table border="1"><tr><th>Chave</th><th>Produto</th><th>Valor</th><th>Status</th><th>Estoque</th></tr>';		
		for (i=0; i < produtos.length; i++){
			out+= '<tr><td>' + produtos[i].id + '</td>';
			out+= '<td>' + produtos[i].nome + '</td>';
			out+='<td>' + produtos[i].valor + '</td>';
			out+='<td>' + produtos[i].status + '</td>';
			out+='<td>' + produtos[i].estoque + '</td></tr>';
		}
	'</table>'
	document.getElementById("conteudo").innerHTML = out;			
}

