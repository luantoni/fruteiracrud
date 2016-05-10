var url="http://localhost:3000/";
var params;
var oi;

	
	function todos(){
		params = "product/";
		assyncRequest(params);
	}
	
	function deletar(){
		i = document.getElementById ("chave").value;
		params = "product/"+i;
		urlenviar = url+params;
		deletarassync(urlenviar);
	}
	
	function deletarassync(urlenviar){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
					estoque(myArr);
					/*document.getElementById("conteudo").innerHTML = xmlhttp.responseText;*/
			}
		}; 
		xmlhttp.open("DELETE", urlenviar, true);
		xmlhttp.send();		
	}
	
	function assyncRequest(params){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
					estoque(myArr);
					/*document.getElementById("conteudo").innerHTML = xmlhttp.responseText;*/
			}
		}; 
		xmlhttp.open("GET", url+params, true);
		xmlhttp.send();		
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