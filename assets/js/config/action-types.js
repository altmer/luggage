const ActionTypes = {
  POSTS_FETCHING: 'posts_fetching',
  POSTS_RECEIVED: 'posts_received',
  MORE_POSTS_FETCHING: 'posts_fetching_more',
  MORE_POSTS_RECEIVED: 'posts_received_more',
  MORE_POSTS_FETCHING_ERRORED: 'posts_fetching_more_errored',

  POST_SAVE_ERRORED: 'post_save_errored',
  POST_CLEAR_ERRORS: 'post_clear_errors',
  POST_FETCHING: 'post_fetching',
  POST_RECEIVED: 'post_received',
  POST_COMMENTS_FETCHING: 'post_comments_fetching',
  POST_COMMENTS_RECEIVED: 'post_comments_received',
  POST_COMMENT_RECEIVED: 'post_comment_received',
  POST_MORE_COMMENTS_FETCHING: 'post_more_comments_fetching',
  POST_MORE_COMMENTS_RECEIVED: 'post_more_comments_received',
  POST_MORE_COMMENTS_FETCHING_ERRORED: 'post_more_comments_fetching_errored',

  SET_LOCALE: 'set_locale',

  CURRENT_USER: 'current_user',
  SESSION_ERROR: 'session_error',
  CLEAR_SESSION_ERRORS: 'clear_session_errors',
  REGISTRATIONS_ERROR: 'registrations_error',
  SIGNED_OUT: 'signed_out',

  ADD_NOTIFICATION: 'add_notification',
  DISMISS_NOTIFICATION: 'dismiss_notification',

  USER_FETCHING: 'user_profile_fetching',
  USER_RECEIVED: 'user_profile_received',
  USER_START_EDIT: 'user_profile_start_edit',
  USER_STOP_EDIT: 'user_profile_stop_edit',
  USER_SAVE_ERRORED: 'user_save_errored',
  USER_UPLOAD_AVATAR_START: 'user_profile_upload_avatar_start',
  USER_UPLOAD_AVATAR_SUCCESS: 'user_profile_upload_avatar_success',
  USER_UPLOAD_AVATAR_ERROR: 'user_profile_upload_avatar_error',
  USER_CHANGE_PASSWORD_FAILED: 'user_change_password_failed',
  USER_CHANGE_PASSWORD_CLEAR_ERRORS: 'user_change_password_clear_errors',

  SEARCH_STARTED: 'search_started',
  SEARCH_FINISHED: 'search_finished',
  SEARCH_ERRORED: 'seaerch_errored',
};

export default ActionTypes;
