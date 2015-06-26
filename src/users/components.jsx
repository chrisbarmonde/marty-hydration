import React from 'react';
import Marty from 'marty';

import PostContainer from '../posts/components';


class User extends React.Component {
    constructor(options) {
        super(options);

        this.state = {
            showPosts: false
        };
    }

    render() {
        var posts;
        if (this.state.showPosts) {
            posts = <PostContainer user={this.props.user} />;
        }

        return (
            <li onClick={this.onClick.bind(this)} style={{cursor: 'pointer'}}>
                <span>{this.props.user.name}: {this.props.user.email}</span>
                {posts}
            </li>
        );
    }

    onClick() {
        this.setState({showPosts: !this.state.showPosts});
    }
}

class Users extends React.Component {
    render() {
        return <ul>{this.renderUsers()}</ul>;
    }

    renderUsers() {
        return this.props.users.map((user, uid) => {
            return <User key={uid} user={user} />;
        }).toJS();
    }
}

export default Marty.createContainer(Users, {
    listenTo: 'user.Store',
    fetch() {
        return {
            users: this.app.user.Store.fetchUsers()
        };
    }
});
