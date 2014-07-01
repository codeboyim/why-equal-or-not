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
        },
        clientWidth = input_x.clientWidth,
        originalFontSize = 96;

    input_x.focus();
    input_x.addEventListener('keyup', eventHandler, false);
    input_y.addEventListener('keyup', eventHandler, false);
    operators.addEventListener('change', eventHandler, false);

    function eventHandler(e) {

        try {
            console.log(e.target.getAttribute('maxLength'));
            if (e.target.tagName === 'INPUT') {
                if (e.target.value.length == e.target.getAttribute('maxLength')) {
                    return;
                }
                recalFontSize(e.target);
            }
            output.value = operations[operators.selectedOptions[0].text](input_x.value, input_y.value);
        } catch (error) {
            output.value = '';
            console.error(error);
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

    function recalFontSize(input) {
        var fs;
        adjusingFontSize.input = input;
        adjusingFontSize.fontSize = Number((fs = window.getComputedStyle(input).fontSize).substring(0, fs.length - 2));
        adjusingFontSize();
    }

    function adjusingFontSize() {
        var input = adjusingFontSize.input,
            scrollWidth = input.scrollWidth,
            fs = adjusingFontSize.fontSize;

        if (scrollWidth > clientWidth) {
            fs = fs - 5;
        } else {
            if (!adjusingFontSize.tryEnlarge && fs < originalFontSize) {
                adjusingFontSize.tryEnlarge = true;
                fs = fs + 10;
            } else {
                adjusingFontSize.tryEnlarge = false;
                return;
            }
        }

        adjusingFontSize.fontSize = fs;
        input.style.fontSize = fs + 'px';

        window.requestAnimationFrame(adjusingFontSize);
    }




})();