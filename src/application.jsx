import React from 'react';
import Marty from 'marty';

import UsersContainer from './users/components';
import UserStore from './users/store';
import UserAPI from './users/api';

import PostAPI from './posts/api';
import PostStore from './posts/store';


class Application extends Marty.Application {
    constructor(options) {
        super(options);

        this.register({
            user: {
                Store: UserStore,
                API: UserAPI
            },

            post: {
                Store: PostStore,
                API: PostAPI
            }
        });
    }
}


var app = new Application();
app.rehydrate();

React.render(
    <Marty.ApplicationContainer app={app}><UsersContainer /></Marty.ApplicationContainer>,
    window.document.body
);

window.app = app;
