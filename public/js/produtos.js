$(document).ready(function(){
    carregarCategorias();
    carregaProdutos();
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': "{{ csrf_token() }}"
    }
});

function novoProduto()
{
    $('#id').val('');
    $('#precoProduto').val('');
    $('#nomeProduto').val('');
    $('#quantidadeProduto').val('');
    $('#dlgModalProdutos').modal('show');
}

function carregarCategorias()
{
    $.getJSON('/api/categorias', function(json)
    { 
        // console.log(json); 
        var opcao = '';
        for(i = 0; i < json.length; i++)
        {       
            opcao += "<option value='" + json[i].id + "'>" + json[i].nome + "</option>";                
        }
        opcao = '<option disabled selected value>Selecione a categoria</option>' + opcao;
        $('#departamentoProduto').append(opcao);
    });
}

function carregaProdutos()
{
    $.getJSON('api/produtos', function(json)
    {
        for(i = 0; i < json.length; i++)
        {
            // console.log(json[i]);
            linha = montaLinhaTabelaProdutos(json[i]);
            $('#tabelaProdutos>tbody').append(linha);
        }              
    });
}

function montaLinhaTabelaProdutos(json)
{
    linha = '<tr>' +
                '<td>' + json.id + '</td>' +
                '<td>' + json.nome + '</td>' +
                '<td>' + json.estoque + '</td>' +
                '<td>' + json.preco + '</td>' +
                '<td>' + json.categoria_id + '</td>' +
                '<td>' + 
                    '<button class="btn btn-sm btn-primary" onclick="editarProduto(' + json.id + ')">Editar</button> ' + 
                    '<button class="btn btn-sm btn-danger" onclick="removerProduto(' + json.id + ')">Apagar</button>' + 
                '</td>' +
            '</tr>';
    return linha;
}

$('#formProdutos').submit(function(event){
    event.preventDefault(); 
    carregaDadosProdutos();
    // console.log('funcionou');
    $('#dlgModalProdutos').modal('hide');
});

function carregaDadosProdutos() 
{
    prod = {
        nome: $('#nomeProduto').val(),
        preco: $('#precoProduto').val(),
        estoque: $('#quantidadeProduto').val(),
        categoria_id: $('#departamentoProduto').val()
    };
    $.post('/api/produtos', prod, function(produtoCadastrado){
        produto = JSON.parse(produtoCadastrado);
        linha = montaLinhaTabelaProdutos(produto);
        $('#tabelaProdutos>tbody').append(linha);
    });
    // console.log(prod);
}

function removerProduto(id)
{
    $.ajax({
        type: 'DELETE',
        url: '/api/produtos/' + id,
        context: this,
        success: function(){
            linha = $('#tabelaProdutos>tbody>tr');
            produto = linha.filter(function(i, element){
                return element.cells[0].textContent == id;
            });
            if (produto) {
                produto.remove();
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}