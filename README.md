# League log

League stat website in nextjs 13.

## Deveopment

Start postgres `docker compose up -d postgres`
To run dev server:`npm run dev`
To inspect prisma db : `npx prisma studio`
To run tailwindwatch: `npm run tailwatch`

## Deployment

Have file `.env.local` in the root of the next app.
Start postgres `docker compose up -d postgres`
Start web `docker compose up -d web`

### .env.local variables

- `RIOT_KEY`
- `POSTGRES_PASSWORD`
`docker-compose up` to start server.
