var url="http://localhost:3000/";
var parametro="product/";
var opc;
var op;

$(document).keypress(function(e) {
	if (e.which == 13) {
		incluir();
	}
});

$('.classeinput').hide();	
$('.classebotoes').show();	

function limpar(){
	document.getElementById("conteudo").innerHTML = "";
	document.getElementById("chave").value = "";
	document.getElementById("valor").value = "";
	document.getElementById("status").value = "";
	document.getElementById("estoque").value = "";
	document.getElementById("identidade").value = "";
	$('.classeinput').show();
}

function incluir (){
	$('.classeinput').show();
	$('#conteudo').hide();
	$('#botaolimpar').show();
	$('#identidade').hide();
	/*	var n = document.getElementById ("chave").value;
	var v = document.getElementById ("valor").value;
	var s = document.getElementById ("status").value;
	var e = document.getElementById ("estoque").value;
	$.ajax({
		  type: 'POST',
		  url: "http://localhost:3000/product/",
		  data:{
			  nome: n,
			  valor: v,
			  status: s,  
			  estoque: e
		  }
		});*/
	opc = 1;
	requi(parametro);
	limpar();
}


function deletar(){
	$('.classeinput').show();
	$('#conteudo').hide();
	$('#botaolimpar').show();
	$('#identidade').show();
	$('#chave').hide();
	$('#valor').hide();
	$('#status').hide();
	$('#estoque').hide();
	var i = document.getElementById ("identidade").value;
	parametro = "product/"+i;
	opc = 2;
	requi(parametro);
	limpar();
}

function pesquisar(){
	$('.classeinput').show();
	$('#conteudo').hide();
	$('#botaolimpar').show();
	var identidade = document.getElementById ("identidade").value;
	if (identidade != ""){
		opc = 3;
		requi(parametro);
	}
}

function todos(){
	$('#conteudo').show();
	$('#botaolimpar').show();
	$('.classeinput').hide();	
	opc = 5;
	requi(parametro);
	limpar();
}

function editar(){
	$('.classeinput').show();
	$('#conteudo').hide();
	$('#botaolimpar').show();
	$('#identidade').show();
	$('#chave').show();
	$('#valor').show();
	$('#status').show();
	$('#estoque').show();
	identidade = document.getElementById("identidade").value;
	parametro = "product/"+identidade;
	opc = 4;
	requi(parametro);
	limpar();
}


function requi (parametro){
	var xmlhttp = new XMLHttpRequest();
	var identidade = document.getElementById ("identidade").value;
	var chave = document.getElementById("chave").value;
	var valor = document.getElementById("valor").value;
	var estado = document.getElementById("status").value;
	var estoque = document.getElementById("estoque").value;
	
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			estante(myArr);
		}
	}
	
	if (opc == 1){ /*opção incluir*/
		var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
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
	
	else if (opc == 3){ /*opção pesquisar*/
		xmlhttp.open("GET", url+parametro, true);
		xmlhttp.send(identidade);
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
				buscaValores(identidade, myArr);
			}
		}
	}
	
	else if (opc == 4){ /*opção editar*/
		var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
		var i = document.getElementById("tdident");
		console.log(i);
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
