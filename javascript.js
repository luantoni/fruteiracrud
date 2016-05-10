var url;
	function todos(){
		lista=2;
		url= "http://localhost:3000/product";
		document.getElementById("chave").value = "Todos os itens";
		assyncRequest(lista);
	}
	
	function limpa(){
		document.getElementById("conteudo").innerHTML = "";
		document.getElementById("chave").value = "";
	}

	function teste(){
		var i = document.getElementById("chave").value.toLowerCase();
		var lista;
		if (i != ""){
			lista = 1;
			url ="http://localhost:3000/product/"+i;
			assyncRequest(lista);
		}
	}
	
	function assyncRequest(lista){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function (){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var myArr = JSON.parse(xmlhttp.responseText);
					estoque(myArr, lista);
			}
		}; 
		
		xmlhttp.open("GET", url, true);
		xmlhttp.send();		
	}
	
	function estoque(produtos, lista){
		var out = "";
		out+='<table border="1"><tr><th>Chave</th><th>Produto</th><th>Valor</th><th>Status</th><th>Estoque</th></tr>';
		if (lista == 1){			
			out+= '<tr><td>' + produtos.id + '</td>';
			out+= '<td>' + produtos.nome + '</td>';
			out+='<td>' + produtos.valor + '</td>';
			out+='<td>' + produtos.status + '</td>';
			out+='<td>' + produtos.estoque + '</td></tr></table>';
		}
		
		if (lista == 2){
			for (i=0; i < produtos.length; i++){
				out+= '<tr><td>' + produtos[i].id + '</td>';
				out+= '<td>' + produtos[i].nome + '</td>';
				out+='<td>' + produtos[i].valor + '</td>';
				out+='<td>' + produtos[i].status + '</td>';
				out+='<td>' + produtos[i].estoque + '</td></tr>';
			}
			'</table>'
		}
		document.getElementById("conteudo").innerHTML = out;			
	
	}

		