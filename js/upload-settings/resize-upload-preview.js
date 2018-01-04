'use strict';

(function() {

    window.resizeUploadPreview = {
        /**
         * Метод, инициализирующий события для масштаблирования preview
         * @param uploadOverlay
         */
        initControlsResizePhoto: function (uploadOverlay) {
            var controls = uploadOverlay.querySelector('.upload-resize-controls');

            if (controls) {
                controls.addEventListener('click', window.resizeUploadPreview.onResizePhotoControlClick);
            }
        },
        /**
         * Метод, клик по кнопкам масштаблирования preview
         * @param e {Event}
         */
        onResizePhotoControlClick: function (e) {
            var target = e.target;

            if (target.classList.contains('upload-resize-controls-button')) {
                resizePreview(target);
            }
        }
    };

    /**
     * Метод, изменяющий масштаб preview и значения поля масштабирования.
     * Минимальное значение поля 25%, максимальное 100%
     * @param obj Цель - кнопка увеличения или уменьшения
     */
    function resizePreview(obj) {
        var controlInput = document.querySelector('.upload-resize-controls-value');
        var preview = document.querySelector('.effect-image-preview');

        if (controlInput && preview) {
            var controlVal = parseInt(window.util.getIntFromString(controlInput.value));

            if (controlVal) {
                if (obj.classList.contains('upload-resize-controls-button-inc')) {
                    controlVal += 25;

                    if (controlVal > 100) {
                        controlVal = 100;
                    }
                } else if (obj.classList.contains('upload-resize-controls-button-dec')) {
                    controlVal -= 25;

                    if (controlVal < 25) {
                        controlVal = 25;
                    }
                }

                preview.style.transform = 'scale(' + controlVal / 100 + ')';
                controlInput.value = controlVal + '%';
            }
        }
    }

})();