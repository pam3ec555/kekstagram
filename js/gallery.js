'use strict';

(function() {

    initEventsOnPictures();

    /**
     * Метод, добавляющий обработчики на галлерею
     */
    function initEventsOnPictures() {
        var picturesWrap = document.querySelector('.pictures');

        if (picturesWrap) {
            picturesWrap.addEventListener('click', onPicturesClick);
            picturesWrap.addEventListener('keydown', onFocusPicture);
        }
    }

    /**
     * Метод, клика по картинке
     * @param e {Event}
     */
    function onPicturesClick(e) {
        e.preventDefault();

        var target = e.target;

        openPicture(target);
    }

    /**
     * Метод, фокуса и нажатию Enter по картинке
     * @param e {Event}
     */
    function onFocusPicture(e) {
        if (e.keyCode === 13) {
            e.preventDefault();

            var focusTarget = e.target;

            openPicture(focusTarget);
        }
    }

    /**
     * Метод, открыввающий картинку с нужными данными
     * @param target Цель - выбранная картинка
     */
    function openPicture(target) {
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

            initGalleryOverlay(data);
            showGallery();
        }
    }

    /**
     * Метод, показывающий галлерею
     */
    function showGallery() {
        var gallery = document.querySelector('.gallery-overlay');

        if (gallery) {
            gallery.classList.remove('hidden');
            initEventsOnGallery(gallery);
        }
    }

    /**
     * Метод, добавляющий обработчики для галлереи
     * @param gallery
     */
    function initEventsOnGallery(gallery) {
        var closeButton = gallery.querySelector('.gallery-overlay-close');

        console.log(closeButton);

        if (closeButton) {
            var picturesWrap = document.querySelector('.pictures');

            closeButton.addEventListener('click', onButtonCloseGalleryClick);

            if (picturesWrap) {
                picturesWrap.removeEventListener('click', onPicturesClick);
                picturesWrap.removeEventListener('keydown', onFocusPicture);
                document.addEventListener('keydown', onEscCloseGallery);
            }
        }
    }

    /**
     * Метод, закрытие галлереи по Esc
     * @param e {Event}
     */
    function onEscCloseGallery(e) {
        if (e.keyCode === 27) {
            hideGallery();
        }
    }

    /**
     * Метод, закрытие галлереи по клику на крестик
     */
    function onButtonCloseGalleryClick() {
        hideGallery();
    }

    /**
     * Метод, закрывающий галлерею
     */
    function hideGallery() {
        var gallery = document.querySelector('.gallery-overlay');

        if (gallery) {
            gallery.classList.add('hidden');
            removeEventsFromGallery(gallery);
            initEventsOnPictures();
        }
    }

    /**
     * Метод, удаляющий обработчики на галлереи при закрытии
     * @param gallery
     */
    function removeEventsFromGallery(gallery) {
        var closeButton = gallery.querySelector('.gallery-overlay-close');

        document.removeEventListener('keydown', onEscCloseGallery);

        if (closeButton) {
            closeButton.removeEventListener('click', onButtonCloseGalleryClick);
        }
    }

    /**
     * Метод, передающий данные о картинке в галлерею
     * @param data
     */
    function initGalleryOverlay(data) {
        var overlay = document.querySelector('.gallery-overlay');

        if (overlay && data) {
            var preview = overlay.querySelector('.gallery-overlay-image');
            var likes = overlay.querySelector('.likes-count');
            var comments = overlay.querySelector('.comments-count');

            if (preview && likes && comments) {
                preview.setAttribute('src', data.url);
                likes.textContent = data.likes;
                comments.textContent = data.comments;
            }
        }
    }

})();