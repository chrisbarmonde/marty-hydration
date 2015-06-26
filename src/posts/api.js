import Marty from 'marty';


export default class PostAPI extends Marty.HttpStateSource {
    fetchPostsForUser(uid) {
        return this.get({
            url: 'http://jsonplaceholder.typicode.com/posts?userId=' + uid
        });
    }
}
