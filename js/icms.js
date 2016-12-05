var estados = [
    {
        nome: 'Tocantins',
        uf: 'TO',
        aliquotas: [
            {
                uf: 'DF',
                valor: '0.12'
            },
            {
                uf: 'GO',
                valor: '0.12'
            }
        ]
    },
    {
        nome: 'Goiás',
        uf: 'GO',
        aliquotas: [
            {
                uf: 'DF',
                valor: '0.12'
            },
            {
                uf: 'TO',
                valor: '0.12'
            }
        ]
    },
    {
        nome: 'Distrito Federal',
        uf: 'DF',
        aliquotas: [
            {
                uf: 'TO',
                valor: '0.12'
            },
            {
                uf: 'GO',
                valor: '0.12'
            }
        ]
    }
];

$(document).ready(function () {
    $('select').material_select();

    $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: .5,
        in_duration: 300,
        out_duration: 200,
        starting_top: '4%',
        ending_top: '10%',
        ready: function () {
            var valorOriginal = Number($('#valorOriginal').val());
            var taxa = Number($('#taxa').val());
            var periodo = Number($('#periodo').val());
            //TODO: calcular juros simples ou compostos
            var tipoJuros = $('#tipoJuros').val();
            var porcetangemJuros = 0;
            var valorFinal = (1 + porcetangemJuros) * valorOriginal;
            if (tipoJuros === 'S') {
                porcetangemJuros = calculaJurosSimples(taxa, periodo);
                valorFinal = (1 + porcetangemJuros) * valorOriginal;
            } else if (tipoJuros === 'C') {
                porcetangemJuros = calculaJurosCompostos(taxa, periodo);
                valorFinal = porcetangemJuros * valorOriginal;
            }
            //TODO: cada prestação do composto?
            var prestacao = valorFinal / periodo;
            $('#valorFinal').val(valorFinal);
            $('#prestacao').val(prestacao);
            $('#quantasVezes').val(periodo);
        }
    });

    function comparaUfs(current) {
        return current.uf === ufEstadoOrigem;
    }

    function calculaTaxaICMSEntreEstados(ufEstadoOrigem, ufEstadoDestino) {
        var estadoOrigem = estados.find(function (current) {
            return current.uf === ufEstadoOrigem;
        });
        debugger;
        var aliquotaOrigem = estadoOrigem.aliquotas.find(function (current) {
            return current.uf === estadoOrigem.uf;
        }).valor;
        var estadoDestino = estados.find(function (current) {
            return current.uf === ufEstadoDestino;
        });
        var aliquotaDestino = estadoDestino.aliquotas.find(function (current) {
            return current.uf === estadoDestino.uf;
        }).valor;
        return {
            ali1: aliquotaDestino,
            ali2: aliquotaOrigem
        };
    }

    console.log(['cálculo: ', calculaTaxaICMSEntreEstados('TO', 'GO')]);

});
