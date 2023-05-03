class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false;
            }
        }
        return true;
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id');
            
        if(id === null){
            localStorage.setItem('id', 0);
        }
    }

    getProxId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
       
        let id = this.getProxId();

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id )
    }    

    recuperarTodosRegistros(){

        let despesas = Array();

        let id = localStorage.getItem('id')

        for(let i =1; i <= id ; i++){
            let despesa = JSON.parse(localStorage.getItem(i));

            if(despesa === null){
                continue
            }

            despesas.push(despesa);

        }

        return despesas;
    }

    pesquisar(despesa){
        
        let despesasFiltradas = Array();

        despesasFiltradas = this .recuperarTodosRegistros()
        

     
        if(despesa.ano != ''){
            console.log('Filtro ano')
            despesasFiltradas =  despesasFiltradas.filter(d => d.ano == despesa.ano);
        }

        if(despesa.mes != ''){
            console.log('Filtro mês')
            despesasFiltradas =  despesasFiltradas.filter(d => d.mes == despesa.mes);
        }

        if(despesa.dia != ''){
            console.log('Filtro dia')
            despesasFiltradas =  despesasFiltradas.filter(d => d.dia == despesa.dia);
        }

        if(despesa.tipo != ''){
            console.log('Filtro tipo')
            despesasFiltradas =  despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
        
        if(despesa.descricao != ''){
            console.log('Filtro descrição')
            despesasFiltradas =  despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }

        if(despesa.valor != ''){
            console.log('Filtro valor')
            despesasFiltradas =  despesasFiltradas.filter(d => d.valor == despesa.valor);
        }
    }
}


function cadastrarDespesa(){

    let ano = document.getElementById("ano");
    let mes = document.getElementById("mes");
    let dia = document.getElementById("dia");
    let tipo = document.getElementById("tipo");
    let descricao = document.getElementById("descricao");
    let valor = document.getElementById("valor");

    let despesa = new Despesa(
        ano.value,
        mes.value, 
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    

    if(despesa.validDados()){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro Inserido com sucesso';
        document.getElementById('modal_text').className= "modal-header text-sucess"
        document.getElementById('modal_conteudo').innerHTML = "Conteudo registrado com sucesso"
        document.getElementById("button-back").innerHTML = "Voltar";
        document.getElementById("button-back").className = "btn btn-success";

        $('#modalRegistraDespesa').modal('show');

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }else{

        document.getElementById('modal_titulo').innerHTML = 'Registro Inserido incorretamente';
        document.getElementById('modal_text').className= "modal-header text-danger"
        document.getElementById('modal_conteudo').innerHTML = "Erro na gravação, verifique se todos os campos foram preenchidos corretamente"
        document.getElementById("button-back").innerHTML = "Voltar e corrigir";
        document.getElementById("button-back").className = "btn btn-danger";

        $('#modalRegistraDespesa').modal('show');
    }
    
}

function loadListaDespesas(){

    let despesas = Array();

    despesas = bd.recuperarTodosRegistros();

    var listasConsultas = document.getElementById('lista-consultas');

    despesas.forEach(function(d){

        
        let linha = listasConsultas.insertRow();

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        switch(d.tipo){

            case '1': d.tipo = 'Alimentação'
                break;
            
            case '2': d.tipo = 'Orçamento'
                break;
            
            case '3': d.tipo = 'Compra de gado'
                break;
            
            case '4': d.tipo = 'Saúde'
                break;

            case '5': d.tipo = 'Material de construção'
                break;
            
            case '6': d.tipo = 'Materiais'
                break;
            
            case '7': d.tipo = 'Maquinas'
                break;
            
            case '8': d.tipo = 'Transporte'
                break;
           
            case '9': d.tipo = 'Funcionarios'
                break;
            
        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = "R$ " + d.valor +",00";
        
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value;
    let dia = document.getElementById('dia').value;
    let mes = document.getElementById('mes').value;
    let descricao = document.getElementById('descricao').value;
    let tipo = document.getElementById('tipo').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    bd.pesquisar(despesa);
}

let bd = new Bd();