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
            var valorLocal = Number($('#valorLocal').val());
            var aliquota = Number($('#aliquota').val());

            var valorImpostos = valorOriginal * aliquota;
            var valorComImpostos = valorOriginal + valorImpostos;

            var resultadoAvaliacao = '';
            if (valorLocal <= valorOriginal) {
                resultadoAvaliacao = "É melhor comprar localmente."
            } else {
                resultadoAvaliacao = "É melhor comprar do outro estado."
            }

            $('#valorLocalResultado').val(valorLocal);
            $('#valorOriginalResultado').val(valorOriginal);
            $('#resultadoComImpostos').val(valorComImpostos);
            $('#valorImpostos').val(valorImpostos);
            $('#resultadoAvaliacao').text(resultadoAvaliacao);
        }
    });

});
