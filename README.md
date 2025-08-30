# members-only

![Screenshot](web/screenshot.png 'Screenshot')

## Features

- **User Authentication** – Secure sign-up, login, and logout configured with _Passport.js_ with hashed passwords using _bcrypt_
- **Role-Based Access** – Different permissions for regular users, members, and admins
- **Message Board** – Users can post, view, and (if `user.role.admin === true`) delete messages
- **Input Validation & Security** – Form validation, sanitized inputs, and protected routes to prevent unauthorized actions

## Requirements

- **PostgreSQL 17** – Database to store users, posts, and session
- **Node.js (LTS)** – Runtime environment for the backend server
- **npm** – Package manager to install project dependencies

## Installation

Install with npm

```bash
git clone https://github.com/cedorikku/members-only
cd members-only
npm install
```

### Environment Variables

_Example_

```bash
# local database
PGHOST=localhost
PGUSER=user
PGPASSWORD=your_db_password
PGDATABASE=members_only
PGPORT=5432

# secret club code
SECRET_CODE=your_member_code

# session store secret
SECRET=do_not_tamper_with_this_cookie
```

### Database setup

> [!NOTE]
> Make sure that `members-only` does not yet exist in your database

#### PostgreSQL

1. Open the interactive terminal

```bash
psql
```

2. Create the db

```shell
CREATE DATABASE "members-only";
```

#### Seeding

1. Run the script

```bash
# .../members-only/
npm run seed
```

2. After a database is formed with the seed, run once to connect to a session store

```bash
psql members_only < node_modules/connect-pg-simple/table.sql
```

## Run Locally

```bash
# .../members-only/
npm run dev
```

## Extra fluff I've learned

- _Optional chaining_, from when rendering conditionally in the view since the `locals` object isn't guaranteed to be defined.
- _Migration_ would've been nice during development when the model keeps evolving with different requirements.
- _HTMLDialogElement_, for create native HTML modals and `::backdrop` for styling its backdrop.
