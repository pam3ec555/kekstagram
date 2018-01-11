'use strict';

(function() {
    /**
     * @constructor
     */
    var Overlay = function () {
        _initUploadPicture();
    };

    var util = new Util();
    var effectControl = new EffectControl();
    var effectRangeControl = new EffectRangeControl();
    var previewResize = new PreviewResize();
    var hashField = new HashField();

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

        effectRangeControl.initDragControl(uploadOverlay);
        effectControl.initUploadPhotoControls(uploadOverlay);
        previewResize.initControlsResizePhoto(uploadOverlay);
        hashField.initCheckHashField(uploadOverlay);

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
        var hashFieldInput = uploadOverlay.querySelector('.upload-form-hashtags');
        var pinControl = uploadOverlay.querySelector('#effect-range');

        if (pinControl) {
            pinControl.removeEventListener('input', effectRangeControl.onPinControlRange);
        }

        if (hashFieldInput) {
            hashFieldInput.removeEventListener('change', hashField.checkHashField);
        }

        if (effectControls) {
            effectControls.removeEventListener('click', effectControl.onEffectPhotoControlClick);
        }

        if (resizeControls) {
            resizeControls.removeEventListener('click', previewResize.onResizePhotoControlClick);
        }

        if (closeButton) {
            closeButton.removeEventListener('click', _onCloseUploadClick);
        }

        document.removeEventListener('keydown', _onEscCloseUploadKeyDown);
    }

    window.Overlay = Overlay;

})();