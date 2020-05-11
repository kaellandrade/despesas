var ctx = document.getElementById('myChart').getContext('2d');

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
    
}

indicador = new Indicadores()
valoresIndicadores = indicador.balancoTagValor()

keys = Object.keys(valoresIndicadores)
values = Object.values(valoresIndicadores)


console.log(valoresIndicadores)
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: keys,
        datasets: [{
            backgroundColor: [
                'rgb(254, 2, 20)',
                'rgb(123, 80, 159)',
                'rgb(136, 231, 119)',
                'rgb(0, 156, 222)',
                'rgb(35, 31, 32)'
            ],
            // borderColor: 'rgba(0, 0, 0, 0.5)',
            data: values
        }]
    },

    // Configuration options go here
    options: {
        
    }
});