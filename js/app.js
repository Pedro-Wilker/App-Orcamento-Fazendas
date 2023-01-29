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
        $('#sucessoGravacao').modal('show');
    }else{
        $('#erroGravacao').modal('show');
    }
    
}

let bd = new Bd();