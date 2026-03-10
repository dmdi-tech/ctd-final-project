# Sol Radio

## About

Inspired by old car stereos and Microsoft Media Player skins, Sol Radio has been a personal project I have been wanting to build.

You can search for songs, add them to your liked list, and favorite them.

## Dependencies

- React
- Vite
- React Router
- Styled Components
- iTunes API

## How to start
1. Clone the repository

```git bash
    git clone https://github.com/dmdi-tech/ctd-final-project.git
    cd ctd-final-project
```

2. Install dependences

```git bash
    npm install
```

3. Start the dev server

```git bash
    npm run dev
```

### Other considerations:

No need to set up an env file. This app does not require any env variables.

This application uses iTunes API, which is public and requires no authentication, but is limited to a limited number of requests.

All data is stored via LocalStorage, no need for database set up.