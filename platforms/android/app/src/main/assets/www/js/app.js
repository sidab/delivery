var $$ = Dom7;

var app = new Framework7({
    root: '#app',
    name: 'Zaytoon',
    theme: 'ios',
    version: 5.2,
    routes: routes,
    init: false,
    user: localStorage.user ? localStorage.user : false,
    config: localStorage.config ? JSON.parse(localStorage.config) : null,
    dialog: {
        buttonOk: 'Ок',
        buttonCancel: 'Отмена'
    },
    touch: {
        mdTouchRipple: false,
        tapHold: false,
        disableContextMenu: true,
        activeState: true,
        fastClicks: true
    },
    toast: {
        closeTimeout: 4000
    },
    smartSelect: {
        pageBackLinkText: 'Назад',
        popupCloseLinkText: 'Готово',
        sheetCloseLinkText: 'Выбрать'
    },
    picker: {
        toolbarCloseText: 'Выбрать'
    },
    view: {
        animate: false,
        iosDynamicNavbar: false,
        //mdPageLoadDelay: 100,
        stackPages: true,
        keepalive: true,
        preloadPreviousPage: true,
        removeElements: false,
        unloadTabContent: false,
        iosSwipeBack: true,
        mdSwipeBack: true,
        iosSwipeBackAnimateShadow: false,
        iosSwipeBackAnimateOpacity: false,
        mdSwipeBackAnimateShadow: false,
        mdSwipeBackAnimateOpacity: false
    },
    photoBrowser: {
        backLinkText: 'Закрыть',
        navbarOfText: 'из',
        popupCloseLinkText: 'Закрыть',
        swiper: {
            lazy: {
                enabled: false
            }
        }
    },
    lazy: {
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        threshold: 1000,
        sequential: false
    },
    statusbar: {
        enabled: false,
        iosOverlaysWebView: false,
        androidOverlaysWebView: false
    },
    sheetModal: {
        closeByOutsideClick: true,
        swipeToClose: true,
        sheetCloseLinkText: 'Выбрать',
        backdrop: true
    },
    navbar: {
        collapseLargeTitleOnScroll: true,
        snapPageScrollToLargeTitle: false,
        snapPageScrollToTransparentNavbar: false
    },
    methods: {
        checkVersion: function (callback) {

            let config;

            if (localStorage.config !== undefined) {

                config = true;

                callback();

            } else {

                config = false;

            }

            app.request({
                url: 'https://zaytoon.ru/api/config',
                dataType: 'json',
                //async: false,
                success: function (response) {

                    var config = response;

                    app.params.config = config;

                    localStorage.config = JSON.stringify(config);

                    let InAppBrowserParams = 'toolbarposition=top,closebuttoncolor=#FF8C00,closebuttoncaption=Закрыть,navigationbuttoncolor=#FF8C00,toolbarcolor=#eeeeee,hideurlbar=yes,fullscreen=no';

                    var version;

                    if (app.device.android) {

                        version = config.vers.android;

                    } else if (app.device.ios) {

                        version = config.vers.ios;

                    } else {

                        version = config.version;

                    }

                    let sheet = app.sheet.create({
                        content: `

                            <div class="sheet-modal sheet-update">
                            
                                <div class="sheet-modal-inner">
                                
                                    <div class="block-title block-title-medium">Вышла новая версия</div>
                                    
                                    <div class="margin">Мы выпустили новую версию приложения в которой исправили ошибки и повысили производительность. Настоятельно рекомендуем вам обновить приложение.</div>
                                
                                    <div class="margin">
                                    
                                        <button class="button button-fill button-large">Обновить</button>
                                    
                                    </div>
                                
                                </div>
                            
                            </div>

                        `,
                        backdrop: true,
                        closeByBackdropClick: true,
                        closeByOutsideClick: true,
                        swipeToClose: true,
                        on: {
                            opened: function (sheet) {

                                sheet.$el.find('.button').on('click', function () {

                                    sheet.close();

                                    if (app.device.ios) {

                                        cordova.InAppBrowser.open(config.updateLink.ios, '_system', InAppBrowserParams);

                                    } else {

                                        cordova.InAppBrowser.open(config.updateLink.android, '_system', InAppBrowserParams);

                                    }

                                });

                            }
                        }
                    });

                    if (version > app.version) {

                        setTimeout(function () {

                            sheet.open();

                        }, 2000);

                    }

                },
                complete: function () {

                    if (!config) {

                        callback();

                    }

                }
            });

        },
        backButton: function (closeApp = true) {

            if (closeApp) {

                if (app.views.current.router.url === '/main' || app.views.current.router.url === '/cart' || app.views.current.router.url === '/favorites' || app.views.current.router.url === '/profile') {

                    app.dialog.confirm('Вы уверены что хотите закрыть приложение?', function () {

                        navigator.app.exitApp();

                    });

                    return false;

                } else if (app.views.current.router.url === '/catalog/categories') {

                    $$('.views').find('.tab-active').find('.page-current').find('.navbar').find('.left').find('a').click();

                    return false;

                } else if (app.views.current.router.url === '/profile/chat') {

                    $$('.views').find('.tab-active').find('.page-current').find('.navbar').find('.left').find('a').click();

                    return false;

                }

            }

            if ($$('.popover.modal-in').length > 0) {

                var popover;

                if ($$('.popover.modal-in').length > 1) {

                    popover = app.popover.get($$('.popover.modal-in:last-child'));

                } else {

                    popover = app.popover.get($$('.popover.modal-in'));

                }

                popover.close();

                return false;

            }

            if ($$('.dialog.modal-in').length > 0) {

                var dialog;

                if ($$('.dialog.modal-in').length > 1) {

                    dialog = app.dialog.get($$('.dialog.modal-in:last-child'));

                } else {

                    dialog = app.dialog.get($$('.dialog.modal-in'));

                }

                dialog.close();

                return false;

            }

            if ($$('.popup.modal-in').length > 0) {

                var popup;

                if ($$('.popup.modal-in').length > 1) {

                    popup = app.popup.get($$('.popup.modal-in:last-child'));

                } else {

                    popup = app.popup.get($$('.popup.modal-in'));

                }

                popup.close();

                return false;

            }

            if ($$('.sheet-modal.modal-in').length > 0) {

                var popup;

                if ($$('.sheet-modal.modal-in').length > 1) {

                    sheet = app.sheet.get($$('.sheet-modal.modal-in:last-child'));

                } else {

                    sheet = app.sheet.get($$('.sheet-modal.modal-in'));

                }

                sheet.close();

                return false;

            }


            $$('.custom-back').click();

            app.views.current.router.back();

        },
        onesignal: function () {

            try {

                window.plugins.OneSignal.startInit('eb5660e9-6428-452b-81b6-1181972e53a2').endInit();

                window.plugins.OneSignal.getIds(function(ids) {

                    let deviceId = ids.userId;

                    console.log(deviceId);

                    localStorage.deviceId = deviceId;

                });

            } catch (error) {

                console.log(error);

            }

        },
        base64ToUrl: function (base64) {

            try {

                let blob = this.methods.base64ToBlob(base64, 'image/png');
                let url = URL.createObjectURL(blob);

                return url;

            } catch (error) {

                return 'img/no_image.png';

            }

        },
        base64ToBlob: function (b64Data, contentType='image/png', sliceSize=512) {

            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, {type: contentType});
            return blob;

        },
        favorites: {
            addRestoraunt: function (id, callback) {

                app.request({
                    url: app.params.config.backend + '/api/add-restoraunt-to-favorites',
                    data: {
                        user: localStorage.user,
                        restoraunt: id
                    },
                    success: function (response) {

                        if (callback) {

                            callback();

                        }

                    }
                });

            },
            removeRestoraunt: function (id, callback) {

                app.request({
                    url: app.params.config.backend + '/api/remove-restoraunt-from-favorites',
                    data: {
                        user: localStorage.user,
                        restoraunt: id
                    },
                    success: function (response) {

                        if (callback) {

                            callback();

                        }

                    }
                });

            }
        },
        cart: {
            add: function (item, count, callback) {

                let cart;

                if (localStorage.cart !== undefined && localStorage.cart !== '[]') {

                    cart = JSON.parse(localStorage.cart);

                    if (cart[0].restoraunt_id !== item.restoraunt_id) {

                        cart = [];

                    }

                } else {

                    cart = [];

                }

                let itemIndex;

                itemIndex = cart.findIndex(function (item2) {

                    return item2.id == item.id;

                });

                if (itemIndex == -1) {

                    cart.push(item);

                    itemIndex = cart.findIndex(function (item2) {

                        return item2.id == item.id;

                    });

                }

                if (cart[itemIndex].count !== undefined) {

                    cart[itemIndex].count += count;

                } else {

                    cart[itemIndex].count = count;

                }

                localStorage.cart = JSON.stringify(cart);

                if (callback) {

                    callback();

                }

                app.emit('cart:change');

            },
            remove: function (id, callback) {

                let cart = JSON.parse(localStorage.cart);

                cart = cart.filter(function (item) {

                    return Number(item.id) !== Number(id);

                });

                localStorage.cart = JSON.stringify(cart);

                if (callback) {

                    callback();

                }

                app.emit('cart:change');

            },
            setCount: function (id, count) {

                let cart = JSON.parse(localStorage.cart);

                let itemIndex = cart.findIndex(function (item) {

                    return item.id == id;

                });

                cart[itemIndex].count = count;

                localStorage.cart = JSON.stringify(cart);

                app.emit('cart:change');

            }
        },
        getMinutes: function (str) {

            let time = str.split(':');

            return time[0] * 60 + time[1] * 1;

        },
        getMinutesNow: function (str) {

            let timeNow = new Date();

            return timeNow.getHours() * 60 + timeNow.getMinutes();

        },
        openCachePage: function (url, notOpen) {

            let app = this;

            if (url == undefined ) {

                return false;

            }

            let viewSelector = '.view-cache-page' + url.replace(/\//g, "-");

            let view = app.views.get(viewSelector);

            if (view !== undefined) {

            } else {

                $$('.views').append('<div class="tab view ' + viewSelector.replace('.', '') + '"></div>');

                app.views.create(viewSelector, {
                    url: url
                });

            }

            if (!notOpen) {

                app.tab.show(viewSelector, false);

            }

        },
        localImages: {
            get: function (url) {

                try {

                    let localImages = JSON.parse(localStorage.localImages);

                    let index = localImages.findIndex(function (image) {

                        return image.url === url;

                    });

                    if (index !== -1) {

                        let image = localImages[index];

                        return image.localUrl;

                    } else {

                        app.methods.localImages.addToQueue(url);

                        return url;

                    }

                } catch (error) {

                    console.log(error);

                    return url;

                }

            },
            addToQueue: function (url) {

                let queueLocalImages = JSON.parse(localStorage.queueLocalImages);

                let index = queueLocalImages.indexOf(url);

                if (index === -1) {

                    queueLocalImages.push(url);

                    localStorage.queueLocalImages = JSON.stringify(queueLocalImages);

                }

            },
            saveToLocal: function () {

                let queueLocalImages = JSON.parse(localStorage.queueLocalImages).slice(0, 100);

                if (queueLocalImages.length > 0) {

                    for (let i = 0; i < queueLocalImages.length; i++) {

                        let url = queueLocalImages[i];

                        app.methods.localImages.download(url, i);

                    }

                }

            },
            download: function (url, i) {

                let queueLocalImages = JSON.parse(localStorage.queueLocalImages);

                let queueLocalImageIndex = queueLocalImages.indexOf(url);

                queueLocalImages.splice(queueLocalImageIndex, 1);

                localStorage.queueLocalImages = JSON.stringify(queueLocalImages);

                setTimeout(function () {

                    app.request({
                        url: encodeURI(url),
                        xhrFields: {
                            responseType: 'blob'
                        },
                        success: function (blob) {

                            app.methods.localImages.saveToStorage(url, blob);

                        }
                    });

                }, i * 5000);

            },
            saveToStorage: function (url, blob) {

                let localImages = JSON.parse(localStorage.localImages);

                let localUrl = URL.createObjectURL(blob);

                localforage.setItem(url, blob);

                localImages.push({
                    url: url,
                    localUrl: localUrl
                });

                localStorage.localImages = JSON.stringify(localImages);

            },
            init: function () {

                try {

                    let localImages = [];

                    localStorage.queueLocalImages = '[]';

                    localforage.iterate(function (value, key, iterationNumber) {

                        if (key.indexOf('http') !== -1 && key.indexOf('api') == -1) {

                            let url = URL.createObjectURL(value)

                            localImages.push({
                                url: key,
                                localUrl: url,
                            });

                        }

                    }).then(function () {

                        localStorage.localImages = JSON.stringify(localImages);

                        app.emit('localImages:ready');

                    }).catch(function(){

                        app.emit('localImages:ready');

                    });

                    setInterval(function () {

                        app.methods.localImages.saveToLocal();

                    }, 10000);

                } catch (error) {

                    console.log(error);

                }

            }
        }
    },
    on: {
        init: function () {

        }
    }
});

