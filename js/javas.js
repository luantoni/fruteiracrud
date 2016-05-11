var url="http://localhost:3000/";
var parametro;
var opc;
var identidade;

	$(document).keypress(function(e) {
	  if (e.which == 13) {
		  incluir();
		  }
	});
	
	function limpa(){
		document.getElementById("conteudo").innerHTML = "";
		document.getElementById("chave").value = "";
		document.getElementById("valor").value = "";
		document.getElementById("status").value = "";
		document.getElementById("estoque").value = "";
		document.getElementById("identidade").value = "";
	}
	
	
	function incluir (){
		$('.classeinput').show();
		$('.classebotoes').show();
		parametro = "product/";
	/*	var n = document.getElementById ("chave").value;
		var v = document.getElementById ("valor").value;
			$.ajax({
			  type: 'POST',
			  url: "http://localhost:3000/product/",
			  data:{
				  nome: n,
				  valor: v  
			  }
			});*/
		opc = 1;
		requi(parametro);
	}
	
	
	function deletar(){
		$('.classeinput').show();
		$('.classebotoes').show();
		var i = document.getElementById ("identidade").value;
		parametro = "product/"+i;
		/*urlenviar = url+parametro;*/
		opc = 2;
		requi(parametro);
	}
	
	function todos(){
		$('.classeinput').hide();
		parametro = "product/";
		opc = 3;
		requi(parametro);
	}
	
	function editar(){
		$('.classeinput').show();
		$('.classebotoes').show();
		identidade = document.getElementById("identidade").value;
		parametro = "product/"+identidade;
		opc = 4;
		requi(parametro);
	}
	
	function deletartodos (){
		opc = 5;
		requi();
	}
	
	function requi (parametro){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
				estante(myArr);
			}
		}
		
		
		if (opc == 1){ /*opção incluir*/
			var chave = document.getElementById("chave").value;
			var valor = document.getElementById("valor").value;
			var estado = document.getElementById("status").value;
			var estoque = document.getElementById("estoque").value;
			var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
			
			if (chave != "" & valor != "" & estado != "" & estoque != ""){
				xmlhttp.open("POST", url+"product", true);
				xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					
				xmlhttp.onload = function () {
						console.log(this.responseText);
					};
			}
			xmlhttp.send(params);
		}
		
		else if (opc == 2){/*opção deletar*/
			xmlhttp.open("DELETE", url+parametro, true);
			xmlhttp.send();	
		}
		
		else if (opc == 3){ /*opção todos*/
			xmlhttp.open("GET", url+parametro, true);
			xmlhttp.send();	
		}
		
		else if (opc == 4){ /*opção editar*/
			var chave = document.getElementById("chave").value;
			var valor = document.getElementById("valor").value;
			var estado = document.getElementById("status").value;
			var estoque = document.getElementById("estoque").value;
			var params="nome="+chave+"&valor="+valor+"&status="+estado+"&estoque="+estoque;
			
			xmlhttp.open("PUT", url+parametro, true);
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				
			xmlhttp.onload = function () {
					console.log(this.responseText);
				};
			xmlhttp.send(params);
		}
		
		else if (opc == 5){
			parametro = "product/";
			for (var i=0; i < 6; i++){
				xmlhttp.open("DELETE", url+parametro+i, true);
				console.log(i)
			}
			xmlhttp.send();	
		}
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