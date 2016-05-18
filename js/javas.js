var strings={
	endereco:"http://localhost:3000/product",
	msgErroTestCode:"<p class='error'>Código inválido</p>",
	msgErroValidaCampo:"<p class='error'>Preencha todos os campos corretamente!</p>",
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
		preparaRequisicaoGet(id);
	}else{
		falhaTesteCodigo();
	}
}

function preparaRequisicaoGet(codigo){
	var id = codigo;
	var requisicao = 'GET';
	var url;
	if(id=="todos"){
		url = strings.endereco;
	}else{
		url = strings.endereco+'/'+id;
	}
	pesquisarProduto(id, requisicao, url);
}

function preparaTelaInsercao(){
	mostrarFormIncluir();
	limparCampos();
	ocultarBotoesEditarDeletar();
}

function procurarId(){
	var buscaId = document.getElementById('idProd');
	var id = buscaId.getAttribute('data-id');
	return id;
}

function preparaTelaEdicao(){
	var id = procurarId();
	mostrarFormEditar();
	preencheCampos(id);
}

function preencheCampos(codigo){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", strings.endereco+'/'+codigo, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			document.getElementById('chave').value = myArr.id;
			document.getElementById('nome').value = myArr.nome;
			document.getElementById('valor').value = myArr.valor;
			document.getElementById('status').value = myArr.status;
			document.getElementById('estoque').value = myArr.estoque;
		}
	}
}

function preparaRequisicaoPost(){
	var nome = document.getElementById('nome').value;
	var valor = document.getElementById('valor').value;
	var status = document.getElementById('status').value;
	var estoque = document.getElementById('estoque').value;
	validaCamposPost(nome, valor, status, estoque);
}

function preparaRequisicaoPut(){
	var id = document.getElementById('chave').value;
	var nome = document.getElementById('nome').value;
	var valor = document.getElementById('valor').value;
	var status = document.getElementById('status').value;
	var estoque = document.getElementById('estoque').value;
	validaCamposPut(id, nome, valor, status, estoque);
}

function validaCamposPost(nome, valor, status, estoque){
	if(nome!==''&&valor!==''&&status!==''&&estoque!==''){
		var requisicao = 'POST';
		var url = strings.endereco;
		var parametros = 'nome='+nome+'&&valor='+valor+'&&status='+status+'&&estoque='+estoque;
		incluirProdutos(requisicao, url, parametros);
	}else{
		document.getElementById('conteudo').innerHTML = strings.msgErroValidaCampo;
	}
}

function validaCamposPut(id, nome, valor, status, estoque){
	if(nome!==''&&valor!==''&&status!==''&&estoque!==''){
		var requisicao = 'PUT';
		var url = strings.endereco+'/';
		var parametros = 'nome='+nome+'&valor='+valor+'&status='+status+'&estoque='+estoque;
		editarProduto(id, requisicao, url, parametros);
	}else{
		document.getElementById('conteudo').innerHTML = strings.msgErroValidaCampo;
	}
}

function pesquisarProduto(id, requisicao, url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open(requisicao, url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function (){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			var tamanhoArr = myArr.length;
			if(tamanhoArr>1){
				listarPesquisaCompleta(myArr);
			}else{
				listarPesquisaIndividual(myArr);
				mostrarBotoesEditarDeletar();
				ocultarForm();
			}
		}else{
			falhaTesteCodigo();
			ocultarBotoesEditarDeletar();
		}
	}
}

function incluirProdutos(requisicao, url, parametros){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open(requisicao, url, true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(parametros);
	limparCampos();
	ocultarForm();
	var id = "todos";
	preparaRequisicaoGet(id);
}

function editarProduto(id, requisicao, url, parametros){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open(requisicao, url+id, true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(parametros);
	limparCampos();
	limparResultado();
	ocultarForm();
	ocultarBotoesEditarDeletar();
}

function listarPesquisaIndividual(data){
	var out = "";
	out+=strings.cabecalhoTabela;
	out+='<tr id="idProd" data-id="'+data.id+'"><td>'+data.id+'</td>';
	out+='<td>'+data.nome+'</td>';
	out+='<td>'+data.valor+'</td>';
	out+='<td>'+data.status+'</td>';
	out+='<td>'+data.estoque+'</td></tr></table>';
	document.getElementById("conteudo").innerHTML = out;
}

function listarPesquisaCompleta(data){
	var out = "";
	var i;
	out+=strings.cabecalhoTabela;
	for (i=0; i<data.length; i++){
		out+='<tr><td>'+data[i].id+'</td>';
		out+='<td>'+data[i].nome+'</td>';
		out+='<td>'+data[i].valor+'</td>';
		out+='<td>'+data[i].status+'</td>';
		out+='<td>'+data[i].estoque+'</td></tr>';
	}
	out+='</table>';
	document.getElementById("conteudo").innerHTML = out;
}

function preparaRequisicaoDel(){
	var id = procurarId();
	var requisicao = 'DELETE';
	var url = strings.endereco+'/';
	confirmarDelete(id, requisicao, url);
}

function confirmarDelete(codigo, requisicao, url){
	var press = confirm('ATENÇÃO! Tem certeza que deseja excluir este produto?');
	if(press===true){
		deletarProduto(codigo, requisicao, url);
		limparResultado();
		ocultarBotoesEditarDeletar();
	}
}

function deletarProduto(codigo, requisicao, url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open(requisicao, url+codigo, true);
	xmlhttp.send();
}

function pesquisarTodosProdutos(){
	var id = "todos";
	preparaRequisicaoGet(id);
	ocultarForm();
	limparCampos();
}

function cancela(){
	ocultarForm();
	limparResultado();
	ocultarBotoesEditarDeletar();
}

function limparResultado(){
	document.getElementById('conteudo').innerHTML = "";
}

function falhaTesteCodigo(){
	document.getElementById('conteudo').innerHTML = strings.msgErroTestCode;
}

function mostrarBotoesEditarDeletar(){
	document.getElementById('menuEditar').style.display = "inline";
	document.getElementById('menuDeletar').style.display = "inline";
}

function ocultarBotoesEditarDeletar(){
	document.getElementById('menuEditar').style.display = "none";
	document.getElementById('menuDeletar').style.display = "none";
}

function mostrarFormIncluir(){
	document.getElementById('inputs').style.display = "inline";
	document.getElementById('incluir').style.display = "inline";
	document.getElementById('editar').style.display = "none";
	limparResultado();
}

function mostrarFormEditar(){
	document.getElementById('inputs').style.display = "inline";
	document.getElementById('incluir').style.display = "none";
	document.getElementById('editar').style.display = "inline";
	limparResultado();
}

function ocultarForm(){
	document.getElementById('inputs').style.display = "none";
}

function limparCampos(){
	document.getElementById('nome').value = '';
	document.getElementById('valor').value = '';
	document.getElementById('status').value = '';
	document.getElementById('estoque').value = '';
}