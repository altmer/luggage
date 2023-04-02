import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Translate, I18n } from 'react-i18nify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PageLoading from '../../components/PageLoading';
import AddComment from '../components/AddComment';
import Comments from '../components/Comments';
import PostDate from '../components/PostDate';
import User from '../../users/components/User';
import LoadMore from '../../components/LoadMore';
import { confirmAction } from '../../services/confirmation';
import { fetchPost, deletePost, fetchComments, fetchMoreComments, commentReceived } from '../editDucks';

export class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
    this.addComment = this.addComment.bind(this);
    this.canBeEdited = this.canBeEdited.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.fetchMoreComments = this.fetchMoreComments.bind(this);
    this.fetchAll = this.fetchAll.bind(this);

    this.state = {
      channel: null,
    };
  }

  componentDidMount() {
    this.fetchAll();
  }

  componentWillReceiveProps() {
    this.joinChannel();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      this.fetchAll();
      this.joinChannel();
    }
  }

  componentWillUnmount() {
    if (this.state.channel) {
      this.state.channel.leave();
    }
  }

  fetchAll() {
    this.props.fetchPost(this.props.postId, this.props.socket);
    this.props.fetchComments(this.props.postId);
  }

  joinChannel() {
    if (!this.props.socket) {
      return;
    }
    if (this.state.channel) {
      this.state.channel.leave();
    }
    const channel = this.props.socket.channel(`post:${this.props.postId}`);
    channel.join();
    channel.on('comment:created', (msg) => {
      this.props.commentReceived(msg.comment);
    });
    this.setState({ channel });
  }

  canBeEdited() {
    if (!this.props.post.user || !this.props.currentUser) {
      return false;
    }
    return this.props.post.user.id === this.props.currentUser.id;
  }

  fetchMoreComments() {
    this.props.fetchMoreComments(this.props.page + 1, this.props.postId);
  }

  deletePost() {
    confirmAction(this.props.deletePost.bind(this, this.props.postId),
                  I18n.t('posts.deleteConfirmation'));
  }

  addComment(text) {
    if (!this.state.channel) {
      return;
    }
    // not enough graceful error and timeout handling
    this.state.channel.push('comment:add', { text }, 10000);
  }

  render() {
    if (this.props.postFetching || !this.props.post.title) {
      return (<PageLoading />);
    }
    return (
      <div className="container post-page">
        <div className="row">
          <div className="col-12">
            <div className="post-show">
              <div className="post-author">
                <User {...this.props.post.user}>
                  <PostDate locale={this.props.locale} date={this.props.post.inserted_at} />
                </User>
              </div>

              <h1 className="post-title display-4">{this.props.post.title}</h1>
              {this.canBeEdited() &&
                <span className="post-actions">
                  <Link to={`/posts/${this.props.postId}/edit`}>
                    <Translate value="posts.edit" />
                  </Link>
                  <a href="#0" onClick={this.deletePost} className="btn-delete-post">
                    <Translate value="posts.delete" />
                  </a>
                </span>
              }
              <p className="post-body">{this.props.post.body}</p>
            </div>
          </div>
        </div>
        <div className="comments-show">
          <h4 className="comments-show-title">
            <Translate value="posts.comments.title" />
          </h4>
          {this.props.currentUser && this.state.channel &&
            <AddComment onSave={this.addComment} />
          }
          <Comments
            comments={this.props.comments}
            locale={this.props.locale}
            fetching={this.props.commentsFetching}
          />
          <LoadMore
            show={this.props.hasMore}
            fetching={this.props.fetchingMore}
            onClick={this.fetchMoreComments}
          />
        </div>
      </div>
    );
  }
}

ShowPost.propTypes = {
  socket: PropTypes.shape({
    channel: PropTypes.func,
  }),

  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    inserted_at: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),

  postId: PropTypes.string.isRequired,
  postFetching: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
  locale: PropTypes.string.isRequired,

  deletePost: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,

  fetchComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  commentsFetching: PropTypes.bool.isRequired,
  commentReceived: PropTypes.func.isRequired,
  fetchMoreComments: PropTypes.func.isRequired,
  page: PropTypes.number,
  hasMore: PropTypes.bool,
  fetchingMore: PropTypes.bool,
};

ShowPost.defaultProps = {
  currentUser: undefined,
  post: {},
  comments: [],
  socket: null,
  page: 1,
  hasMore: false,
  fetchingMore: false,
};

const mapStateToProps = (state, ownProps) => (
  {
    socket: state.session.socket,
    postId: ownProps.match.params.postId,
    postFetching: state.postsShow.postFetching,
    post: state.postsShow.currentPost,
    currentUser: state.session.currentUser,
    locale: state.session.locale,
    comments: state.postsShow.comments,
    commentsFetching: state.postsShow.commentsFetching,
    page: state.postsShow.commentsPage,
    hasMore: state.postsShow.hasMoreComments,
    fetchingMore: state.postsShow.commentsFetchingMore,
  }
);

export default connect(
  mapStateToProps,
  { fetchPost, deletePost, fetchComments, commentReceived, fetchMoreComments })(ShowPost);
