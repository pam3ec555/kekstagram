'use strict';

(function() {

    /**
     * @constructor
     */
    var Gallery = function () {
        var util = new Util();

        /**
         * Overlay галлереи
         * @type {Element | null}
         */
        this.gallery = document.querySelector('.gallery-overlay');

        /**
         * Обертка для картинок
         * @type {Element | null}
         */
        this.picturesWrap = document.querySelector('.pictures');

        /**
         * Кнопка закрытия галлереи
         * @type {(ElementTagNameMap[string] | null) | (Element | null)}
         */
        this.closeButton = this.gallery.querySelector('.gallery-overlay-close');

        /**
         * Метод, передающий данные о картинке в галлерею
         * @param data
         * @private
         */
        this._initGalleryOverlay = function (data) {
            if (this.gallery && data) {
                var preview = this.gallery.querySelector('.gallery-overlay-image');
                var likes = this.gallery.querySelector('.likes-count');
                var comments = this.gallery.querySelector('.comments-count');

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
        this._removeEventsFromGallery = function () {
            document.removeEventListener('keydown', this._onEscCloseGallery.bind(this));

            if (this.closeButton) {
                this.closeButton.removeEventListener('click', this._onButtonCloseGalleryClick.bind(this));
            }
        }

        /**
         * Метод, закрывающий галлерею
         * @private
         */
        this._hideGallery = function () {
            if (this.gallery) {
                this.gallery.classList.add('hidden');
                this._removeEventsFromGallery();
                this._initEventsOnPictures();
            }
        }

        /**
         * Метод, закрытие галлереи по клику на крестик
         * @private
         */
        this._onButtonCloseGalleryClick = function () {
            this._hideGallery();
        }

        /**
         * Метод, закрытие галлереи по Esc
         * @event e
         * @private
         */
        this._onEscCloseGallery = function (e) {
            if (e.keyCode === util.keyCode.esc) {
                this._hideGallery();
            }
        }

        /**
         * Метод, добавляющий обработчики для галлереи
         * @private
         */
        this._initEventsOnGallery = function () {
            if (this.closeButton) {
                this.closeButton.addEventListener('click', this._onButtonCloseGalleryClick.bind(this));

                if (this.picturesWrap) {
                    this.picturesWrap.removeEventListener('click', this._onPicturesClick.bind(this));
                    this.picturesWrap.removeEventListener('keydown', this._onPictureFocus.bind(this));
                    document.addEventListener('keydown', this._onEscCloseGallery.bind(this));
                }
            }
        }

        /**
         * Метод, показывающий галлерею
         */
        this._showGallery = function () {
            if (this.gallery) {
                this.gallery.classList.remove('hidden');
                this._initEventsOnGallery();
            }
        }

        /**
         * Метод, открыввающий картинку с нужными данными
         * @param target цель - выбранная картинка
         */
        this._openPicture = function (target) {
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

                this._initGalleryOverlay(data);
                this._showGallery();
            }
        }

        /**
         * Метод, клика по картинке
         * @event e
         * @private
         */
        this._onPicturesClick = function (e) {
            e.preventDefault();

            var target = e.target;

            this._openPicture(target);
        }

        /**
         * Метод, фокуса и нажатию Enter по картинке
         * @event e
         * @private
         */
        this._onPictureFocus = function (e) {
            if (e.keyCode === util.keyCode.enter) {
                e.preventDefault();

                var focusTarget = e.target;

                this._openPicture(focusTarget);
            }
        }

        /**
         * Метод, добавляющий обработчики на картинки
         * @private
         */
        this._initEventsOnPictures = function () {
            this.picturesWrap = document.querySelector('.pictures');

            if (this.picturesWrap) {
                this.picturesWrap.addEventListener('click', this._onPicturesClick.bind());
                this.picturesWrap.addEventListener('keydown', this._onPictureFocus.bind(this));
            }
        }

        this._initEventsOnPictures();
    }

    window.Gallery = Gallery;

})();