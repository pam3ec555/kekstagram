(function() {

    drawPicturesContent();
    drawGalleryOverlay();

    function drawGalleryOverlay() {
        var pictures = generatePictures();
        var overlay = document.querySelector('.gallery-overlay');

        if (pictures.length > 0 && overlay) {
            initGalleryOverlay(overlay, pictures[0]);
        }
    }

    function initGalleryOverlay(overlay, data) {
        var preview = overlay.querySelector('.gallery-overlay-image');
        var likes = overlay.querySelector('.likes-count');
        var comments = overlay.querySelector('.comments-count');

        preview.setAttribute('src', data.url);
        likes.textContent = data.likes;
        comments.textContent = data['comments'].length;
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
})();