'use strict';

(function() {
    /**
     * @constructor
     */
    var HashField = function () {

    };

    var util = new Util();

    /**
     * Метод, инициализирующий события для проверки хэша
     * @param uploadOverlay
     */
    HashField.prototype.initCheckHashField = function (uploadOverlay) {
        var hashField = uploadOverlay.querySelector('.upload-form-hashtags');

        if (hashField) {
            hashField.addEventListener('change', this.checkHashField);
        }
    };

    /**
     * Метод, деинициализирующий события для проверки хэша
     * @param uploadOverlay
     */
    HashField.prototype.deInitCheckHashField = function (uploadOverlay) {
        var hashField = uploadOverlay.querySelector('.upload-form-hashtags');

        if (hashField) {
            hashField.removeEventListener('change', this.checkHashField);
        }
    };

    /**
     * Метод, проверяющий валидацию поля с вводом хэшей
     * @event e
     */
    HashField.prototype.checkHashField = function (e) {
        var target = e.target;
        var hashFieldVal = target.value;

        if (hashFieldVal !== '') {
            hashFieldVal = util.clearSpacesOnString(hashFieldVal);
            var hashFieldVals = hashFieldVal.split(' ');

            if (hashFieldVals.length <= 5) {
                var correct = true;

                hashFieldVals.forEach(function(hash, i) {
                    if (hash.indexOf('#') === 0) {
                        if (hash.length <= 20) {
                            for (var j = i + 1; j < hashFieldVals.length; j++) {
                                if (hash.toLocaleLowerCase() === hashFieldVals[j].toLocaleLowerCase()) {
                                    target.setCustomValidity('Повторяющиеся хеш-теги недопустимы');
                                    correct = false;
                                    break;
                                }
                            }
                            if (i === hashFieldVals.length - 1) {
                                if (correct) {
                                    target.classList.remove('wrong-input');
                                    target.setCustomValidity('');
                                } else {
                                    target.classList.add('wrong-input');
                                }
                            }
                        } else {
                            target.setCustomValidity('Максимальная длина одного хеш-тега = 20');
                            correct = false;
                        }
                    } else {
                        target.setCustomValidity('Все хеш-теги должны начинаться с "#"');
                        correct = false;
                    }
                });
            } else {
                target.setCustomValidity('Превышено кол-во хеш-тегов. Максимальное кол-во = 5');
            }
        }
    };

    window.HashField = HashField;

})();