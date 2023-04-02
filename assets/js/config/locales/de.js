const locales = {
  common: {
    loadMore: 'Mehr laden...',
    search: 'Suchen...',
  },
  errors: {
    required: 'Bitte ausfüllen',
    email: 'E-Mail ist ungültig',
    passwordLength: 'Passwort muss mindestens 5 Zeichen haben',
    forbidden: 'Nicht autorisiert! Bitte neu anmelden.',
  },
  confirmation: {
    ok: 'OK',
    cancel: 'Abbrechen',
    warningTitle: 'Achtung',
  },
  notification: {
    postSaved: 'Post gespeichert',
    postCreated: 'Neuer Post erstellt',
    postDeleted: 'Post gelöscht',
    signedIn: 'Erfolgreich angemeldet',
    signedOut: 'Erfolgreich abgemeldet',
    mustBeLoggedIn: 'Du musst angemeldet sein!',
    userProfileUpdated: 'Profil aktualisiert',
    userPasswordChanged: 'Passwort aktualisiert',
    passwordReset: {
      requested: 'Wir haben Ihnen eine E-Mail zugeschickt',
      success: 'Passwort aktualisiert! Jetzt kannst du dich mit neuem Passwort anmelden.',
      invalidToken: 'Token abgelaufen',
    },
    oauthFailed: 'Auth fehlgeschlagen',
  },
  landing: {
    header: 'Moderne Web-Anwendungsvorlage',
    text: 'Luggage wird mit Elixir und React gebaut. Fühlen Sie sich frei, es zu erkunden!',
  },
  not_found: {
    header: 'Oh nein! Wir haben die Seite nicht...',
    description: 'Aber gibt es viel mehr! Bitte versuch es erneut.',
  },
  posts: {
    empty: 'Es gibt keinen Posts hier! Füge einen bitte hinzu.',
    new: 'Neuer Post hinzufügen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    title: 'Name',
    body: 'Text',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    deleteConfirmation: 'Bist du sicher, dass du diesen Post löschen möchtest?',
    readMore: 'Weiterlesen...',
    comments: {
      title: 'Kommentare',
      empty: 'Es gibt noch keine Kommentare',
      save: 'Hinzufügen',
    },
  },
  registrations: {
    new: {
      name: 'Name',
      email: 'E-Mail',
      password: 'Passwort',
      passwordConfirmation: 'Passwort bestätigung',
      save: 'Registrieren',
      cancel: 'Abbrechen',
      google: 'Mit Google registrieren',
    },
  },
  sessions: {
    login: 'Einloggen',
    logout: 'Ausloggen',
    register: 'Registrieren',
    new: {
      cancel: 'Abbrechen',
      save: 'Einloggen',
      forgot: 'Passwort vergessen?',
      google: 'Mit Google anmelden',
    },
    forgot: {
      action: 'Passwort zurücksetzen',
    },
  },
  users: {
    myProfile: 'Mein Profil',
    changePassword: 'Passwort ändern',
    editProfile: 'Profil bearbeiten',
    save: 'Speichern',
    cancel: 'Abbrechen',
    avatar: {
      cropTitle: 'Wahl die Bildfläche zu laden',
      cropUpload: 'Hochladen',
      cropCancel: 'Abbrechen',
      wrongFile: 'Der File ist ungültig. Bitte versuchen Sie es mit einem anderen File!',
    },
    form: {
      bio: 'Bio',
    },
    tabs: {
      posts: 'Posts',
      comments: 'Bemerkungen',
    },
    changePasswordForm: {
      oldPassword: 'Altes Passwort',
      save: 'Speichern',
    },
  },
};

export default locales;
