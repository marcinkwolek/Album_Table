var albums = [
    {
        id: guid(),
        url: "../img/albums-photo.jpg",
        title: "Album 1",
        description: "To jest album",
        photos: [
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            },
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            },
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            }
        ]

    },
    {
        id: guid(),
        url: "../img/albums-photo.jpg",
        title: "Album 2",
        description: "To jest album",
        photos: [
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            },
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            },
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            }
        ]
    },
    {
        id: guid(),
        url: "../img/albums-photo.jpg",
        title: "Album 3",
        description: "To jest album",
        photos: [
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            },
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            },
            {
                id: guid(),
                url: "../img/albums-photo.jpg",
                title: "Zdjęcie 1",
                description: "To jest zdjęcie 1"
            }
        ]
    }
];

var newAlbum = null;
const _MODAL_TITLE = 'ALBUMY';

$(document).ready(function () {
    $('.albumy').on('click', function () {

        $('.main-board-modal').show();
        $('.modal-title-text').html(_MODAL_TITLE);
        $('.modal-add-text').html('Dodaj album');

        $('body').on('click', '.modal-add-text', function () {
            $('.add-album-input input').not(':input[type=submit]').val('');
            $('.bg-overlay').show();
            $('.add-album-popup').show();
            $('.album-popup').show();
        });

        renderAlbums();
    });

    $('body').on('click', '.album-thumb', function (event) {
        $('.modal-wrapper').empty();

        //var albumId = event.target.
        var albumId = $(event.target).data('id');
        var album;

        for (var i = 0; i < albums.length; i++) {
            if (albumId === albums[i].id) {
                album = albums[i];
            }
        }
        $('.modal-title-text').html(album.title);
        for (var i = 0; i < album.photos.length; i++) {
            $('.modal-wrapper').append(
                "<div class='photo-thumb'><img src='" + album.photos[i].url + "'><span>" + album.photos[i].title + "</span><span>" + album.photos[i].description + "</span></div>"
            )
        }
    });


    $('#add-album').on('submit', function (event) {
        event.preventDefault();

        $('#add-album .validation-error').remove();
        var albumTitle = $(this).find('[name="Title"]').val();
        var albumDescription = $(this).find('[name="Description"]').val();
        var errors = false;

        var validateElements = [
            {
                name: 'Title',
                errorMessage: 'Wprowadź poprawny tytuł',
                validateFunctions: [

                    {
                        fn: isEmpty,
                        errorMessage: 'Nie pusty'
                    },
                    {
                        fn: maxLength,
                        value: 10,
                        errorMessage: 'Nie wincyj nisz 10 ino hyżo'
                    }
                ]

            },
            {
                name: 'Description',
                errorMessage: 'Wprowadź poprawny opis',
                validateFunctions: [
                    {
                        fn: isEmpty,
                        errorMessage: 'Nie pusty'
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

        newAlbum = generateAlbum(albumTitle, albumDescription);
        albums.push(newAlbum);
        renderAlbums();

        $('.album-popup').hide();
        $('.add-photo-popup').show();
    })
});

function renderAlbums() {
    var modalWrapper = $('.modal-wrapper');
    modalWrapper.empty();

    for (var i = 0; i < albums.length; i++) {
        modalWrapper.append(
            "<div class='album-thumb' data-id='" + albums[i].id + "'>" +
                "<img src='" + albums[i].url + "'" +
                "<span>" + albums[i].title + "</span>" +
                "<span>" + albums[i].description + "</span>" +
            "</div>"
        );
    }
}

function generateAlbum(albumTitle, albumDescription) {
    return {
        id: guid(),
        url: null,
        title: albumTitle,
        description: albumDescription,
        photos: []
    };
}