'use strict';

(function() {

    window.util = {
        /**
         * Метод, возвращающий случайное число от min до max
         * @param min {Number}
         * @param max {Number}
         * @returns {Number}
         */
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        /**
         * Метод, выводящий цифры из строки
         * @param str {string} Строка
         * @returns {string | void | Number}
         */
        getIntFromString: function(str) {
            return str.replace(/\D+/g,'');
        },
        /**
         * Метод, убирающий лишние пробелы
         * @param str {string} Строка, в которой нужно удалить лишние пробелы
         * @returns {string} Строка, без лишних пробелов
         */
        clearSpacesOnString: function(str) {
            return str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ');
        }
    };

})();