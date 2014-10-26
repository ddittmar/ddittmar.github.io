"use strict";

var USER_ID  = '36825657@N03';
var API_KEY  = '5829e1bcf08076b3ad92b34958fe8c3b';
var BASE_URL = 'https://api.flickr.com/services/rest/';

/** stores the load function of the actual gallery */
var galleryFunction;

if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

function FlickrApiException(code, message) {
	this.code = code;
	this.message = message;
}

function callFlickr(method, jsoncallback, params) {
	var url = String.format(
        '{0}?method={1}&api_key={2}&user_id={3}&format=json&jsoncallback={4}',
        BASE_URL, method, API_KEY, USER_ID, jsoncallback
    );
	if (params) {
		_.each(params, function (value, key) {
			url += '&' + key + '=' + value;
		});
	}
	$.getScript(url);
}

function checkFlickrError(data) {
	if (data.stat !== 'ok') {
		alert(String.format('FlickrApiException {0}: {1}', data.code, data.message));
		throw new FlickrApiException(data.code, data.message);
	}
}

function chunk(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

function buildFlickrPicUrl(pic, size) {
    return String.format(
        'https://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg',
        pic.farm, pic.server, pic.id, pic.secret, size
    );
}

function drawPictures(pictures) {
    var chunks = chunk(pictures, 6);
	var $gallery = $('#gallery').empty();
	_.each(chunks, function (chunk) {
        var $row = $('<div>').addClass('row');
        _.each(chunk, function (pic, idx) {
            var url_thumb = buildFlickrPicUrl(pic, 'q');
            var url_image = buildFlickrPicUrl(pic, 'b');
            var $a = $('<a>')
                .addClass('galleryImage')
                .attr('href', url_image)
                .attr('title', pic.title)
                .attr('id', 'picid_' + pic.id)
                .attr('data-gallery', '');
            var $img = $('<img>')
                .attr('src', url_thumb)
                .addClass('center-block')
                .addClass('img-responsive')
                .addClass('img-rounded')
                .attr('height', 150)
                .attr('width', 150)
                .attr('style', 'margin-bottom: 22px;');
            $a.append($img);
            var $col = $('<div>')
                .addClass('col-lg-2')
                .addClass('col-md-2')
                .addClass('col-sm-4')
                .addClass('col-xs-4');
            $col.append($a);
            $row.append($col);
        });
        $gallery.append($row);
	});
}

function drawGallery(data) {
	checkFlickrError(data);
    drawPictures(data.photos.photo);
}

function prevGalleryPage() {
    var page = $('#pager').data('page') - 1;
    ga('send', 'event', 'page', 'click', 'prev', page);
    galleryFunction(page);
}

function nextGalleryPage() {
    var page = $('#pager').data('page') + 1;
    ga('send', 'event', 'page', 'click', 'next', page); 
    galleryFunction(page);
}

function drawPaging(page, pages) {
    var $pager = $('#pager');
    if (page == 1) {
        $pager.find('.previous').addClass('disabled');
    } else {
        $pager.find('.previous').removeClass('disabled');
    }
    if (page == pages) {
        $pager.find('.next').addClass('disabled');
    } else {
        $pager.find('.next').removeClass('disabled');
    }
    $pager.data('page', parseInt(page));
}

function drawGalleryWithPaging(data) {
    drawGallery(data);
    drawPaging(data.photos.page, data.photos.pages);
}

function drawAlbumWithPaging(data) {
    checkFlickrError(data);
    drawPictures(data.photoset.photo);
    drawPaging(data.photoset.page, data.photoset.pages);
}

function drawPhotosets(data) {
    checkFlickrError(data);
    var $albums = $('ul#albums');
    _.each(data.photosets.photoset, function(photoset) {
        var $a = $('<a>')
            .addClass('loadAlbumGallery')
            .attr('title', photoset.title._content) 
            .attr('href', encodeURIComponent(photoset.title._content))
            .data('photoset_id', photoset.id)
            .text(photoset.title._content);
        var $li = $('<li>').append($a);
        $albums.append($li);
    });
}

function onLoadGallery() {
    callFlickr('flickr.photosets.getList', 'drawPhotosets', {});
    loadLatestUploadsGallery(1);
}

function loadInterestingnessGallery(page) {
    galleryFunction = loadInterestingnessGallery;
    callFlickr('flickr.photos.search', 'drawGalleryWithPaging', {
        page: page,
		per_page: 24,
		content_type: 1,
        sort: 'interestingness-desc',
        user_id: USER_ID
	});
}

function loadLatestUploadsGallery(page) {
    galleryFunction = loadLatestUploadsGallery;
    callFlickr('flickr.people.getPhotos', 'drawGalleryWithPaging', {
        page: page,
		per_page: 24,
		content_type: 1
	});
}

function loadAlbumGallery(photoset_id, page) {
    galleryFunction = _.partial(loadAlbumGallery, photoset_id);
    callFlickr('flickr.photosets.getPhotos', 'drawAlbumWithPaging', {
        photoset_id: photoset_id,
        page: page,
        per_page: 24
    });
}

function loadLandingPageGallery() {
	callFlickr('flickr.people.getPhotos', 'drawGallery', {
		per_page: 24,
		content_type: 1
	});
}

function switchActiveGallery($this) {
    $this.parents('ul').find('li').removeClass('active');
    $this.parent('li').addClass('active');
}

$(document).on('click', 'a#loadLatestUploadsGallery', function (e) {
    e.preventDefault();
    switchActiveGallery($(this));
    ga('send', 'event', 'loadLatestUploadsGallery', 'click');
    loadLatestUploadsGallery(1);
});

$(document).on('click', 'a#loadInterestingnessGallery', function (e) {
    e.preventDefault();
    switchActiveGallery($(this));
    ga('send', 'event', 'loadInterestingnessGallery', 'click');
    loadInterestingnessGallery(1);
});

$(document).on('click', 'a.loadAlbumGallery', function(e) {
    e.preventDefault();
    switchActiveGallery($(this));
    var photoset_id = $(this).data('photoset_id');
    ga('send', 'event', 'loadAlbumGallery', 'click', ('photosetid_' + photoset_id));
    loadAlbumGallery(photoset_id, 1);
});

$(document).on('click', 'a#prevGalleryPage', function(e) {
    e.preventDefault();
    prevGalleryPage();
});

$(document).on('click', 'a#nextGalleryPage', function(e) {
    e.preventDefault();
    if (!$(this).parent('li').hasClass('disabled')) {
        nextGalleryPage();
    }
});

$(document).on('click', 'a.galleryImage', function(e) {
    ga('send', 'event', 'galleryImage', 'click', ('' + $(this).attr('id'))); 
});

$(document).on('click', '.social > a', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    ga('send', 'event', 'social', 'click', url, {
        'hitCallback' : function () {
            document.location = url;
        }
    });
});
