var url="http://localhost:3000/";
var parametro;
var oi;
var opc;

	function incluir (){
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
		i = document.getElementById ("chave").value;
		parametro = "product/"+i;
		/*urlenviar = url+parametro;*/
		opc = 2;
		requi(parametro);
	}
	
	function todos(){
		parametro = "product/";
		opc = 3;
		requi(parametro);
	}
	
	function requi (parametro){
			
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
				estoque(myArr);
			}
		}
		
		if (opc == 1){ /*opção incluir*/
			var chave = document.getElementById("chave").value;
			var valor = document.getElementById("valor").value;
			var params="nome="+chave+"&valor="+valor;
			xmlhttp.open("POST", url+"product", true);
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				
			xmlhttp.onload = function () {
					console.log(this.responseText);
				};
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
	}
	
	function estoque(produtos){
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