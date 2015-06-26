import Marty from 'marty';
import Immutable from 'immutable';


var UserRecord = new Immutable.Record({
    id: null,
    name: null,
    email: null
});

export default class UserStore extends Marty.Store {
    constructor(options) {
        super(options);

        this.state = new Immutable.Map();
    }

    /**
     * Implement these methods to fine-tune the hydration
     */
    dehydrate() {
        return this.state.toJS();
    }

    rehydrate(users) {
        var state = new Immutable.Map();
        for (var id in users) {
            state = state.set(id, new UserRecord(users[id]));
        }
        this.state = state;
    }

    /**
     * More details in the docs: http://martyjs.org/api/stores/index.html#fetch
     *
     * Basically a store's fetch will check to see if it has the data
     * locally first and then try remotely.
     *
     * By using hasAlreadyFetched, you can actually tell the store
     * during rehydration whether or not you've already fetched all
     * this data or not by using the fetch id (see index.html)
     */
    fetchUsers() {
        return this.fetch({
            id: 'users',
            locally() {
                if (!this.hasAlreadyFetched('users')) {
                    return;
                }

                return this.state;
            },
            remotely() {
                return this.app.user.API.fetchUsers().then((response) => {
                    var state = new Immutable.Map();
                    var users = response.body;
                    users.forEach((user) => {
                        state = state.set(user.id, new UserRecord(user));
                    });
                    this.state = this.state.merge(state);
                });
            }
        });
    }

    fetchUser(id) {
        return this.fetch({
            id: 'user-' + id,
            locally() {
                return this.state.get(id);
            },
            remotely() {
                return this.app.user.API.fetchUsers(id).then((user) => {
                    this.state = this.state.set(id, user);
                });
            }
        });
    }
}
