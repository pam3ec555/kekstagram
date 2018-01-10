'use strict';

(function () {

    /**
     * @constructor
     */
    var Data = function () {
        /**
         * Метод, отрисовывющий фотографии
         * @param obj DOM - элемент, на котором будет отображаться картинка
         * @param data {{}} Объект, хранящий данные о картинке
         * @returns {*} Готовый DOM - элемент
         * @private
         */
        function _initPictures (obj, data) {
            if (obj && data) {
                var img = obj.querySelector('img');
                var likes = obj.querySelector('.picture-likes');
                var comment = obj.querySelector('.picture-comments');

                img.setAttribute('src', data.url);
                likes.textContent = data.likes;
                comment.textContent = data['comments'].length;
                obj.setAttribute('tabindex', 0);
            }

            return obj;
        }

        /**
         * Метод, отрисовывающий картинки
         * @param pictures {Array} данные о картинках
         * @private
         */
        function _drawPicturesContent (pictures) {
            var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
            var picturesBlock = document.querySelector('.pictures');

            if (pictureTemplate && pictures.length > 0 && picturesBlock) {
                var fragment = document.createDocumentFragment();

                pictures.forEach(function(item) {
                    var obj = pictureTemplate.cloneNode(true);

                    fragment.appendChild( _initPictures(obj, item));
                }.bind(this));

                picturesBlock.appendChild(fragment);
            }
        }

        /**
         * Метод, срабатывающий при успешном запросе
         * @param data ответ
         * @private
         */
        function _onSuccess (data) {
            var obj = JSON.parse(data.responseText);

             _drawPicturesContent(obj);
            new Gallery();
        }

        /**
         * Метод, срабатывающий при успешной загрузке данных xhr
         * @event e
         * @private
         */
        function _onLoadXhr (e) {
            try {
                 _onSuccess(e.target);
            } catch (error) {
                alert('Не удалось загрузить данные.');
                console.log(error.message);
            }
        }

        /**
         * Метод, отправляющий запрос на получение данных о картинках
         * @private
         */
        function _getData () {
            var xhr = new XMLHttpRequest();

            xhr.open('GET', 'data/data.json');
            xhr.send();

            xhr.addEventListener('load',  _onLoadXhr.bind(this));
        }

         _getData();
    }

    window.Data = Data;

})();