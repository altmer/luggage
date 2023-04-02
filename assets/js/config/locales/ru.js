const locales = {
  common: {
    loadMore: 'Загрузить ещё...',
    search: 'Искать...',
  },
  errors: {
    required: 'Обязательное поле',
    email: 'Неправильный email',
    passwordLength: 'Пароль должен быть не менее 5 символов длиной',
    forbidden: 'Нет авторизации! Пожалуйста войдите в свой аккаунт.',
  },
  confirmation: {
    ok: 'OK',
    cancel: 'Отмена',
    warningTitle: 'Внимание',
  },
  notification: {
    postSaved: 'Пост сохранён',
    postCreated: 'Пост добавлен',
    postDeleted: 'Пост удалён',
    signedIn: 'Вход выполнен',
    signedOut: 'Выход выполнен',
    mustBeLoggedIn: 'Нужно авторизоваться!',
    userProfileUpdated: 'Профиль обновлён',
    userPasswordChanged: 'Пароль успешно изменён',
    passwordReset: {
      requested: 'Мы отправили тебе email с интсрукциями',
      success: 'Пароль обновлён! Теперь ты можешь войти с новым паролем.',
      invalidToken: 'Токен недействителен',
    },
    oauthFailed: 'Авторизация не удалась',
  },
  landing: {
    header: 'Современный шаблон веб-приложения',
    text: 'Luggage создан с помощью Elixir и React. Не стесняйтесь исследовать и изучать!',
  },
  not_found: {
    header: 'О нет! У нас нет такой страницы...',
    description: 'Но есть много других! Пожалуйста начните сначала.',
  },
  posts: {
    empty: 'Еще нет ни одного поста! Добавь первый прямо сейчас.',
    new: 'Добавить новый пост',
    cancel: 'Отменить',
    save: 'Сохранить',
    title: 'Заголовок',
    body: 'Текст',
    edit: 'Редактировать',
    delete: 'Удалить',
    deleteConfirmation: 'Вы уверены, что хотите удалить этот пост?',
    readMore: 'Читать дальше...',
    comments: {
      title: 'Комментарии',
      empty: 'Пока нет ни одного комментария',
      save: 'Добавить',
    },
  },
  registrations: {
    new: {
      name: 'Имя',
      email: 'E-Mail',
      password: 'Пароль',
      passwordConfirmation: 'Подтверждение пароля',
      save: 'Зарегистрироваться',
      cancel: 'Отменить',
      google: 'Войти через Google',
    },
  },
  sessions: {
    login: 'Войти',
    logout: 'Выйти',
    register: 'Создать аккаунт',
    new: {
      cancel: 'Отменить',
      save: 'Войти',
      forgot: 'Не помнишь пароль?',
      google: 'Войти через Google',
    },
    forgot: {
      action: 'Восстановить пароль',
    },
  },
  users: {
    myProfile: 'Мой профиль',
    changePassword: 'Сменить пароль',
    editProfile: 'Редактировать профиль',
    save: 'Сохранить',
    cancel: 'Отменить',
    avatar: {
      cropTitle: 'Выбери часть фото для загрузки',
      cropUpload: 'Загрузить',
      cropCancel: 'Отменить',
      wrongFile: 'Формат файла неверный. Пожалуйста попробуйте другой файл!',
    },
    form: {
      bio: 'О себе',
    },
    tabs: {
      posts: 'Посты',
      comments: 'Комментарии',
    },
    changePasswordForm: {
      oldPassword: 'Текущий пароль',
      save: 'Сохранить',
    },
  },
};

export default locales;
