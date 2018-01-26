var newPhoto = null;

$(document).ready(function () {
    $('.add-album-popup .modal-close').on('click', function () {
        $('.add-photo-popup').hide();
        $('.album-popup').show();
    });


    $('#add-photo').on('submit', function (event) {
        event.preventDefault();

        $('#add-photo .validation-error').remove();
        var photoTitle = $(this).find('[name="photoTitle"]').val();
        var photoDescription = $(this).find('[name="photoDescription"]').val();
        var errors = false;

        var validateElements = [
            {
                name: 'photoTitle',
                errorMessage: 'Wprowadź poprawny tytuł zdjęcia',
                validateFunctions: [

                    {
                        fn: isEmpty,
                        errorMessage: 'Nie pusty'
                    },
                    {
                        fn: maxLength,
                        value: 15,
                        errorMessage: 'Nie wincyj nisz 15 ino hyżo'
                    }
                ]

            },
            {
                name: 'photoDescription',
                errorMessage: 'Wprowadź poprawny opis zdjęcia',
                validateFunctions: [
                    {
                        fn: isEmpty,
                        errorMessage: 'Nie pusty'
                    },
                    {
                        fn: maxLength,
                        value: 255,
                        errorMessage: 'Nie wincyj nisz 255 ino'
                    }
                ]
            },
            {
                name: 'filename',
                errorMessage: 'Dodaj zdjęcie',
                validateFunctions: [
                    {
                        fn: isEmpty,
                        errorMessage: 'Dodaj zdjęcie'
                    }
                ]
            }

        ];


        for (var i = 0; i < validateElements.length; i++) {
            var element = $(this).find('[name=' + validateElements[i].name + ']');
            var val = element.val();

            for (var j = 0; j < validateElements[i].validateFunctions.length; j++) {
                var fnParam = validateElements[i].validateFunctions[j].value ? validateElements[i].validateFunctions[j].value : null;

                if (validateElements[i].validateFunctions[j].fn(val, fnParam) === true) {
                    element.after('<p class="validation-error">' + validateElements[i].validateFunctions[j].errorMessage + '</p>');
                    errors = true;
                }
            }
        }

        if (errors) {
            return;
        }

        newPhoto = generatePhoto(photoTitle, photoDescription);
        newAlbum.photos.push(newPhoto);
        renderPhotos();


    });

    $('#end').on('click', function () {
        $('.add-album-input input').not(':input[type=submit]').val('');
        $('.add-photo-popup').hide();
        $('.bg-overlay').hide();
        $('.add-album-popup').hide();
        $('.photo-add').empty();
    });

    function generatePhoto(photoTitle, photoDescription) {

        var photo = $('.add-album-popup input[name="filename"]').val();

        return {
            id: guid(),
            url: photo,
            title: photoTitle,
            description: photoDescription
        };
    }


    function renderPhotos() {
        var photoAdd = $('.photo-add');
        var shortendDescription;
        photoAdd.empty();


        function generateButton(photo) {
            var shouldCreateButton = false;

            if (photo.description.length > 15) {
                shortendDescription = newAlbum.photos[k].description.substr(0, 14) + '...';
                shouldCreateButton = true;
            }
            var html = '<span class="short">';
            html += shortendDescription ? shortendDescription : photo.description;

            html += '</span>';

            if (shouldCreateButton === true) {
                html += '<div class="show-description" onclick="showFullDescription(this)">show</div>'
            }

            return html;
        }

        for (var k = 0; k < newAlbum.photos.length; k++) {
            shortendDescription = null;


            photoAdd.append('' +
                '<div class="photo-thumb">' +
                '<img src=' + newAlbum.photos[k].url + '>' +
                '<span>' + newAlbum.photos[k].title + '</span>' +
                generateButton(newAlbum.photos[k]) +
                '<span class="long hidden">' + newAlbum.photos[k].description + '</span>' +
                '</div>');
            $('.add-photo-input input').not(':input[type=submit]', ':input[type=button]').val('');
        }
    }

    showFullDescription = function (element) {
        var t = $(element);
        var longText = t.parents('.photo-thumb').find('.long');
        var shortText = t.parents('.photo-thumb').find('.short');

        if (longText.hasClass('hidden')) {
            longText.removeClass('hidden');
            shortText.addClass('hidden');
            $('.show-description').html('hide');
        } else {
            longText.addClass('hidden');
            shortText.removeClass('hidden');
            $('.show-description').html('show');
        }
    }
});




