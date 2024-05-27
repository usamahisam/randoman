var rs = require("randomstring");
var rn = require('random-number');
var sprintf = require('sprintf-js').sprintf;

void function (root) {
    function duplicateChar(char, length) {
        var txt = '';
        for (var i = 0; i < length; i++) {
            txt += char;
        }
        return txt;
    }

    function def(options, length = 10) {
        var options = options || {
            number: true,
            string: true,
            numberMin: 1,
        }
        var number = options.number
        var string = options.string
        var numberMin = options.numberMin
        var isAlphabetic = string && !number;
        var isAlphanumeric = string && number;
        var isNumeric = !string && number;

        if (isAlphabetic) {
            return rs.generate({
                length: length,
                charset: 'alphabetic'
            });
        }

        if (isAlphanumeric) {
            return rs.generate(length);
        }

        if (isNumeric) {
            var rg = rn({
                max: Number(duplicateChar("9", length - 1)),
                min: numberMin,
                integer: true
            });
            return sprintf('%' + length + '$s', rg);
        }
    }

    module.exports.defaults = def
}(this)