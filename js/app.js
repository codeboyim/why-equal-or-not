(function () {
    'use strict';

    var input_x = document.getElementById('input_x'),
        input_y = document.getElementById('input_y'),
        output = document.getElementById('output'),
        operators = document.getElementById('operators'),
        operations = {
            '==': abstractEqual,
            '===': strictEqual,
            'is': sameValue
        };


    input_x.addEventListener('keyup', eventHandler, false);
    input_y.addEventListener('keyup', eventHandler, false);
    operators.addEventListener('change', eventHandler, false);

    function eventHandler(e) {
        try {
            output.value = operations[operators.selectedOptions[0].text](input_x.value, input_y.value);
        } catch (error) {
            output.value = '';
        }
    }

    function abstractEqual(raw_x, raw_y) {
        return algorithms.abstractEqual(raw_x, raw_y).result;
    }

    function strictEqual(raw_x, raw_y) {
        return algorithms.strictEqual(raw_x, raw_y).result;
    }

    function sameValue(raw_x, raw_y) {
        return algorithms.sameValue(raw_x, raw_y).result;
    }






})();