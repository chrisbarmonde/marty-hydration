import Marty from 'marty';


export default class UserAPI extends Marty.HttpStateSource {
    fetchUsers(id) {
        var url = 'http://jsonplaceholder.typicode.com/users';
        if (id) {
            url += '/' + id;
        }

        return this.get({
            url: url
        });
    }
}
