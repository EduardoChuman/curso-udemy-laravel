@extends('layout.app', ["current" => "produtos" ])

@section('body')
    <div class="card border">
        <div class="card-body">
            <h5 class="card-title">Cadastro de Produtos</h5>
            <table class="table table-ordered table-hover" id='tabelaProdutos'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Departamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>      
        </div>
        <div class="card-footer">
            <button class="btn btn-sm btn-primary" role="button" onclick="novoProduto()">Novo produto</button>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="dlgModalProdutos">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form method="post" class="form-horizontal" id="formProdutos">
                    <div class="modal-header">
                        <h5 class="modal-title">Novo Produto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="id" id="id">
                        <div class="form-group">
                            <label for="nomeProduto" class="control-label">Nome</label>
                            <div class="input-group">
                                <input type="text" name="nomeProduto" id="nomeProduto" class="form-control" placeholder="Nome do produto">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="precoProduto" class="control-label">Preço</label>
                            <div class="input-group">
                                <input type="number" name="precoProduto" id="precoProduto" class="form-control" placeholder="Preço unitário">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="quantidadeProduto" class="control-label">Quantidade</label>
                            <div class="input-group">
                                <input type="number" name="quantidadeProduto" id="quantidadeProduto" class="form-control" placeholder="Quantidade em estoque">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="departamentoProduto" class="control-label">Categoria</label>
                            <div class="input-group">
                                <select name="departamentoProduto" id="departamentoProduto" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="cancel" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Cadastrar produto</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('javascript')
    <script type="text/javascript" src="{{ asset('js/produtos.js')}}"></script>
@endsection