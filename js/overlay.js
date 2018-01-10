'use strict';

(function() {

    /**
     * @constructor
     */
    var Overlay = function () {
        var util = new Util();

        /**
         * Pop-up с формой редактированием загруженного фото
         * @type {Element | null}
         */
        var uploadOverlay = document.querySelector('.upload-overlay');
        
        /**
         * Метод, инициализирующий обработчики для загрузки фотографии
         * @private
         */
        function _initUploadPicture() {
            var form = document.querySelector('#upload-select-image');

            if (form) {
                var file = form.querySelector('#upload-file');

                if (file) {
                    file.addEventListener('change', _onUploadPictureChange);
                }
            }
        }

        /**
         * Метод, срабатывающий при добавлении фотографии
         * @private
         */
        function _onUploadPictureChange() {
            if (uploadOverlay) {
                _showUploadPicture(uploadOverlay);
            }
        }

        /**
         * Метод, инициализирующий обработчики на overlay редактирования фотографии
         * @param uploadOverlay
         * @private
         */
        function _initUploadOverlay(uploadOverlay) {
            var closeButton = uploadOverlay.querySelector('.upload-form-cancel');
            var controlLevel = uploadOverlay.querySelector('.upload-effect-level-line');

            window.filterDragUploadPreview.initDragControl(uploadOverlay);
            window.filterUploadPreview.initUploadPhotoControls(uploadOverlay);
            window.resizeUploadPreview.initControlsResizePhoto(uploadOverlay);
            window.validateHashField.initCheckHashField(uploadOverlay);

            if (controlLevel) {
                if (window.filterDragUploadPreview.controlWidth !== controlLevel.getBoundingClientRect().width) {
                    window.filterDragUploadPreview.controlWidth = controlLevel.getBoundingClientRect().width;
                }
            }

            if (closeButton) {
                var file = document.querySelector('#upload-file');

                closeButton.addEventListener('click', _onCloseUploadClick);
                document.addEventListener('keydown', _onEscCloseUploadKeyDown);

                if (file) {
                    file.removeEventListener('change', _onUploadPictureChange);
                }
            }
        }

        /**
         * Метод, закрывающий overlay редактирования фотографии по нажатию на Esc
         * @event e
         * @private
         */
        function _onEscCloseUploadKeyDown(e) {
            if (e.keyCode === util.keyCode.ESC && e.target.className !== 'upload-form-description') {
                _hideUploadPicture();
            }
        }

        /**
         * Метод, закрывающий overlay редактирования фотографии по клику на крестик
         * @private
         */
        function _onCloseUploadClick() {
            _hideUploadPicture();
        }

        /**
         * Метод, показывающий overlay редактирования фотографии
         * @param uploadOverlay
         * @private
         */
        function _showUploadPicture(uploadOverlay) {
            uploadOverlay.classList.remove('hidden');
            _initUploadOverlay(uploadOverlay);
        }

        /**
         * Метод, закрывающий overlay редактирования фотографии
         * @private
         */
        function _hideUploadPicture() {
            if (uploadOverlay) {
                uploadOverlay.classList.add('hidden');
                _removeUploadPictureEvents(uploadOverlay);
                _initUploadPicture();
            }
        }

        /**
         * Метод, удаляющий обработчики после закрытия overlay редактирования фотографии
         * @param uploadOverlay
         * @private
         */
        function _removeUploadPictureEvents(uploadOverlay) {
            var closeButton = uploadOverlay.querySelector('.upload-form-cancel');
            var effectControls = uploadOverlay.querySelector('.upload-effect-controls');
            var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
            var hashField = uploadOverlay.querySelector('.upload-form-hashtags');
            var pinControl = uploadOverlay.querySelector('#effect-range');

            if (pinControl) {
                pinControl.removeEventListener('input', window.filterDragUploadPreview.onPinControlRange);
            }

            if (hashField) {
                hashField.removeEventListener('change', window.validateHashField.checkHashField);
            }

            if (effectControls) {
                effectControls.removeEventListener('click', window.filterUploadPreview.onEffectPhotoControlClick);
            }

            if (resizeControls) {
                resizeControls.removeEventListener('click', window.resizeUploadPreview.onResizePhotoControlClick);
            }

            if (closeButton) {
                closeButton.removeEventListener('click', _onCloseUploadClick);
            }

            document.removeEventListener('keydown', _onEscCloseUploadKeyDown);
        }

        _initUploadPicture();
    }

    window.Overlay = Overlay;

})();