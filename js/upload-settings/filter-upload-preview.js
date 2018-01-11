'use strict';

(function () {
    /**
     * @constructor
     */
    var EffectControl = function () {

    };

    var effectRangeControl = new EffectRangeControl();

    /**
     * Метод, клик по контролам изменения эффекта фотографии
     * @event e
     */
    EffectControl.prototype.onEffectPhotoControlClick = function (e) {
        var target = e.target;
        var obj = null;

        if (target.classList.contains('upload-effect-label')) {
            obj = target;
        } else if (target.classList.contains('upload-effect-preview')) {
            obj = target.parentNode;
        }

        if (obj !== null) {
            if (obj.classList.contains('upload-effect-label')) {
                var effectStyle = _getEffectStyle(obj);
                var preview = document.querySelector('.effect-image-preview');

                if (effectStyle && preview) {
                    preview.className = effectStyle;

                    effectRangeControl.setMinMaxEffectSize(preview.className);
                }
            }
        }
    };

    /**
     * Метод, инициализирующий события по изменению эффектов картинки по контролам
     * @param uploadOverlay
     */
    EffectControl.prototype.initUploadPhotoControls = function (uploadOverlay) {
        var controls = uploadOverlay.querySelector('.upload-effect-controls');

        if (controls) {
            controls.addEventListener('click', this.onEffectPhotoControlClick);
        }
    };

    /**
     * Метод, возвращающий классы для картинки, для применения ксс эфектов
     * @param obj Цель - эффект который был выбран
     * @returns {string}
     * @private
     */
    function _getEffectStyle(obj) {
        var effect = obj.getAttribute('for');
        var result = 'effect-image-preview ';

        if (effect) {
            if (effect.indexOf('upload-') + 1) {
                result += effect.replace('upload-', '');
            }
        }

        return result;
    }

    window.EffectControl = EffectControl;

})();