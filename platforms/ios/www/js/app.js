var $$ = Dom7;

var app = new Framework7({
    root: '#app',
    name: 'Zaytoon',
    theme: 'ios',
    version: 4.3,
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
        preloadPreviousPage: true,
        removeElements: false,
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
        collapseLargeTitleOnScroll: false
    },
    methods: {
        checkVersion: function (callback) {

            var app = this;

            app.request({
                url: 'https://zaytoon.ru/api/config',
                dataType: 'json',
                async: false,
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
                                
                                    <div class="block-title block-title-large">Вышла новая версия</div>
                                    
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

                                        cordova.InAppBrowser.open(config.updateLink.ios, '_system', InAppBrowserParams);

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

                    callback();

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

    setTimeout(function () {

        if (app.device.ios) {

            app.statusbar.hide();
            app.statusbar.show();

            setTimeout(function () {

                app.statusbar.setBackgroundColor('#FF8C00');

                app.statusbar.setTextColor('white');

            }, 100);

        }

        navigator.splashscreen.hide();

    }, 1000);

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

        app.views.create('#view-main', {
            url: '/main',
            //animate: app.device.ios ? true : false,
            main: true
        });

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

        app.views.create('#view-restoraunt');

    });

    if (app.device.android) {

        var attachFastClick = Origami.fastclick;

        attachFastClick(document.body);

    }

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