import React from 'react';
import Marty from 'marty';


class Post extends React.Component {
    render() {
        return <li>{this.props.post.title}: {this.props.post.body}</li>;
    }
}

class Posts extends React.Component {
    render() {
        return <ul>{this.renderPosts()}</ul>;
    }

    renderPosts() {
        if (this.props.posts.size === 0) {
            return <li>No posts :(</li>;
        }

        return this.props.posts.map((post, id) => {
            return <Post key={id} post={post} />;
        }).toJS();
    }
}

export default Marty.createContainer(Posts, {
    listenTo: 'post.Store',
    fetch() {
        return {
            posts: this.app.post.Store.fetchPostsForUser(this.props.user.id)
        };
    },
    pending() {
        return <div>Loading!!</div>;
    }
});
