# The Luggage

Opinionated modern web application template, this serves as a starting point for
my web projects.

![App screenshot](http://i67.tinypic.com/35jxysg.png)

## What's inside

- **Phoenix 1.3** project
- Mailers setup with **Bamboo**
- Authentication using email and password
- Backend I18n with **gettext**
- Frontend I18n with **react-i18nify**
- Oauth via Google
- User account management
  - Change password
  - Upload avatar (S3 storage) with cropping support
  - Forgot password
- Example CRUD app - blog posts
- Live comments powered by **websockets**
- **Sass** stylesheets
- **Bootstrap 4**
- **React/Redux** boilerplate setup
- Notifications using **react-notification**
- File upload with **react-dropzone**
- **Halogen** loading spinners
- Production release build using **distillery** and **docker**
- Development setup with **docker-compose**
- Backend tests with **ExUnit** and **ex_machina**
- Frontend tests with **jest**
- Elixir code style linting with **credo**
- JS code style linting with **eslint** (airbnb config)
- Running tests and linters on every commit with **Travis CI**
- External logging to **Papertrail**, exception notifications to **Rollbar**

## Getting started

Clone repository:

`git clone --depth=1 https://github.com/altmer/luggage.git myapp`

After cloning rename the following patterns (case sensitive):

* Luggage => Myapp
* luggage => myapp

in `luggage,!_build,!priv/static`.

Rename `lib/luggage` folder to `lib/myapp`.

## Run in development

There are a bunch of useful scripts in bin/docker folder to simplify docker-compose
setup and running of common tasks.

- `setup` - should be run first, builds and setups whole environment
- `test` - runs (backend only!) tests
- `credo` - runs credo
- `start` - starts the application (go to http://localhost:23000 to access it)
- `stop` - stops the application
- `restart` - restarts application
- `console` - launches iex console with phoenix project
- `logs` - display logs from docker-compose
- `mix` - runs mix task (accepts task as command line param)
- `yarn` - runs yarn task (accepts task as command line param)
- `npmrebuild` - runs `npm rebuild` command in docker container (sometimes needed to fix node-sass issues)

## Production deploy

`docker run -it --rm -p 4000:4000 -e "ENV=val" ... mydockerlogin/myapp:latest foreground`

Some env variables should be supplied:

* `REPLACE_OS_VARS=true`
* `HOST=myapp.com`
* `PORT=4000`
* `AWS_S3_BUCKET=myapp_uploads`
* `AWS_S3_KEY=<s3_key>`
* `AWS_S3_SECRET=<s3_secret>`
* `POSTGRES_HOST=database_host`
* `POSTGRES_USER=admin`
* `POSTGRES_PASSWORD=1234`
* `SECRET_KEY_BASE=very_secret_key`
* `ROLLBAR_ACCESS_TOKEN=rollbar_token`
* `SMTP_DOMAIN=mailcatcher.net`
* `SMTP_PORT=2525`
* `SMTP_USERNAME=mail_admin`
* `SMTP_PASSWORD=1234`
* `GOOGLE_CLIENT_ID=google_client_id`
* `GOOGLE_CLIENT_SECRET=google_client_secret`
* `PAPERTRAIL_URL=papertrail://logs.papertrailapp.com:1234/myapp_production`

## Run migrations in production

`docker exec myapp /opt/app/bin/myapp migrate`
