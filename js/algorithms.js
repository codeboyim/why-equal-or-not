(function (exports) {


    function _isNaN(a) {
        return typeof a == 'number' && a.toString() == 'NaN';
    }

    function _isPositiveZero(a) {
        return a === 0 && 1 / a > 0;
    }

    function _isNegativeZero(a) {
        return a === 0 && 1 / a < 0;
    }

    function _isNull(a) {
        return typeof a == 'object' && a == null;
    }

    function _isUndefined(a) {
        return typeof a == 'undefined';
    }


    function _toPrimitive(a) {

        if (typeof a == 'object' && a != null) {
            return a.toString();
        }

        return a;
    }

    function AbstractEqual(input_x, input_y) {
        var r1, r2,
            x, y;
        eval('x=' + input_x + ';');
        eval('y=' + input_y + ';');

        r1 = x == y;
        r2 = AbstractEqualityAlgorithm(input_x, input_y);

        if (r1 != r2.result) {
            console.error('Please check rules in AbstractEqualityAlgorithm ');
        }

        console.log(r1, r2.rules);
        return {
            result: r1,
            rules: r2.rules
        };
    }

    function StrictEqual(input_x, input_y) {
        var r1, r2, x, y;
        eval('x=' + input_x + ';');
        eval('y=' + input_y + ';');

        r1 = x === y;
        r2 = StrictEqualityAlgorithm(input_x, input_y);

        if (r1 != r2.result) {
            console.error('Please check rules in StrictEqualityAlgorithm ');
        }

        console.log(r1, r2.rules);

        return {
            result: r1,
            rules: r2.rules
        };
    }

    function SameValue(input_x, input_y) {
        var r1, r2,
            x, y;

        eval('x=' + input_x + ';');
        eval('y=' + input_y + ';');

        if (typeof Object.is == 'undefined') {
            Object.is = function (a, b) {
                return SameValueAlgorithm(a, b);
            };
        }

        r1 = Object.is(x, y);
        r2 = SameValueAlgorithm(input_x, input_y);
        if (r1 != r2.result) {
            console.error('Please check rules in SameValueAlgorithm ');
        }
        console.log(r1, r2.rules);
        return {
            result: r1,
            rules: r2.rules
        };
    }


    function SameValueAlgorithm(input_x, input_y) {
        var x, y, r, rules = [];

        eval('x=' + input_x + ';');
        eval('y=' + input_y + ';');
        rules.push(input_x + ' is ' + input_y + '?')

        if (typeof x != typeof y) {
            rules.push('9.12.1: Type(x) is different from Type(y), return false');
            r = false;
        } else {

            switch (typeof x) {
            case 'undefined':
                rules.push('9.12.2: Type(x) is Undefined, return true.');
                r = true;
                break;
            case 'null':
                rules.push('9.12.3: Type(x) is different from Type(y), return false');
                r = true;
                break;
            case 'number':
                rules.push('9.12.4: Type(x) is Number');
                switch (true) {
                case _isNaN(x):
                    rules.push('9.12.4.a: x is NaN and y is NaN, return true');
                    r = true;
                    break;
                case _isPositiveZero(x) && _isNegativeZero(y):
                    rules.push('9.12.4.b: x is +0 and y is -0, return false');
                    r = false;
                    break;
                case _isNegativeZero(x) && _isPositiveZero(y):
                    rules.push('9.12.4.c: x is -0 and y is +0, return false');
                    r = false;
                    break;
                case x == y:
                    rules.push('9.12.4.d: x is the same Number value as y, return true');
                    r = true;
                    break;
                default:
                    rules.push('9.12.4.e: return false');
                    r = false;
                    break;
                }
                break;
            case 'string':
                if (x == y) {
                    rules.push('9.12.5:Type(x) is String, x and y are exactly the same sequence of characters (same length and same characters in corresponding positions, return true)');
                    r = true;
                } else {
                    rules.push('9.12.5:Type(x) is String, x and y are not exactly the same sequence of characters (same length and same characters in corresponding positions, return false)');
                    r = false;
                }
                break;

            case 'boolean':
                if (x == y) {
                    rules.push('9.12.6: Type(x) is Boolean, x and y are both true or both false, return true');
                    r = true;
                } else {
                    rules.push('9.12.6: Type(x) is Boolean, x and y are not both true nor both false, return false');
                    r = false;
                }
                break;
            default:
                if (x === y) {
                    rules.push('9.12.7:  x and y refer to the same object, return true');
                    r = true;
                } else {
                    rules.push('9.12.7:  x and y refer to different object, return false');
                    r = false;
                }
            }
        }
        return {
            result: r,
            rules: rules
        };
    }

    function AbstractEqualityAlgorithm(input_x, input_y) {
        var x, y, r, rules = [],
            subr;

        eval('x=' + input_x + ';');
        eval('y=' + input_y + ';');

        rules.push(input_x + ' == ' + input_y + '?');

        if (typeof x == typeof y) {

            rules.push('11.9.3.1 Type(x) is the same as Type(y), then')

            switch (typeof x) {

            case 'undefined':
                rules.push('11.9.3.1.a Type(x) is Undefined, return true');
                r = true;
                break;

            case 'null':
                rules.push('11.9.3.1.b Type(x) is Null, return true');
                r = true;
                break;

            case 'number':
                rules.push('11.9.3.1.c Type(x) is Number, then');

                if (_isNaN(x)) {
                    rules.push('11.9.3.1.c.i x is NaN, return false');
                    r = false;
                } else if (_isNaN(y)) {
                    rules.push('11.9.3.1.c.ii y is NaN, return false');
                    r = false;
                } else if (_isPositiveZero(x) && _isNegativeZero(y)) {
                    rules.push('11.9.3.1.c.iv x is +0 and y is −0, return true');
                    r = true;
                } else if (_isNegativeZero(x) && _isPositiveZero(y)) {
                    rules.push('11.9.3.1.c.v x is −0 and y is +0, return true');
                    r = true;
                } else if (x == y) {
                    rules.push('11.9.3.1.c.iii x is the same Number value as y, return true');
                    r = true;
                } else {
                    rules.push('11.9.3.1.c.vi return false');
                    r = false;
                }

                break;

            case 'string':

                if (x == y) {
                    rules.push('11.9.3.1.d Type(x) is String, x and y are exactly the same sequence of characters return true');
                    r = true;
                } else {
                    rules.push('11.9.3.1.d Type(x) is String, x and y are not exactly the same sequence of characters return false');
                    r = false;
                }

                break;

            case 'boolean':

                if (x == y) {
                    rules.push('11.9.3.1.d Type(x) is Boolean, x and y are both true or both false return true');
                    r = true;
                } else {
                    rules.push('11.9.3.1.d Type(x) is Boolean, x and y are not both true nor both false return false');
                    r = false;
                }

                break;

            default: //'object'

                if (x == y) {
                    rules.push('11.9.3.1.f x and y refer to the same object return true');
                    r = true;
                } else {
                    rules.push('11.9.3.1.f x and y do not refer to the same object return false');
                    r = false;
                }

                break;
            }

        } else if (_isNull(x) && _isUndefined(y)) {
            rules.push('11.9.3.2 x is null and y is undefined, return true');
            r = true;
        } else if (_isUndefined(x) && _isNull(y)) {
            rules.push('11.9.3.3 x is undefined and y is null, return true');
            r = true;
        } else if (typeof x == 'number' && typeof y == 'string') {
            rules.push('11.9.3.4 Type(x) is Number and Type(y) is String, comparing x == ToNumber(y)');
            subr = AbstractEqualityAlgorithm(input_x, Number(y));
        } else if (typeof x == 'string' && typeof y == 'number') {
            rules.push('11.9.3.5 Type(x) is String and Type(y) is Number, comparing ToNumber(x) == y');
            subr = AbstractEqualityAlgorithm(Number(x), input_y);
        } else if (typeof x == 'boolean') {
            rules.push('11.9.3.6 Type(x) is Boolean, comparing ToNumber(x) == y');
            subr = AbstractEqualityAlgorithm(Number(x), input_y);
        } else if (typeof y == 'boolean') {
            rules.push('11.9.3.7 Type(y) is Boolean, comparing x == ToNumber(y)');
            subr = AbstractEqualityAlgorithm(input_x, Number(y));
        } else if ((typeof x == 'string' || typeof x == 'number') && typeof y == 'object' && !_isNull(y)) {
            rules.push('11.9.3.8 Type(x) is either String or Number and Type(y) is Object, comparing x == ToPrimitive(y)');
            subr = AbstractEqualityAlgorithm(input_x, '\'' + _toPrimitive(y) + '\'');
        } else if (typeof x == 'object' && !_isNull(x) && (typeof y == 'string' || typeof y == 'number')) {
            rules.push('11.9.3.9 Type(x) is Object and Type(y) is either String or Number, comparing ToPrimitive(x) == y');
            subr = AbstractEqualityAlgorithm('\'' + _toPrimitive(x) + '\'', input_y);
        } else {
            rules.push('11.9.3.10 return false');
            r = false;
        }

        if (typeof subr != 'undefined') {
            r = subr.result;
            Array.prototype.splice.bind(rules, rules.length, 0).apply(null, subr.rules);
            rules.concat(subr.rules);
        }

        return {
            result: r,
            rules: rules
        };
    }

    function StrictEqualityAlgorithm(input_x, input_y) {
        var x, y, r, rules = [],
            subr;

        eval('x=' + input_x + ';');
        eval('y=' + input_y + ';');

        rules.push(input_x + ' === ' + input_y + ' ?');

        if (typeof x != typeof y) {
            r = false;
            rules.push('11.9.6.1 Type(x) is different from Type(y), return false');
        } else {
            switch (typeof x) {
            case 'undefined':
                r = true;
                rules.push('11.9.6.2 Type(x) is Undefined, return true');
                break;
            case 'null':
                r = true;
                rules.push('11.9.6.3 Type(x) is Null, return true');
                break;
            case 'number':
                rules.push('11.9.6.4 Type(x) is Number');
                if (_isNaN(x)) {
                    r = false;
                    rules.push('11.9.6.4.a x is NaN, return false');
                } else if (_isNaN(y)) {
                    r = false;
                    rules.push('11.9.6.4.b y is NaN, return false');

                } else if (_isPositiveZero(x) && _isNegativeZero(y)) {
                    r = true;
                    rules.push('11.9.6.4.d x is +0 and y is −0, return true');
                } else if (_isNegativeZero(x) && _isPositiveZero(y)) {
                    r = true;
                    rules.push('11.9.6.4.e −0 and y is +0, return true');
                } else if (x == y) {
                    r = true;
                    rules.push('11.9.6.4.c x is the same Number value as y, return true');
                } else {
                    r = false;
                    rules.push('11.9.6.4.f Return false');
                }
                break;
            case 'string':
                if (x == y) {
                    rules.push('11.9.6.5 Type(x) is String, x and y are exactly the same sequence of characters return true');
                    r = true;
                } else {
                    rules.push('11.9.6.5 Type(x) is String, x and y are not exactly the same sequence of characters return false');
                    r = false;
                }
                break;
            case 'boolean':

                if (x == y) {
                    rules.push('11.9.6.6 Type(x) is Boolean, x and y are both true or both false return true');
                    r = true;
                } else {
                    rules.push('11.9.6.6 Type(x) is Boolean, x and y are not both true nor both false return false');
                    r = false;
                }

                break;
            default:

                if (x == y) {
                    rules.push('11.9.6.7 x and y refer to the same object return true');
                    r = true;
                } else {
                    rules.push('11.9.6.7 x and y do not refer to the same object return false');
                    r = false;
                }

                break;

            }

        }

        return {
            result: r,
            rules: rules
        };
    }


    exports.abstractEqual = AbstractEqual;
    exports.strictEqual = StrictEqual;
    exports.sameValue = SameValue;



})(typeof exports !== 'undefined' ? exports : (this.algorithms ? this.algorithms : (this.algorithms = {})));