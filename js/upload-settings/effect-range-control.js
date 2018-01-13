'use strict';

(function () {
    /**
     * @constructor
     */
    var EffectRangeControl = function () {
        /**
         * Объект, хранящий состояние фильтров
         * @type {Object}
         */
        this.filterRange = new Object();

        // Создание метода с привязкой, для установки и удаления одного и того же события
        this.onPinControlRangeBind = _onPinControlRange.bind(this);
    };

    /**
     * Метод, инициализирующий обработку событий на ползунке для фильтра
     */
    EffectRangeControl.prototype.initDragControl = function () {
        var controlPin = document.querySelector('#effect-range');

        if (controlPin) {
            controlPin.addEventListener('input', this.onPinControlRangeBind);
        }
    };

    /**
     * Метод, деинициализирующий обработку событий на ползунке для фильтра
     */
    EffectRangeControl.prototype.deInitDragControl = function () {
        var controlPin = document.querySelector('#effect-range');

        if (controlPin) {
            console.log(this);
            controlPin.removeEventListener('input', this.onPinControlRangeBind);
        }
    };

    /**
     * Метод, срабатывающий при изменении состоянии ползунка
     * @event e
     */
    EffectRangeControl.prototype.onPinControlRange = function (e) {
        _setFilter(e.target, this.getFilterRange());
    };

    /**
     * Метод, устанавливающий нужное состояние для фильтров, в зависимости от выбранного фильтра
     * @param {string} className Имя класса выбранного фильтра
     */
    EffectRangeControl.prototype.setMinMaxEffectSize = function (className) {
        var obj = new Object();
        var pin = document.querySelector('#effect-range');

        pin.value = 30;

        if (className.indexOf('effect-chrome') + 1) {
            obj['min'] = 0;
            obj['max'] = 1;
            obj['unit'] = '';
            obj['type'] = 'grayscale';
        } else if (className.indexOf('effect-sepia') + 1) {
            obj['min'] = 0;
            obj['max'] = 1;
            obj['unit'] = '';
            obj['type'] = 'sepia';
        } else if (className.indexOf('effect-marvin') + 1) {
            obj['min'] = 0;
            obj['max'] = 100;
            obj['unit'] = '%';
            obj['type'] = 'invert';
        } else if (className.indexOf('effect-phobos') + 1) {
            obj['min'] = 0;
            obj['max'] = 3;
            obj['unit'] = 'px';
            obj['type'] = 'blur';
        } else if (className.indexOf('effect-heat') + 1) {
            obj['min'] = 0;
            obj['max'] = 3;
            obj['unit'] = '';
            obj['type'] = 'brightness';
        } else {
            obj = {};
        }

        this.filterRange = obj;

        _setFilter(pin, this.filterRange);
    };

    /**
     * Максимальное значени ползунка
     * @type {number}
     * @const
     */
    var MAX_RANGE_VALUE = 100;

    /**
     * Метод, устанавливающий нужный эффект в зависимости от состояния ползунка
     * @param pin Ползунок
     * @param filterDrag {Object}
     * @private
     */
    function _setFilter(pin, filterDrag) {
        var preview = document.querySelector('.effect-image-preview');
        console.log(filterDrag);

        if (preview && Object.keys(filterDrag).length !== 0) {
            var step = filterDrag['max'] / MAX_RANGE_VALUE;
            var val = pin.value * step;

            if (pin.disabled) {
                pin.disabled = false;
            }

            preview.style.filter = filterDrag['type'] + '(' + val + filterDrag['unit'] + ')';
        } else if (Object.keys(filterDrag).length === 0) {
            preview.style.filter = '';
            if (!pin.disabled) {
                pin.disabled = true;
            }
        }
    }

    /**
     * Метод, срабатывающий при изменении состоянии ползунка
     * @event e
     * @private
     */
    function _onPinControlRange(e) {
        _setFilter(e.target, this.filterRange);
    }

    window.EffectRangeControl = EffectRangeControl;
    
})();