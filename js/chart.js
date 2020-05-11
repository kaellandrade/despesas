var ctx = document.getElementById('myChartTag').getContext('2d');
var ctx2 = document.getElementById('myChartMes').getContext('2d');


class Indicadores{
    constructor(){
        this.id = localStorage.getItem('id')
    }

    balancoTagValor(){
        let tag_valor = {
            'Alimentacão': 0.0,
            'Educação': 0.0,
            'Lazer': 0.0,
            'Saúde': 0.0,
            'Esporte': 0.0
        }

        for (let i = 1; i <= this.id; i++) {
            let item = JSON.parse(localStorage.getItem(i))
            if (item!= null){
                let preco =  parseFloat(item.valor)
                if(item.tipo == '1'){
                    tag_valor['Alimentacão'] += preco

                }else if(item.tipo == '2'){
                    tag_valor['Educação'] += preco

                }else if(item.tipo == '3'){
                    tag_valor['Lazer'] += preco

                }else if(item.tipo == '4'){
                    tag_valor['Saúde'] += preco

                }else if(item.tipo == '5'){
                    tag_valor['Esporte'] += preco

                }
            }        
        }
        return tag_valor
    }

    balancoMesValor(){
        let tag_mes_valor = {
            'Janeiro': 0.0,
            'Fevereiro': 0.0,
            'Março': 0.0,
            'Abril': 0.0,
            'Maio': 0.0,
            'Junho':0.0,
            'Julho':0.0,
            'Agosto':0.0,
            'Setembro':0.0,
            'Outubro':0.0,
            'Novembro':0.0,
            'Dezembro':0.0
        }

        for (let i = 1; i <= this.id; i++) {
            let item = JSON.parse(localStorage.getItem(i))
            if (item!= null){
                let preco =  parseFloat(item.valor)
                if(item.mes == '1'){
                    tag_mes_valor['Janeiro'] += preco

                }else if(item.mes == '2'){
                    tag_mes_valor['Fevereiro'] += preco

                }else if(item.mes == '3'){
                    tag_mes_valor['Março'] += preco

                }else if(item.mes == '4'){
                    tag_mes_valor['Abril'] += preco

                }else if(item.mes == '5'){
                    tag_mes_valor['Maio'] += preco

                }else if(item.mes == '6'){
                    tag_mes_valor['Junho'] += preco

                }else if(item.mes == '7'){
                    tag_mes_valor['Julho'] += preco

                }else if(item.mes == '8'){
                    tag_mes_valor['Agosto'] += preco

                }else if(item.mes == '9'){
                    tag_mes_valor['Setembro'] += preco

                }else if(item.mes == '10'){
                    tag_mes_valor['Outubro'] += preco

                }else if(item.mes == '11'){
                    tag_mes_valor['Novembro'] += preco

                }else if(item.mes == '12'){
                    tag_mes_valor['Dezembro'] += preco

                }
            }        
        }
        return tag_mes_valor
    }

    
}

indicador = new Indicadores()
valoresIndicadores = indicador.balancoTagValor()
valoresIndicadoresMes = indicador.balancoMesValor()


values_tipo = Object.values(valoresIndicadores)
keys_tipo = Object.keys(valoresIndicadores)



keys_mes = Object.keys(valoresIndicadoresMes)
values_mes = Object.values(valoresIndicadoresMes)

console.log(keys_mes)
console.log(values_mes)

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: keys_tipo,
        datasets: [{
            backgroundColor: [
                'rgb(254, 2, 20)',
                'rgb(123, 80, 159)',
                'rgb(136, 231, 119)',
                'rgb(0, 156, 222)',
                'rgb(35, 31, 32)'
            ],
            // borderColor: 'rgba(0, 0, 0, 0.5)',
            data: values_tipo
        }]
    },

    // Configuration options go here
    options: {
        
    }
});


var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: keys_mes,
        datasets: [{
            label: "Todos os meses",
            backgroundColor: [
                'rgb(254, 2, 20)',
                'rgb(123, 80, 159)',
                'rgb(136, 231, 119)',
                'rgb(0, 156, 222)',
                'rgb(35, 31, 32)',
                'rgb(2, 20, 20)',
                'rgb(13, 80, 159)',
                'rgb(16, 21, 19)',
                'rgb(2, 106, 22)',
                'rgb(5, 31, 32)',
                'rgb(6 16, 122)',
                'rgb(35, 3, 3)'
            ],
            // borderColor: 'rgba(0, 0, 0, 0.5)',
            data: values_mes
        }]
    },

    // Configuration options go here
    options: {
        responsive:true,
        title:{
            display:true,
            text:'Gasto durante o mês'

        },
        scales:{
            yAxes:[{
                    display:true,
                    scaleLabel:{
                        display: true,
                        labelString: "Valor em R$"
                    }
                }],
            xAxes:[{
                display:true,
                scaleLabel:{
                    display:true,
                    labelString: "Mês"
                }
            }]

        },
            
    }
});