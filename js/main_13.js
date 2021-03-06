/*jslint nomen: true, vars: true */
/*global ga */
/*global jQuery */

// JavaScript Extensions
(function () {
    "use strict";

    var slice = Array.prototype.slice;

    // add a format function to String
    String.format = function (format) {
        var args = slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };

    // add a rot13 function to String
    String.prototype.rot13 = function () {
        return this.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    };

    // add a curry function to Function
    Function.prototype.curry = function () {
        var fn = this;
        var boundArgs = slice.call(arguments);
        return function () {
            var fnArgs = boundArgs.concat(slice.call(arguments));
            return fn.apply(this, fnArgs);
        };
    };

    // add a chunk funtion to Array
    Array.prototype.chunk = function (len) {
        var chunks = [], i = 0, n = this.length;
        while (i < n) {
            chunks.push(this.slice(i, i += len));
        }
        return chunks;
    };

}());

// jQuery Extensions
(function ($) {
    "use strict";

    jQuery.cachedScript = function (url, options) {

        // Allow user to set any option except for dataType, cache, and url
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return jQuery.ajax(options);
    };
    /* Usage:
        $.cachedScript("ajax/test.js").done(function (script, textStatus) {
            console.log(textStatus);
        });
    */

}(jQuery));

// the Application
var App = (function ($) {
    "use strict";

    var GOOGL_API_KEY = 'AIzaSyCnShRHKnpRuViY9tfYPHEzeGxycwN__8Y';
    var GOOGL_URL     = 'https://www.googleapis.com/urlshortener/v1/url';

    var USER_ID       = '36825657@N03';
    var API_KEY       = '5829e1bcf08076b3ad92b34958fe8c3b';
    var BASE_URL      = 'https://api.flickr.com/services/rest/';

    /** stores the load function of the actual gallery */
    var galleryFunction;

    function FlickrApiException(code, message) {
        this.code = code;
        this.message = message;
    }

    function callFlickr(method, jsoncallback, params) {
        var url = String.format(
            '{0}?method={1}&api_key={2}&user_id={3}&format=json&jsoncallback=App.{4}',
            BASE_URL,
            method,
            API_KEY,
            USER_ID,
            jsoncallback
        );
        if (params) {
            $.each(params, function (key, value) {
                url += '&' + key + '=' + value;
            });
        }
        $.cachedScript(url);
    }

    function checkFlickrError(data) {
        if (data.stat !== 'ok') {
            window.alert(String.format('FlickrApiException {0}: {1}', data.code, data.message));
            throw new FlickrApiException(data.code, data.message);
        }
    }

    function buildFlickrPicUrl(pic, size) {
        return String.format(
            'https://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg',
            pic.farm,
            pic.server,
            pic.id,
            pic.secret,
            size
        );
    }

    function drawPictures(pictures) {
        var chunks = pictures.chunk(6);
        var frag = document.createDocumentFragment();
        $.each(chunks, function (_, chunk) {
            var $row = $('<div>').addClass('row');
            $.each(chunk, function (_, pic) {
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
            frag.appendChild($row[0]);
        });
        var $gallery = $('#gallery').empty();
        $gallery[0].appendChild(frag);
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
        if (page === 1) {
            $pager.find('.previous').addClass('disabled');
        } else {
            $pager.find('.previous').removeClass('disabled');
        }
        if (page === pages) {
            $pager.find('.next').addClass('disabled');
        } else {
            $pager.find('.next').removeClass('disabled');
        }
        $pager.data('page', parseInt(page, 10));
    }

    function drawGalleryWithPaging(data) {
        drawGallery(data);
        drawPaging(parseInt(data.photos.page, 10), parseInt(data.photos.pages, 10));
    }

    function drawAlbumWithPaging(data) {
        checkFlickrError(data);
        drawPictures(data.photoset.photo);
        drawPaging(parseInt(data.photoset.page, 10), parseInt(data.photoset.pages, 10));
    }

    function drawPhotosets(data) {
        checkFlickrError(data);
        var frag = document.createDocumentFragment();
        $.each(data.photosets.photoset, function (_, photoset) {
            var $a = $('<a>')
                .addClass('loadAlbumGallery')
                .attr('title', photoset.title._content)
                .attr('href', '#' + encodeURIComponent(photoset.title._content))
                .data('photoset_id', photoset.id)
                .text(photoset.title._content);
            var $li = $('<li>').append($a);
            frag.appendChild($li[0]);
        });
        $('ul#albums')[0].appendChild(frag);
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

    function onLoadGallery() {
        callFlickr('flickr.photosets.getList', 'drawPhotosets', {});
        loadLatestUploadsGallery(1);
    }

    function loadAlbumGallery(photoset_id, page) {
        galleryFunction = loadAlbumGallery.curry(photoset_id);
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

    $(document).on('click', 'a.loadAlbumGallery', function (e) {
        e.preventDefault();
        switchActiveGallery($(this));
        var photoset_id = $(this).data('photoset_id');
        ga('send', 'event', 'loadAlbumGallery', 'click', ('photosetid_' + photoset_id));
        loadAlbumGallery(photoset_id, 1);
    });

    $(document).on('click', 'a#prevGalleryPage', function (e) {
        e.preventDefault();
        prevGalleryPage();
    });

    $(document).on('click', 'a#nextGalleryPage', function (e) {
        e.preventDefault();
        if (!$(this).parent('li').hasClass('disabled')) {
            nextGalleryPage();
        }
    });

    $(document).on('click', 'a.galleryImage', function (e) {
        ga('send', 'event', 'galleryImage', 'click', ($(this).attr('id')));
    });

    $(document).on('click', '.social > a', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        ga('send', 'event', 'social', 'click', url, {
            'hitCallback' : function () {
                document.location = url;
            }
        });
    });

    $(document).on('click', 'a.btn-twitter', function (e) {
        e.preventDefault();
        var $this = $(this);
        var longUrl = $this.data('url');
        ga('send', 'social', 'twitter', 'share', longUrl, {
            'hitCallback' : function () {
                var gurl = String.format('{0}?key={1}', GOOGL_URL, GOOGL_API_KEY);
                $.ajax({
                    url: gurl,
                    type: 'POST',
                    data: JSON.stringify({ 'longUrl' : longUrl }),
                    processData: false,
                    contentType: "application/json",
                    dataType: 'json',
                    success: function (data) {
                        var shortUrl = data.id;
                        var location = String.format(
                            '{0}?url={1}&via={2}&hashtags={3}&text={4}',
                            $this.attr('href'),
                            encodeURIComponent(shortUrl),
                            $this.data('via'),
                            $this.data('hashtags'),
                            $this.data('text')
                        );
                        document.location = location;
                    }
                });
            }
        });
    });

    var clickBtnGooglePlus = function (self) {
        var $this = $(self);
        ga('send', 'social', 'google-plus', 'share', $this.data('url'));
        var location = String.format('{0}?url={1}', $this.attr('href'), encodeURIComponent($this.data('url')));
        window.open(location, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    };

    $(document).on('click', 'a.btn-facebook', function (e) {
        e.preventDefault();
        var $this = $(this);
        var url = $this.data('href');
        ga('send', 'social', 'facebook', 'share', url, {
            'hitCallback' : function () {
                var href = $this.attr('href');
                var location = String.format(
                    '{0}?app_id={1}&display={2}&href={3}&redirect_uri={4}',
                    href,
                    $this.data('app_id'),
                    $this.data('display'),
                    encodeURIComponent(url),
                    encodeURIComponent($this.data('redirect_uri'))
                );
                document.location = location;
            }
        });
    });

    return {
        loadLandingPageGallery: loadLandingPageGallery,
        drawGallery: drawGallery,
        onLoadGallery: onLoadGallery,
        drawPhotosets: drawPhotosets,
        drawGalleryWithPaging: drawGalleryWithPaging,
        drawAlbumWithPaging: drawAlbumWithPaging,
        clickBtnGooglePlus: clickBtnGooglePlus
    };

}(jQuery));

// Einholen der Zustimmung für Cookies
(function ($) {

    var cookie_name = 'cookie-hint-shown'

    function cookieExists() {
        return (document.cookie.indexOf(cookie_name + '=true') > -1);
    }

    function setCookie() {
        document.cookie = cookie_name + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
    }

    $(document).ready(function() {
        if (!cookieExists()) {
            var $modalDlg = $('#cookie_choice');
            $('#btn-cookie_choice-details').on('click', function(e) {
                e.preventDefault();
                $modalDlg.modal('hide');
                setCookie();
                window.location.href = '/datenschutz/';
            });
            $('#btn-cookie_choice-ok').on('click', function(e) {
                e.preventDefault();
                $modalDlg.modal('hide');
                setCookie();
            });
            setTimeout(function() {
                $modalDlg.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }, 1000);
        }
    });

}(jQuery));
