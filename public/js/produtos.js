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
    if ($('#id').val() != '') {
        atualizaDadosProduto();
    } else {
        carregaDadosProdutos();
    }
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
}

function atualizaDadosProduto()
{
    prod = {
        id: $('#id').val(),
        nome: $('#nomeProduto').val(),
        preco: $('#precoProduto').val(),
        estoque: $('#quantidadeProduto').val(),
        categoria_id: $('#departamentoProduto').val()
    };
    $.ajax({
        type: 'PATCH',
        url: '/api/produtos/' + prod.id,
        context: this,
        data: prod,
        success: function(prod){
            produto = JSON.parse(prod);
            linhas = $('#tabelaProdutos>tbody>tr');
            registroTabela = linhas.filter(function(i, element){
                return (element.cells[0].textContent == produto.id)
            })
            if (registroTabela) {
                registroTabela[0].cells[0].textContent = produto.id;
                registroTabela[0].cells[1].textContent = produto.nome;
                registroTabela[0].cells[2].textContent = produto.estoque;
                registroTabela[0].cells[3].textContent = produto.preco;
                registroTabela[0].cells[4].textContent = produto.categoria_id;
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

function editarProduto(id)
{
    $.ajax({
        type: 'GET',
        url: '/api/produtos/' + id,
        context: this,
        success: function(prod){
            produto = JSON.parse(prod);
            $('#id').val(produto.id);
            $('#precoProduto').val(produto.preco);
            $('#nomeProduto').val(produto.nome);
            $('#quantidadeProduto').val(produto.estoque);
            $('#departamentoProduto').val(produto.categoria_id);
            $('#dlgModalProdutos').modal('show');
        },
        error: function(error){
            console.log(error);
        }
    });
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