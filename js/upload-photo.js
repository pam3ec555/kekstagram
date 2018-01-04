'use strict';

(function() {

    initUploadPicture();

    /**
     * Метод, инициализирующий обработчики для загрузки фотографии
     */
    function initUploadPicture() {
        var form = document.querySelector('#upload-select-image');

        if (form) {
            var file = form.querySelector('#upload-file');

            if (file) {
                file.addEventListener('change', onUploadPictureChange);
            }
        }
    }

    /**
     * Метод, срабатывающий при добавлении фотографии
     */
    function onUploadPictureChange() {
        var uploadOverlay = document.querySelector('.upload-overlay');

        if (uploadOverlay) {
            showUploadPicture(uploadOverlay);
        }
    }

    /**
     * Метод, инициализирующий обработчики на overlay редактирования фотографии
     * @param uploadOverlay
     */
    function initUploadOverlay(uploadOverlay) {
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

            closeButton.addEventListener('click', onCloseUploadClick);
            document.addEventListener('keydown', onEscCloseUploadKeyDown);

            if (file) {
                file.removeEventListener('change', onUploadPictureChange);
            }
        }
    }

    /**
     * Метод, закрывающий overlay редактирования фотографии по нажатию на Esc
     * @param e {Event}
     */
    function onEscCloseUploadKeyDown(e) {
        if (e.keyCode === 27 && e.target.className !== 'upload-form-description') {
            hideUploadPicture();
        }
    }

    /**
     * Метод, закрывающий overlay редактирования фотографии по клику на крестик
     */
    function onCloseUploadClick() {
        hideUploadPicture();
    }

    /**
     * Метод, показывающий overlay редактирования фотографии
     * @param uploadOverlay
     */
    function showUploadPicture(uploadOverlay) {
        uploadOverlay.classList.remove('hidden');
        initUploadOverlay(uploadOverlay);
    }

    /**
     * Метод, закрывающий overlay редактирования фотографии
     */
    function hideUploadPicture() {
        var uploadOverlay = document.querySelector('.upload-overlay');

        if (uploadOverlay) {
            uploadOverlay.classList.add('hidden');
            removeUploadPictureEvents(uploadOverlay);
            initUploadPicture();
        }
    }

    /**
     * Метод, удаляющий обработчики после закрытия overlay редактирования фотографии
     * @param uploadOverlay
     */
    function removeUploadPictureEvents(uploadOverlay) {
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
            closeButton.removeEventListener('click', onCloseUploadClick);
        }

        document.removeEventListener('keydown', onEscCloseUploadKeyDown);
    }

})();