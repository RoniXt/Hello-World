# Hello World Project

A simple greeting app that saves user names to a database.

## Stack
- Node.js + Express
- Turso (libsql) for database
- Deployed on Render

## Database
- Uses `@libsql/client` to connect to Turso
- Database URL: `libsql://names-ronixt.aws-us-east-2.turso.io`
- Table: `greetings` (id, name, timestamp)

## Environment Variables
- `PORT` - Server port (set automatically by Render)
- `TURSO_DATABASE_URL` - Turso database URL
- `TURSO_AUTH_TOKEN` - Turso authentication token

## Commands
- `npm start` - Start the server
- `npm install` - Install dependencies
