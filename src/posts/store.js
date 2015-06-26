import Marty from 'marty';
import Immutable from 'immutable';


var PostRecord = new Immutable.Record({
    id: null,
    userId: null,
    title: null,
    body: null
});

export default class PostStore extends Marty.Store {
    constructor(options) {
        super(options);

        this.state = new Immutable.List();
    }

    /**
     * Implement these methods to fine-tune the hydration
     */
    dehydrate() {
        return this.state.toJS();
    }

    rehydrate(posts) {
        this.state = new Immutable.List(posts.map((post) => {
            return new PostRecord(post);
        }));
    }

    /**
     * More details in the docs: http://martyjs.org/api/stores/index.html#fetch
     *
     * Basically a store's fetch will check to see if it has the data
     * locally first and then try remotely.
     *
     * By using hasAlreadyFetched, you can actually tell the store
     * during rehydration whether or not you've already fetched all
     * this data  or not by using the fetch id (see index.html)
     */
    fetchPostsForUser(uid) {
        var id = 'posts-' + uid;
        return this.fetch({
            id: id,
            locally() {
                if (!this.hasAlreadyFetched(id)) {
                    return;
                }

                return this.state.filter(post => post.userId == uid);
            },
            remotely() {
                return this.app.post.API.fetchPostsForUser(uid).then((response) => {
                    var state = this.state;
                    response.body.forEach((post) => {
                        state = state.push(new PostRecord(post));
                    });
                    this.state = state;
                });
            }
        });
    }
}
