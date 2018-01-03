(function() {

    drawPicturesContent();
    initEventsOnPictures();
    initUploadPicture();

    /**
     * Метод, инициализирующий события для проверки хэша
     * @param uploadOverlay
     */
    function initCheckHashField(uploadOverlay) {
        var hashField = uploadOverlay.querySelector('.upload-form-hashtags');

        if (hashField) {
            hashField.addEventListener('change', checkHashField);
        }
    }

    /**
     * Метод, проверяющий валидацию поля с вводом хэшей
     * @param e {Event}
     */
    function checkHashField(e) {
        var target = e.target;
        var hashFieldVal = target.value;

        if (hashFieldVal !== '') {
            hashFieldVal = clearSpacesOnString(hashFieldVal);
            var hashFieldVals = hashFieldVal.split(' ');

            if (hashFieldVals.length <= 5) {
                var correct = true;

                hashFieldVals.forEach(function(hash, i) {
                    if (hash.indexOf('#') === 0) {
                        if (hash.length <= 20) {
                            for (var j = i + 1; j < hashFieldVals.length; j++) {
                                if (hash.toLocaleLowerCase() === hashFieldVals[j].toLocaleLowerCase()) {
                                    target.setCustomValidity('Повторяющиеся хеш-теги недопустимы');
                                    correct = false;
                                    break;
                                }
                            }
                            if (i === hashFieldVals.length - 1) {
                                if (correct) {
                                    target.classList.remove('wrong-input');
                                    target.setCustomValidity('');
                                } else {
                                    target.classList.add('wrong-input');
                                }
                            }
                        } else {
                            target.setCustomValidity('Максимальная длина одного хеш-тега = 20');
                            correct = false;
                        }
                    } else {
                        target.setCustomValidity('Все хеш-теги должны начинаться с "#"');
                        correct = false;
                    }
                });
            } else {
                target.setCustomValidity('Превышено кол-во хеш-тегов. Максимальное кол-во = 5');
            }
        }
    }

    /**
     * Метод, инициализирующий события для масштаблирования preview
     * @param uploadOverlay
     */
    function initControlsResizePhoto(uploadOverlay) {
        var controls = uploadOverlay.querySelector('.upload-resize-controls');
        
        if (controls) {
            controls.addEventListener('click', onResizePhotoControlClick);
        }
    }

    /**
     * Метод, клик по кнопкам масштаблирования preview
     * @param e {Event}
     */
    function onResizePhotoControlClick(e) {
        var target = e.target;

        if (target.classList.contains('upload-resize-controls-button')) {
            resizePreview(target);
        }
    }

    /**
     * Метод, изменяющий масштаб preview и значения поля масштабирования.
     * Минимальное значение поля 25%, максимальное 100%
     * @param obj Цель - кнопка увеличения или уменьшения
     */
    function resizePreview(obj) {
        var controlInput = document.querySelector('.upload-resize-controls-value');
        var preview = document.querySelector('.effect-image-preview');

        if (controlInput && preview) {
            var controlVal = parseInt(getIntFromString(controlInput.value));

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

    /**
     * Метод, инициализирующий события по изменению эффектов картинки по контролам
     * @param uploadOverlay
     */
    function initUploadPhotoControls(uploadOverlay) {
        var controls = uploadOverlay.querySelector('.upload-effect-controls');

        if (controls) {
            controls.addEventListener('click', onEffctPhotoControlClick);
        }
    }

    /**
     * Метод, клик по контролам изменения эффекта фотографии
     * @param e {Event}
     */
    function onEffctPhotoControlClick(e) {
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
                }
            }
        }
    }

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

        initUploadPhotoControls(uploadOverlay);
        initControlsResizePhoto(uploadOverlay);
        initCheckHashField(uploadOverlay);

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

        if (hashField) {
            hashField.removeEventListener('change', checkHashField);
        }

        if (effectControls) {
            effectControls.removeEventListener('click', onEffctPhotoControlClick);
        }

        if (resizeControls) {
            resizeControls.removeEventListener('click', onResizePhotoControlClick);
        }

        if (closeButton) {
            closeButton.removeEventListener('click', onCloseUploadClick);
        }

        document.removeEventListener('keydown', onEscCloseUploadKeyDown);
    }

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

    /**
     * Метод, отрисовывающий картинки
     */
    function drawPicturesContent() {
        var pictures = generatePictures();
        var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
        var picturesBlock = document.querySelector('.pictures');

        if (pictureTemplate && pictures.length > 0 && picturesBlock) {
            var fragment = document.createDocumentFragment();

            pictures.forEach(function(item) {
                var obj = pictureTemplate.cloneNode(true);

                fragment.appendChild(initPictures(obj, item));
            });

            picturesBlock.appendChild(fragment);
        }
    }

    /**
     * Метод, отрисовывющий фотографии
     * @param obj DOM - элемент, на котором будет отображаться картинка
     * @param data {{}} Объект, хранящий данные о картинке
     * @returns {*} Готовый DOM - элемент
     */
    function initPictures(obj, data) {
        var img = obj.querySelector('img');
        var likes = obj.querySelector('.picture-likes');
        var comment = obj.querySelector('.picture-comments');

        img.setAttribute('src', data.url);
        likes.textContent = data.likes;
        comment.textContent = data['comments'].length;
        obj.setAttribute('tabindex', 0);

        return obj;
    }

    /**
     * Метод, генерирующий картинки с описанием и комментарием
     * @returns {Array} Массив картинок
     */
    function generatePictures() {
        var result = [];
        var commentList = [
            'Все отлично!',
            'В целом неплохо. Но не все.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из\n' +
            'кадра. В конце концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё\n' +
            'получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на\n' +
            'кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как будто их избивают. Как\n' +
            'можно было поймать такой неудачный момент?!'
        ];

        for (var i = 1; i <= 25; i++) {
            var url = 'photos/' + i + '.jpg';
            var likes = getRandomInt(15, 200);
            var comments = generateComment(commentList);
            var obj = {
                url: url,
                likes: likes,
                comments: comments
            };

            result.push(obj);
        }

        return result;
    }

    /**
     * Метод, генерирующий комментарий
     * @param comments {Array} Массив комментариев
     * @returns {Array} Сгенерированный массив комментариев
     */
    function generateComment(comments) {
        var index = getRandomInt(0, comments.length);
        var secondIndex = getRandomInt(0, comments.length);

        while (secondIndex === index) {
            secondIndex = getRandomInt(0, comments.length);
        }

        return [comments[index], comments[secondIndex]];
    }

    /**
     * Метод, возвращающий случайное число от min до max
     * @param min {Number}
     * @param max {Number}
     * @returns {Number}
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Метод, выводящий цифры из строки
     * @param str {string} Строка
     * @returns {string | void | Number}
     */
    function getIntFromString(str) {
        return str.replace(/\D+/g,'');
    }

    /**
     * Метод, убирающий лишние пробелы
     * @param str {string} Строка, в которой нужно удалить лишние пробелы
     * @returns {string} Строка, без лишних пробелов
     */
    function clearSpacesOnString(str) {
        return str.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ');
    }
})();