var url="http://localhost:3000/";
var params;
var oi;
	function teste(){
		params = "product/"
		oi = document.getElementById("chave").value.toLowerCase();
		requisi (params, oi);
	}
	
	function deletar(){
		params = "product/"
		oi = document.getElementById("chave").value.toLowerCase();
		requisideletar (params, oi);
	}
	
	function requisideletar (params, oi){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
					estoque(myArr);
			}
		}; 
		xmlhttp.open("DELETE", url+params+oi, true);
		xmlhttp.send(null);		
	}
	function requisi(params, oi){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
					estoque(myArr);
			}
		}; 
		xmlhttp.open("POST", url+params+oi, true);
		xmlhttp.send(oi);		
	}
	
	function todos(){
		params = "product";
		assyncRequest(params);
	}
	
	function assyncRequest(params){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
					estoque(myArr);
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