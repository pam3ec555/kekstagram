'use strict';

(function () {

    window.filterUploadPreview = {
        /**
         * Метод, инициализирующий события по изменению эффектов картинки по контролам
         * @param uploadOverlay
         */
        initUploadPhotoControls: function (uploadOverlay) {
            var controls = uploadOverlay.querySelector('.upload-effect-controls');

            if (controls) {
                controls.addEventListener('click', window.filterUploadPreview.onEffectPhotoControlClick);
            }
        },
        /**
         * Метод, клик по контролам изменения эффекта фотографии
         * @param e {Event}
         */
        onEffectPhotoControlClick: function (e) {
            var target = e.target;
            var obj = null;

            if (target.classList.contains('upload-effect-label')) {
                obj = target;
            } else if (target.classList.contains('upload-effect-preview')) {
                obj = target.parentNode;
            }

            if (obj !== null) {
                if (obj.classList.contains('upload-effect-label')) {
                    var effectStyle = getEffectStyle(obj);
                    var preview = document.querySelector('.effect-image-preview');

                    if (effectStyle && preview) {
                        preview.className = effectStyle;

                        window.filterDragUploadPreview.setMinMaxEffectSize(preview.className);
                    }
                }
            }
        }
    };

    /**
     * Метод, возвращающий классы для картинки, для применения ксс эфектов
     * @param obj Цель - эффект который был выбран
     * @returns {string}
     */
    function getEffectStyle(obj) {
        var effect = obj.getAttribute('for');
        var result = 'effect-image-preview ';

        if (effect) {
            if (effect.indexOf('upload-') + 1) {
                result += effect.replace('upload-', '');
            }
        }

        return result;
    }

})();