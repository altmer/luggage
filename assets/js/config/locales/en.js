const locales = {
  common: {
    loadMore: 'Load more...',
    search: 'Search...',
  },
  errors: {
    required: "Can't be blank",
    email: 'Wrong email format',
    passwordLength: 'Password must be at least 5 characters long',
    forbidden: 'Not authorized! Please sign in again.',
  },
  confirmation: {
    ok: 'OK',
    cancel: 'Cancel',
    warningTitle: 'Attention',
  },
  notification: {
    postSaved: 'Post saved',
    postCreated: 'New post created',
    postDeleted: 'Post deleted',
    signedIn: 'Signed in successfully',
    signedOut: 'Signed out successfully',
    mustBeLoggedIn: 'You have to be signed in!',
    userProfileUpdated: 'Profile updated',
    userPasswordChanged: 'Password updated successfully',
    passwordReset: {
      requested: 'We have sent you email',
      success: 'Password updated! Now you can login with new password.',
      invalidToken: 'Token expired',
    },
    oauthFailed: 'Auth failed',
  },
  landing: {
    header: 'Modern web application template',
    text: 'Luggage is built with Elixir and React. Feel free to explore it!',
  },
  not_found: {
    header: 'Oh no! We don\'t have this page',
    description: 'But there are many others! Please start again.',
  },
  posts: {
    empty: 'There are no posts here yet! Please proceed with creating one.',
    new: 'Create new post',
    cancel: 'Cancel',
    save: 'Save',
    title: 'Name',
    body: 'Text',
    edit: 'Edit',
    delete: 'Delete',
    deleteConfirmation: 'Are you sure you want to delete this post?',
    readMore: 'Read more...',
    comments: {
      title: 'Comments',
      empty: 'No comments yet',
      save: 'Add',
    },
  },
  registrations: {
    new: {
      name: 'Name',
      email: 'E-Mail',
      password: 'Password',
      passwordConfirmation: 'Password confirmation',
      save: 'Register',
      cancel: 'Cancel',
      google: 'Register with Google',
    },
  },
  sessions: {
    login: 'Sign in',
    logout: 'Sign out',
    register: 'Register',
    new: {
      cancel: 'Cancel',
      save: 'Login',
      forgot: 'Forgot password?',
      google: 'Sign in with Google',
    },
    forgot: {
      action: 'Recover password',
    },
  },
  users: {
    myProfile: 'My profile',
    changePassword: 'Change password',
    editProfile: 'Edit profile',
    save: 'Save',
    cancel: 'Cancel',
    avatar: {
      cropTitle: 'Select the image area to upload',
      cropUpload: 'Upload',
      cropCancel: 'Cancel',
      wrongFile: 'The file is invalid. Please try with other file!',
    },
    form: {
      bio: 'Bio',
    },
    tabs: {
      posts: 'Posts',
      comments: 'Comments',
    },
    changePasswordForm: {
      oldPassword: 'Old password',
      save: 'Save',
    },
  },
};

export default locales;
