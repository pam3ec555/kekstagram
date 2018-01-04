'use strict';

(function () {

    var MAX_RANGE_VALUE = 100;
    
    window.filterDragUploadPreview = {
        filterRange: {},
        controlWidth: 0,
        initDragControl: function (uploadOverlay) {
            var controlPin = uploadOverlay.querySelector('#effect-range');

            if (controlPin) {
                controlPin.addEventListener('input', window.filterDragUploadPreview.onPinControlRange);
            }
        },
        onPinControlRange: function (e) {
            setFilter(e.target);
        },
        setMinMaxEffectSize: function (className) {
            var filterDrag = window.filterDragUploadPreview;
            var pin = document.querySelector('#effect-range');

            pin.value = 30;

            if (className.indexOf('effect-chrome') + 1) {
                filterDrag.filterRange['min'] = 0;
                filterDrag.filterRange['max'] = 1;
                filterDrag.filterRange['unit'] = '';
                filterDrag.filterRange['type'] = 'grayscale';
            } else if (className.indexOf('effect-sepia') + 1) {
                filterDrag.filterRange['min'] = 0;
                filterDrag.filterRange['max'] = 1;
                filterDrag.filterRange['unit'] = '';
                filterDrag.filterRange['type'] = 'sepia';
            } else if (className.indexOf('effect-marvin') + 1) {
                filterDrag.filterRange['min'] = 0;
                filterDrag.filterRange['max'] = 100;
                filterDrag.filterRange['unit'] = '%';
                filterDrag.filterRange['type'] = 'invert';
            } else if (className.indexOf('effect-phobos') + 1) {
                filterDrag.filterRange['min'] = 0;
                filterDrag.filterRange['max'] = 3;
                filterDrag.filterRange['unit'] = 'px';
                filterDrag.filterRange['type'] = 'blur';
            } else if (className.indexOf('effect-heat') + 1) {
                filterDrag.filterRange['min'] = 0;
                filterDrag.filterRange['max'] = 3;
                filterDrag.filterRange['unit'] = '';
                filterDrag.filterRange['type'] = 'brightness';
            } else {
                filterDrag.filterRange = {};
            }

            setFilter(pin);
        }
    };

    function setFilter(pin) {
        var preview = document.querySelector('.effect-image-preview');
        var filterDrag = window.filterDragUploadPreview;

        if (preview && Object.keys(filterDrag.filterRange).length !== 0) {
            var step = filterDrag.filterRange['max'] / MAX_RANGE_VALUE;
            var val = pin.value * step;

            if (pin.disabled) {
                pin.disabled = false;
            }

            preview.style.filter = filterDrag.filterRange['type'] + '(' + val + filterDrag.filterRange['unit'] + ')';
        } else if (Object.keys(filterDrag.filterRange).length === 0) {
            preview.style.filter = '';
            if (!pin.disabled) {
                pin.disabled = true;
            }
        }
    }
    
})();