var strings={
	endereco:"http://localhost:3000/product/",
	msgErroTestCode:"Código inválido",
	cabecalhoTabela:"<table border='1'><tr><th>Chave</th><th>Produto</th><th>Valor</th><th>Status</th><th>Estoque</th></tr>"
};

function enter(event){
   	var teclaEnter = event.which || event.keyCode;
    if(teclaEnter===13){
    	limparResultado();
    	testarCodigo();
    }
}

function testarCodigo(){
	var id = document.getElementById('CampoPesquisar').value;
	document.getElementById('CampoPesquisar').value='';
	var num = isNaN(id);
	if(id!=='' && num===false){
		preparaRequisicao(id);
	}else{
		falhaTesteCodigo();
	}
}

function preparaRequisicaoGet(codigo){
	var id = codigo;
	var requisicao = 'GET';
	pesquisarProduto(id, requisicao);
}

function pesquisarProduto(id, requisicao){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open(requisicao, strings.endereco+id, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			listarPesquisa(myArr);
		}else{
			falhaTesteCodigo();
		}
	}
}

function listarPesquisa(data){
	var out = "";
	out+=strings.cabecalhoTabela;
	out+='<tr><td>'+data.id+'</td>';
	out+='<td>'+data.nome+'</td>';
	out+='<td>'+data.valor+'</td>';
	out+='<td>'+data.status+'</td>';
	out+='<td>'+data.estoque+'</td></tr></table>';
	document.getElementById("conteudo").innerHTML = out;
}

function limparResultado(){
	document.getElementById('conteudo').innerHTML = "";
}

function falhaTesteCodigo(){
	document.getElementById('conteudo').innerHTML = strings.msgErroTestCode;
}





/*

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
	if (identidade != ""){
		opc = 3;
	}
	requi(parametro);
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


function requi (parametro){
	var xmlhttp = new XMLHttpRequest();
	var identidade = document.getElementById ("identidade").value;
	var chave = document.getElementById("chave").value.toLowerCase();
	var valor = document.getElementById("valor").value;
	var estado = document.getElementById("status").value;
	var estoque = document.getElementById("estoque").value;
	
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			estante(myArr);
		}
	}
	
	if (opc == 1){ /*opção incluir*//*
		var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
		if (chave != "" & valor != "" & estado != "" & estoque != ""){
			xmlhttp.open("POST", url+"product", true);
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		xmlhttp.send(params);
	}
	
	else if (opc == 2){/*opção deletar*//*
		xmlhttp.open("DELETE", url+parametro, true);
		xmlhttp.send();	
	}
	
	else if (opc == 3){ /*opção pesquisar*//*
	console.log(identidade);
		xmlhttp.open("GET", url+parametro, true);
		xmlhttp.send(identidade);
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
				buscaValores(identidade, myArr);
			}
		}
	}
	
	else if (opc == 4){ /*opção editar*//*
		var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
		console.log(params);
		if (identidade!= "" & chave != "" & valor != "" & estado != "" & estoque != ""){
		xmlhttp.open("PUT", url+parametro, true);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.send(params);
		}
	}

	else if (opc == 5){ //opção todos
		xmlhttp.open("GET", url+parametro, true);
		xmlhttp.send();
	}

}

function buscaValores(identidade, myArr){
	console.log(identidade);
	console.log(myArr);
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
*/