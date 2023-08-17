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

### Uselful links

- <https://ddragon.leagueoflegends.com/api/versions.json>
- <https://ddragon.leagueoflegends.com/api/versions.json>
- <https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json>
- <http://ddragon.leagueoflegends.com/cdn/13.16.1/data/en_US/summoner.json>
- <http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/SummonerCherryFlash.png>
- <https://static.developer.riotgames.com/docs/lol/queues.json>
- <https://static.developer.riotgames.com/docs/lol/gameModes.json>
- <https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json>
- <https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/>
