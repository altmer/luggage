import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Posts from '../../posts/components/Posts';
import Pagination from '../../components/Pagination';
import { fetchPosts } from '../../posts/searchDucks';

export class UserProfilePostsTab extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.props.fetchPosts(this.props.page, this.props.userId);
  }

  paginate(page) {
    this.props.fetchPosts(page, this.props.userId);
  }

  render() {
    return (
      <div className="container posts">
        {(!this.props.fetching && this.props.totalPages > 1) && <Pagination
          page={this.props.page}
          totalPages={this.props.totalPages}
          onPaginate={this.paginate}
        />}
        <Posts
          locale={this.props.locale}
          currentUser={this.props.currentUser}
          posts={this.props.posts}
          fetching={this.props.fetching}
        />
        {(!this.props.fetching && this.props.totalPages > 1) && <Pagination
          page={this.props.page}
          totalPages={this.props.totalPages}
          onPaginate={this.paginate}
        />}
      </div>
    );
  }
}

UserProfilePostsTab.propTypes = {
  userId: PropTypes.string.isRequired,

  locale: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({}),

  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  fetching: PropTypes.bool.isRequired,

  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

UserProfilePostsTab.defaultProps = {
  currentUser: undefined,
  posts: [],
};

const mapStateToProps = (state, ownProps) => (
  {
    userId: ownProps.match.params.userId,

    currentUser: state.session.currentUser,
    locale: state.session.locale,

    posts: state.postsIndex.posts,
    fetching: state.postsIndex.fetching,

    totalPages: state.postsIndex.totalPages,
    page: state.postsIndex.page,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: (page, userId) => dispatch(fetchPosts(page, userId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePostsTab);
