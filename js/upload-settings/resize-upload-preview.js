'use strict';

(function() {
    /**
     * @constructor
     */
    var PreviewResize = function () {
        
    };

    /**
     * Метод, инициализирующий события для масштаблирования preview
     * @param uploadOverlay
     */
    PreviewResize.prototype.initControlsResizePhoto = function (uploadOverlay) {
        var controls = uploadOverlay.querySelector('.upload-resize-controls');

        if (controls) {
            controls.addEventListener('click', this.onResizePhotoControlClick);
        }
    };

    /**
     * Метод, клик по кнопкам масштаблирования preview
     * @event e
     */
    PreviewResize.prototype.onResizePhotoControlClick = function (e) {
        var target = e.target;

        if (target.classList.contains('upload-resize-controls-button')) {
            _resizePreview(target);
        }
    };

    var util = new Util();

    /**
     * Метод, изменяющий масштаб preview и значения поля масштабирования.
     * Минимальное значение поля 25%, максимальное 100%
     * @param obj Цель - кнопка увеличения или уменьшения
     */
    function _resizePreview(obj) {
        var controlInput = document.querySelector('.upload-resize-controls-value');
        var preview = document.querySelector('.effect-image-preview');

        if (controlInput && preview) {
            var controlVal = parseInt(util.getIntFromString(controlInput.value));

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

    window.PreviewResize = PreviewResize;

})();