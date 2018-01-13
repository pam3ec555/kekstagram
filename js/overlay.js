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

        _setPreviewImage(uploadOverlay);
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

    function _setPreviewImage(uploadOverlay) {
        var FILE_TYPES = ['.png', '.jpg', '.jpeg', '.gif'];
        var preview = uploadOverlay.querySelector('.effect-image-preview');
        var fileField = document.querySelector('#upload-file');
        var previewWrap = uploadOverlay.querySelector('.upload-form-preview');

        if (fileField && preview && previewWrap) {
            var file = fileField.files[0];

            preview.classList.add('hidden');
            previewWrap.classList.add('preview-preloader');

            if (file) {
                var fileName = file.name.toLowerCase();
                var isImage = FILE_TYPES.some(function (value) {
                    return fileName.endsWith(value);
                });

                if (isImage) {
                    var reader = new FileReader();

                    console.log(reader);

                    reader.addEventListener('load', function () {
                        preview.src = reader.result;
                        preview.classList.remove('hidden');
                        previewWrap.classList.remove('preview-preloader');
                    });

                    reader.addEventListener('error', function () {
                        previewWrap.classList.add('preview-preloader--error');
                    });

                    reader.readAsDataURL(file);
                } else {
                    previewWrap.classList.add('preview-preloader--error');
                }
            } else {
                previewWrap.classList.add('preview-preloader--error');
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

        hashField.deInitCheckHashField(uploadOverlay);
        effectControl.deInitUploadPhotoControls(uploadOverlay);
        previewResize.deInitControlResizePhoto(uploadOverlay);

        if (closeButton) {
            closeButton.removeEventListener('click', _onCloseUploadClick);
        }

        document.removeEventListener('keydown', _onEscCloseUploadKeyDown);
    }

    window.Overlay = Overlay;

})();