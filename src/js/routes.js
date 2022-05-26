
import HomePage from '../pages/home.f7';
import Taches from '../pages/taches.f7';
import AboutPage from '../pages/about.f7';
import FormPage from '../pages/form.f7';
import FormUpdateList from '../pages/formUpdateList.f7';
import FormTache from '../pages/formTache.f7';
import FormUpdateTache from '../pages/formUpdateTache.f7';

import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';
import { $ } from 'dom7';

var routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/taches/:name/:id',
        component: Taches,
        on:
        {
            pageInit: function (e, page) {
                var prop = page.route.params;
                var title = $('.title-list')[0]
                $(title).append(`<label class='${prop.name}'>${prop.name}</label>`)
            }
        },
    },
    {
        path: '/about/',
        component: AboutPage,
    },
    {
        path: '/form/',
        component: FormPage,
    },
    {
        path: '/formTache/:id',
        component: FormTache,
    },
    {
        path: '/formUpdateList/:name/:id',
        component: FormUpdateList,
        on:
        {
            pageInit: function (e, page) {
                var prop = page.route.params;
                $('#nameList').value(prop.name)
                $('#idList').value(prop.id)
            }
        },
    },
    {
        path: '/formUpdateTache/:name/:id/:idList',
        component: FormUpdateTache,
        on:
        {
            pageInit: function (e, page) {
                var prop = page.route.params;
                $('#nameTache').value(prop.name)
                $('#idTache').value(prop.id)
            }
        },
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '/request-and-load/user/:userId/',
        async: function ({ router, to, resolve }) {
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = to.params.userId;

            // Simulate Ajax Request
            setTimeout(function () {
                // We got user data from request
                var user = {
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [
                        {
                            title: 'Framework7 Website',
                            url: 'http://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'http://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve(
                    {
                        component: RequestAndLoad,
                    },
                    {
                        props: {
                            user: user,
                        }
                    }
                );
            }, 1000);
        },
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;