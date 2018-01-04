'use strict';

(function() {

    window.validateHashField = {
        /**
         * Метод, инициализирующий события для проверки хэша
         * @param uploadOverlay
         */
        initCheckHashField: function(uploadOverlay) {
            var hashField = uploadOverlay.querySelector('.upload-form-hashtags');

            if (hashField) {
                hashField.addEventListener('change', window.validateHashField.checkHashField);
            }
        },
        /**
         * Метод, проверяющий валидацию поля с вводом хэшей
         * @param e {Event}
         */
        checkHashField: function(e) {
            var target = e.target;
            var hashFieldVal = target.value;

            if (hashFieldVal !== '') {
                hashFieldVal = window.util.clearSpacesOnString(hashFieldVal);
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
        }
    }

})();