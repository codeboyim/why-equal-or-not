(function () {
    'use strict';

    var input_x = document.getElementById('input_x'),
        input_y = document.getElementById('input_y'),
        output = document.getElementById('output'),
        operators = document.getElementById('operators'),
        reason = document.getElementById('reason'),
        operations = {
            '==': abstractEqual,
            '===': strictEqual,
            'is': sameValue
        },
        clientWidth = input_x.clientWidth,
        originalFontSize = 96,
        keyupEvent;


    input_x.addEventListener('keyup', eventHandler, false);
    input_y.addEventListener('keyup', eventHandler, false);
    operators.addEventListener('change', eventHandler, false);

    function adjusingFontSize() {
        var input = adjusingFontSize.input,
            scrollWidth,
            fs;

        if (!input) {
            window.requestAnimationFrame(adjusingFontSize);
            return;
        }

        scrollWidth = input.scrollWidth;
        fs = adjusingFontSize.fontSize;

        input.style.color = 'transparent';
        if (scrollWidth > clientWidth) {
            fs = fs - 2;
        } else {
            if (!adjusingFontSize.tryEnlarge && fs < originalFontSize) {
                adjusingFontSize.tryEnlarge = true;
                fs = fs + 10;
            } else {
                adjusingFontSize.tryEnlarge = false;
                input.style.color = 'inherit';
                adjusingFontSize.input = false;
            }
        }

        adjusingFontSize.fontSize = fs;
        input.style.fontSize = fs + 'px';
        input.style.lineHeight = fs + 'px';
        window.requestAnimationFrame(adjusingFontSize);
    }

    function recalFontSize(input) {
        var fs;
        adjusingFontSize.input = input;
        adjusingFontSize.fontSize = Number((fs = window.getComputedStyle(input).fontSize)
            .substring(0, fs.length - 2));
    }

    function eventHandler(e) {
        var op, html;

        if (!(input_x.textContent || input_y.textContent || '')) {
            return;
        }

        if (e.target.tagName === 'DIV') {
            recalFontSize(e.target);
        }

        try {
            op = operations[operators.selectedOptions[0].text](input_x.textContent, input_y.textContent);
        } catch (error) {
            output.value = '';
            output.className = '';
            reason.className = 'warn';
            console.error(error);
            reason.innerHTML = '<span>' + error.message + '</span>';
            return;
        }

        output.value = op.result;
        output.className = reason.className = op.result.toString();

        html = '<ul>';

        op.rules.forEach(function (r) {
            html += '<li>' + r + '</li>';
        });

        html += '</ul>';

        reason.innerHTML = html;
    }

    function abstractEqual(raw_x, raw_y) {
        return algorithms.abstractEqual(raw_x, raw_y);
    }

    function strictEqual(raw_x, raw_y) {
        return algorithms.strictEqual(raw_x, raw_y);
    }

    function sameValue(raw_x, raw_y) {
        return algorithms.sameValue(raw_x, raw_y);
    }

    adjusingFontSize();


    input_x.focus();
    keyupEvent = new Event('keyup');
    input_x.dispatchEvent(keyupEvent);

})();