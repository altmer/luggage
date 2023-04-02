import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-i18nify';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';

import Avatar from '../components/Avatar';
import AvatarUpload from '../components/AvatarUpload';
import UserProfileForm from '../components/UserProfileForm';

import UserProfilePostsTab from './UserProfilePostsTab';

import { fetchUser, startEdit, stopEdit, saveUser, uploadAvatar } from '../profileDucks';

const renderLoadingState = () => (
  <div className="container user-profile">
    <div className="row">
      <div className="col-12 user-profile-loading">
        <div className="row user-profile-header">
          <div className="col-8 col-md-4">
            <div className="user-name-mockup" />
            <div className="user-description-mockup" />
            <div className="user-description-mockup" />
          </div>
          <div className="col-4 col-md-2">
            <div className="user-profile-photo">
              <div className="user-avatar-mockup user-avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ownProfile = (user, currentUser) => {
  if (!user || !currentUser) {
    return false;
  }
  return user.id === currentUser.id;
};

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.props.fetchUser(this.props.userId);
    }
  }

  saveUser(formData) {
    this.props.saveUser(this.props.userId, formData);
  }

  uploadAvatar(file, crop) {
    this.props.uploadAvatar(this.props.userId, file, crop);
  }

  renderEditControls() {
    const { user, currentUser } = this.props;
    if (!ownProfile(user, currentUser)) {
      return null;
    }
    return (
      <div className="user-edit-controls">
        <a href="#0" onClick={this.props.startEdit}>
          <Translate value="users.editProfile" />
        </a>
      </div>
    );
  }

  renderUserProfileInfo() {
    const { user, currentUser, edit } = this.props;
    if (edit && ownProfile(user, currentUser)) {
      return (
        <UserProfileForm
          {...user}
          onSave={this.saveUser}
          onCancel={this.props.stopEdit}
        />
      );
    }
    return (
      <div className="user-profile-info">
        <div className="user-profile-name">
          {user.name}
        </div>
        {user.bio && <p className="user-profile-bio">
          {user.bio}
        </p>}
        {this.renderEditControls()}
      </div>
    );
  }

  renderAvatar() {
    const { user, currentUser, edit } = this.props;
    if (edit && ownProfile(user, currentUser)) {
      return (
        <AvatarUpload
          user={user}
          onUpload={this.uploadAvatar}
          uploading={this.props.avatarUploading}
        />
      );
    }
    return (
      <Avatar {...user} />
    );
  }


  render() {
    const { fetching } = this.props;
    if (fetching) {
      return renderLoadingState();
    }
    return (
      <div className="user-profile">
        <div className="container">
          <div className="row user-profile-header">
            <div className="col-8 col-md-4">
              {this.renderUserProfileInfo()}
            </div>
            <div className="col-4 col-md-2">
              <div className="user-profile-photo">
                {this.renderAvatar()}
              </div>
            </div>
          </div>

          <div className="user-profile-tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <NavLink className="nav-link" to={`/users/${this.props.userId}/show/posts`} activeClassName="active">
                  <Translate value="users.tabs.posts" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="user-profile-tab">
          <Route
            exact
            path="/users/:userId/show"
            render={(props) => {
              props.history.push(`/users/${props.match.params.userId}/show/posts`);
              return null;
            }}
          />
          <Route path="/users/:userId/show/posts" component={UserProfilePostsTab} />
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    initials: PropTypes.string,
    bio: PropTypes.string,
  }),

  userId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  avatarUploading: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,

  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),

  fetchUser: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
  stopEdit: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

UserProfile.defaultProps = {
  currentUser: undefined,
  user: {},
};

const mapStateToProps = (state, ownProps) => (
  {
    userId: ownProps.match.params.userId,
    fetching: state.userProfile.fetching,
    avatarUploading: state.userProfile.avatarUploading,
    user: state.userProfile.user,
    edit: state.userProfile.edit,
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchUser(userId) {
      dispatch(fetchUser(userId));
    },
    saveUser(userId, formData) {
      dispatch(saveUser(userId, formData));
    },
    startEdit() {
      dispatch(startEdit());
    },
    stopEdit() {
      dispatch(stopEdit());
    },
    uploadAvatar(userId, file, crop) {
      dispatch(uploadAvatar(userId, file, crop));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
