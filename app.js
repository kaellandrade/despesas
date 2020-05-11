class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
    
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id == null ){
            localStorage.setItem('id', 0)
        }
    }
    

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }
    
    gravar(despesa){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(despesa))

        localStorage.setItem('id', id)
    }

    recuperarTodosResgistro(){
        // array de despesas
        let despesas = Array()
        
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++){ // recupera todas as despesas cadastradas em localStorege
            //Recupera despesa
            let despesa = JSON.parse(localStorage.getItem(String(i)))
            
            //trantando índices removidos
            if(despesa === null){
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltaradas = Array()
        despesasFiltaradas = this.recuperarTodosResgistro()
        console.log(despesa)  //debug
        console.log(despesasFiltaradas) //debug

        //ano
        if(despesa.ano != ''){
            console.log('filtro de ano')
            despesasFiltaradas = despesasFiltaradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != ''){
            console.log('filtro de mes')

            despesasFiltaradas = despesasFiltaradas.filter(d => d.mes == despesa.mes)
        }
        // dia
        if(despesa.dia != ''){
            console.log('filtro de dia')
            despesasFiltaradas = despesasFiltaradas.filter(d => d.dia == despesa.dia)
        }

        // tipo
        if(despesa.tipo != ''){
            console.log('filtro de tipo')
            despesasFiltaradas = despesasFiltaradas.filter(d => d.tipo == despesa.tipo)
        }

        // descricao
        if(despesa.descricao != ''){
            console.log('filtro de descrição')
            despesasFiltaradas = despesasFiltaradas.filter(d => d.descricao == despesa.descricao)
        }

        // valor
        if(despesa.valor != ''){
            console.log('filtro de valor')
            despesasFiltaradas = despesasFiltaradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltaradas
    }
    
    remover(id){
        localStorage.removeItem(id)
    }
}

// Class dialog

class MensagemDialogo{
    constructor(){
        this.titleModal = document.getElementById('exampleModalLabel')
        this.mensagem = document.getElementById('mensagem')
        this.bodyModal = document.getElementById('bodyModal')
        this.buttonModal = document.getElementById('btModal')
    }
    
    sucessoCadastro(){
        this.titleModal.innerHTML = 'Registro inserido com sucesso'
        this.mensagem.innerHTML = 'Sua despesa foi cadastrada com sucesso!'
        this.buttonModal.innerHTML =  'Voltar'
        
        this.bodyModal.className = 'text-success modal-header'
        this.buttonModal.className = 'btn btn-success'
        $('#modalDespesa').modal('show')
    }

    falhaCadastro(){
        this.titleModal.innerHTML = 'Falha na gravação'
        this.mensagem.innerHTML = 'Por favor preencha todos os dados para efetuar o cadastro!'
        this.buttonModal.innerHTML =  'Voltar e corrigir'


        this.bodyModal.className = 'text-danger modal-header'
        this.buttonModal.className = 'btn btn-danger'
        $('#modalDespesa').modal('show')
    }

    itemRemovido(){
        this.titleModal.innerHTML = 'Item removido'
        this.mensagem.innerHTML = 'Seu item foi removido com sucesso'
        this.buttonModal.innerHTML =  'Voltar'


        this.bodyModal.className = 'text-primary modal-header'
        this.buttonModal.className = 'btn btn-primary'
        $('#modalDespesa').modal('show')
    }
    
}
let bd = new Bd()
let mensagem = new MensagemDialogo()


function cadastrarDespesa(){
    

   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let ano = document.getElementById('ano')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
   )

   if(despesa.validarDados()){
        bd.gravar(despesa)    
        mensagem.sucessoCadastro()
        limpaCampo()// Limpa os campos
   }else{
        mensagem.falhaCadastro()
   }

   function limpaCampo(){
        ano.value =''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }

    
}




function carregaListaDespesa(despesas = Array(), filtro = false){

    if (despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosResgistro()
    }

    // selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    //  percorrer o array despesas, listando cada despesas de forma dinâmica
     
    despesas.forEach(function (d) {

        //criando a linha(tr)
        let linha = listaDespesas.insertRow()

        
        // Ajustando a categoria da despesa
        switch (d.tipo) {
            case '1': d.tipo= "Alimentação"
                break;
            case '2': d.tipo = "Educação"
                break

            case '3': d.tipo = "Lazer"
                break
            case '4': d.tipo = "Saúde"
                break
            case '5': d.tipo = 'Trasnporte'
            default:
                break;
                
        }

        // cria as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // cria o botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class = "fas fa-times"></i>'
        btn.id =  `id_despesa_${d.id}`
        btn.onclick = function () {
            
            // remover a despesa
            let id = this.id.replace('id_despesa_','')
            bd.remover(id)
            mensagem.itemRemovido()            
        }
        linha.insertCell(4).append(btn)      
    })
}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    
    let despesa = new Despesa(
        ano, 
        mes,
        dia, 
        tipo, 
        descricao, 
        valor
    )


    let despesas = bd.pesquisar(despesa)

    carregaListaDespesa(despesas, true)
    
}