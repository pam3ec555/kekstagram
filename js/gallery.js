'use strict';

(function() {
    /**
     * @constructor
     */
    var Gallery = function () {
        _initEventsOnPictures();
    };

    var util = new Util();

    /**
     * Overlay галлереи
     * @type {Element | null}
     */
    var gallery = document.querySelector('.gallery-overlay');

    /**
     * Обертка для картинок
     * @type {Element | null}
     */
    var picturesWrap = document.querySelector('.pictures');

    /**
     * Кнопка закрытия галлереи
     * @type {(ElementTagNameMap[string] | null) | (Element | null)}
     */
    var closeButton = gallery.querySelector('.gallery-overlay-close');

    /**
     * Метод, передающий данные о картинке в галлерею
     * @param data
     * @private
     */
    function _initGalleryOverlay (data) {
        if (gallery && data) {
            var preview = gallery.querySelector('.gallery-overlay-image');
            var likes = gallery.querySelector('.likes-count');
            var comments = gallery.querySelector('.comments-count');

            if (preview && likes && comments) {
                preview.setAttribute('src', data.url);
                likes.textContent = data.likes;
                comments.textContent = data.comments;
            }
        }
    }

    /**
     * Метод, удаляющий обработчики на галлереи при закрытии
     * @private
     */
    function _removeEventsFromGallery () {
        document.removeEventListener('keydown', _onEscCloseGallery);

        if (closeButton) {
            closeButton.removeEventListener('click', _onButtonCloseGalleryClick);
        }
    }

    /**
     * Метод, закрывающий галлерею
     * @private
     */
    function _hideGallery () {
        if (gallery) {
            gallery.classList.add('hidden');
            _removeEventsFromGallery();
            _initEventsOnPictures();
        }
    }

    /**
     * Метод, закрытие галлереи по клику на крестик
     * @private
     */
    function _onButtonCloseGalleryClick () {
        _hideGallery();
    }

    /**
     * Метод, закрытие галлереи по Esc
     * @event e
     * @private
     */
    function _onEscCloseGallery (e) {
        if (e.keyCode === util.keyCode.ESC) {
            _hideGallery();
        }
    }

    /**
     * Метод, добавляющий обработчики для галлереи
     * @private
     */
    function _initEventsOnGallery () {
        if (closeButton) {
            closeButton.addEventListener('click', _onButtonCloseGalleryClick);
            document.addEventListener('keydown', _onEscCloseGallery);

            if (picturesWrap) {
                picturesWrap.removeEventListener('click', _onPicturesClick);
                picturesWrap.removeEventListener('keydown', _onPictureFocus);
            }
        }
    }

    /**
     * Метод, показывающий галлерею
     */
    function _showGallery () {
        if (gallery) {
            gallery.classList.remove('hidden');
            _initEventsOnGallery();
        }
    }

    /**
     * Метод, открыввающий картинку с нужными данными
     * @param target цель - выбранная картинка
     */
    function _openPicture (target) {
        var obj = null;

        if (target.nodeName === 'IMG' && target.parentNode.className === 'picture') {
            obj = target.parentNode;
        } else if (target.nodeName === 'A' && target.className === 'picture') {
            obj = target;
        }

        if (obj !== null && obj.className === 'picture') {
            var image = obj.querySelector('img');
            var imageUrl = image.getAttribute('src');
            var likes = obj.querySelector('.picture-likes').textContent;
            var comments = obj.querySelector('.picture-comments').textContent;
            var  data = {
                url: imageUrl,
                likes: likes,
                comments: comments
            };

            _initGalleryOverlay(data);
            _showGallery();
        }
    }

    /**
     * Метод, клика по картинке
     * @event e
     * @private
     */
    function _onPicturesClick (e) {
        e.preventDefault();

        var target = e.target;

        _openPicture(target);
    }

    /**
     * Метод, фокуса и нажатию Enter по картинке
     * @event e
     * @private
     */
    function _onPictureFocus (e) {
        if (e.keyCode === util.keyCode.ENTER) {
            e.preventDefault();

            var focusTarget = e.target;

            _openPicture(focusTarget);
        }
    }

    /**
     * Метод, добавляющий обработчики на картинки
     * @private
     */
    function _initEventsOnPictures () {
        picturesWrap = document.querySelector('.pictures');

        if (picturesWrap) {
            picturesWrap.addEventListener('click', _onPicturesClick);
            picturesWrap.addEventListener('keydown', _onPictureFocus);
        }
    }

    window.Gallery = Gallery;

})();