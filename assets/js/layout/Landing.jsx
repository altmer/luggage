import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Translate } from 'react-i18nify';
import { Link } from 'react-router-dom';

import Posts from '../posts/components/Posts';
import LoadMore from '../components/LoadMore';
import { fetchPosts, fetchMorePosts } from '../posts/searchDucks';

export class Landing extends Component {
  constructor() {
    super();
    this.fetchMorePosts = this.fetchMorePosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  fetchMorePosts() {
    this.props.fetchMorePosts(this.props.page + 1);
  }

  render() {
    return (
      <div className="landing">
        <div className="container landing-welcome">
          <div className="row">
            <div className="col-12">
              <h1 className="landing-header display-4"><Translate value="landing.header" /></h1>
              <p className="landing-text lead">
                <Translate value="landing.text" />
              </p>
            </div>
          </div>
          {this.props.currentUser &&
            <div className="row">
              <div className="col-12">
                <Link to={'/posts/new'} className="btn btn-outline-primary">
                  <Translate value="posts.new" />
                </Link>
              </div>
            </div>
          }
          {!this.props.currentUser &&
            <div className="row">
              <div className="col-12">
                <Link to={'/sign_up'} className="btn btn-success">
                  <Translate value="sessions.register" />
                </Link>
                <Link to={'/sign_in'} className="btn btn-secondary">
                  <Translate value="sessions.login" />
                </Link>
              </div>
            </div>
          }
        </div>
        <div className="posts">
          <div className="container">
            <Posts
              locale={this.props.locale}
              currentUser={this.props.currentUser}
              posts={this.props.posts}
              fetching={this.props.fetching}
            />
            <LoadMore
              show={this.props.hasMore}
              fetching={this.props.fetchingMore}
              onClick={this.fetchMorePosts}
            />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  locale: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({}),

  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  fetching: PropTypes.bool.isRequired,

  fetchMorePosts: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  fetchingMore: PropTypes.bool.isRequired,
};

Landing.defaultProps = {
  currentUser: undefined,
  posts: [],
};

const mapStateToProps = state => (
  {
    currentUser: state.session.currentUser,
    locale: state.session.locale,

    posts: state.postsIndex.posts,
    fetching: state.postsIndex.fetching,
    fetchingMore: state.postsIndex.fetchingMore,
    hasMore: state.postsIndex.hasMore,
    page: state.postsIndex.page,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchMorePosts: page => dispatch(fetchMorePosts(page)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
