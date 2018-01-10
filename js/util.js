'use strict';

(function () {

    /**
     * Конструктор утилита
     * @constructor
     */
    var Util = function () {

    }

    /**
     * Метод, возвращающий случайное число от min до max
     * @param min {Number}
     * @param max {Number}
     * @returns {Number}
     */
    Util.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Метод, выводящий цифры из строки
     * @param str {string} Строка
     * @returns {string | void | Number}
     */
    Util.prototype.getIntFromString = function (str) {
        return str.replace(/\D+/g,'');
    }

    /**
     * Метод, убирающий лишние пробелы
     * @param str {string} Строка, в которой нужно удалить лишние пробелы
     * @returns {string} Строка, без лишних пробелов
     */
    Util.prototype.clearSpacesOnString = function (str) {
        return str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ');
    }

    Util.prototype.keyCode = {
        ENTER: 13,
        ESC: 27
    }

    window.Util = Util;

})();