$$(document).on('deviceready', function () {

    try {

        Keyboard.shrinkView(true);
        Keyboard.disableScrollingInShrinkView(true);

    } catch (error) {

        console.log(error);

    }

    app.init();

    app.request.setup({
        beforeSend: function(xhr) {

        },
        complete: function(xhr) {

            console.log(xhr);

        },
        error: function () {

        }
    });

    app.methods.checkVersion(function () {

        app.methods.localImages.init();

        app.on('localImages:ready', function () {

            app.views.create('#view-main', {
                url: '/main',
                //animate: app.device.ios ? true : false,
                main: true
            });

            app.on('view-main-loaded', function () {

                if (app.device.ios) {

                    app.statusbar.hide();

                    app.statusbar.show();

                }

                setTimeout(function () {

                    navigator.splashscreen.hide();

                }, app.params.config ? 300 : 500);

                app.views.create('#view-stocks', {
                    url: '/stocks',
                    //animate: app.device.ios ? true : false
                });

                app.views.create('#view-cart', {
                    url: '/cart',
                    //animate: app.device.ios ? true : false
                });

                app.views.create('#view-help', {
                    url: '/help',
                    //animate: app.device.ios ? true : false
                });

                app.views.create('#view-profile', {
                    url: app.params.user ? '/profile' : '/profile/auth',
                    //animate: app.device.ios ? true : false
                });

            });

        });

    });

    if (app.device.android) {

        var attachFastClick = Origami.fastclick;

        attachFastClick(document.body);

    }

    $$(window).on('click', '.open-cache-page', function () {

        let url = $$(this).data('href');

        app.methods.openCachePage(url);

    });

    $$(window).on('click', '.custom-back', function () {

        let activeTab = $$('.toolbar-menu').find('.tab-link-active').attr('href');

        app.tab.show(activeTab, false);

    });

    $$(window).on('click', '.input-clear-button', function() {

        $$(this).prev().val('').focus();

    });

    $$(window).on('keypress', 'input', function (e) {

        if (e.which == 13) {

            document.activeElement.blur();

            $$(this).blur();

            Keyboard.hide();

        }

    });

    $$(window).on('touchmove', function (e) {

        let activeElement = $$(document.activeElement)[0];

        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {

            document.activeElement.blur();

            $$('input').blur();

            Keyboard.hide();

        }

    });

    $$(window).on('keyboardWillShow', function (e) {

        $$('.toolbar-menu').css('visibility', 'hidden');

    });

    $$(window).on('keyboardWillHide', function () {

        $$('.toolbar-menu').css('visibility', 'visible');

    });

    $$(document).on('backbutton', function (event) {

        app.methods.backButton();

    });

});
