import { PlatformIdToRegion, QueueTypeConverter } from '@/lib/gameConstants';
import {
  get_rune_name_from_id,
  get_summoner_name_from_id,
  get_item_name_from_id,
  get_augment_name_from_id,
} from '@/lib/ddragonApi';
import { TeamPostistions } from '@/lib/gameConstants';
import { Match, MatchPlayer } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';

function format_date(time_in_milliseconds: bigint): string {
  var date = new Date(Number(time_in_milliseconds));
  if (new Date().getTime() - date.getTime() < 1000 * 60 * 60 * 60) {
    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60)).toString() + 'h ago';
  } else {
    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)).toString() + 'd ago';
  }
}
export function Meta({ match, curret_player_match }: { match: Match; curret_player_match: MatchPlayer }) {
  return (
    <div className="flex flex-row justify-center items-center whitespace-nowrap gap-4">
      <div className="flex flex-col text-center ">
        <p title="Gamemode" className="text-sm">
          {QueueTypeConverter[match.queueId]}
        </p>
        {/* <p>Avg rank</p> */}
      </div>
      <div className="flex flex-col text-center ">
        <p title="Time since creation">{format_date(match.gameCreation)}</p>
        <div>
          <p title="Match length">{Math.floor(match.gameDuration / 6) / 10}m</p>
          {/* <p>{curret_player_match.win ? 'Win' : 'Loss'}</p> */}
        </div>
      </div>
    </div>
  );
}
export function KDA({ match, curret_player_match }: { match: Match; curret_player_match: MatchPlayer }) {
  return (
    <div className="flex flex-col text-center  justify-center">
      <p title="Kda">
        {curret_player_match.kills}/{curret_player_match.deaths}/{curret_player_match.assists}
        {/* (
        {Math.floor((10 * (curret_player_match.assists + curret_player_match.kills)) / curret_player_match.deaths) / 10}
        ) */}
      </p>
      {/* <p title="Kill participation">
        {Math.floor(
          ((curret_player_match.kills + curret_player_match.assists) /
            (curret_player_match.teamId === 0 ? match.team0ChampionsKills : match.team1ChampionsKills)) *
            10
        ) * 10}
        %kp
      </p> */}
    </div>
  );
}
export async function Champion({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var summoner_1_name = await get_summoner_name_from_id(curret_player_match.summoner1Id.toString());
  var summone_2_name = await get_summoner_name_from_id(curret_player_match.summoner2Id.toString());

  return (
    <div className="flex text-center items-center justify-center gap-2  ">
      <div className="flex flex-row">
        <div className="overflow-hidden relative">
          <Icon
            url={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${curret_player_match.championId}.png`}
            size={48}
            alt="Champion icon"
            classes="rounded-lg scale-110"
          ></Icon>

          <div title="Level" className="absolute bottom-0 left-0 opacity-80 bg-black pr-1 ">
            <p className="drop-shadow opacity-100">{curret_player_match.champLevel}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_PATCH}/img/spell/${summoner_1_name}`}
            width={24}
            height={24}
            alt="Summoner 1"
          ></Image>
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_PATCH}/img/spell/${summone_2_name}`}
            width={24}
            height={24}
            alt="Summoner 2"
          ></Image>
        </div>
      </div>
    </div>
  );
}
export async function Runes({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var rune_primary_1_name = await get_rune_name_from_id(curret_player_match.runePrimary1);
  var rune_primary_3_name = await get_rune_name_from_id(curret_player_match.runePrimary2);
  var rune_primary_4_name = await get_rune_name_from_id(curret_player_match.runePrimary3);
  var rune_primary_2_name = await get_rune_name_from_id(curret_player_match.runePrimary4);
  var rune_secondary_1_name = await get_rune_name_from_id(curret_player_match.runeSecondary1);
  var rune_secondary_2_name = await get_rune_name_from_id(curret_player_match.runeSecondary2);
  var rune_stat_flex_name = await get_rune_name_from_id(curret_player_match.runeStatFlex);
  var rune_stat_defense_name = await get_rune_name_from_id(curret_player_match.runeStatdefense);
  var rune_stat_offense_name = await get_rune_name_from_id(curret_player_match.runeStatOffenes);
  if (!rune_primary_1_name) {
    return;
  }
  var rune_size = 24;
  var stat_size = 20;
  return (
    <div className="flex flex-col scale-90">
      <div className="flex flex-row gap-1">
        <Rune rune_name={rune_primary_1_name} size={rune_size}></Rune>
        <Rune rune_name={rune_primary_2_name} size={rune_size}></Rune>
        <Rune rune_name={rune_primary_3_name} size={rune_size}></Rune>
        <Rune rune_name={rune_primary_4_name} size={rune_size}></Rune>
      </div>
      <div className="flex flex-row">
        <Rune rune_name={rune_secondary_1_name} size={rune_size}></Rune>
        <Rune rune_name={rune_secondary_2_name} size={rune_size}></Rune>
        <Rune rune_name={rune_stat_flex_name} size={stat_size}></Rune>
        <Rune rune_name={rune_stat_defense_name} size={stat_size}></Rune>
        <Rune rune_name={rune_stat_offense_name} size={stat_size}></Rune>
      </div>
    </div>
  );
}
export function Rune({ rune_name, size }: { rune_name: string | null; size: number }) {
  var url: string | null = `https://raw.communitydragon.org/latest/game/assets/perks/${rune_name}`.toLowerCase();
  if (rune_name === null) {
    url = null;
  }

  return <Icon url={url} size={size} alt="Rune icon" classes={''}></Icon>;
}
export async function Augments({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var augment1_name = await get_augment_name_from_id(curret_player_match.playerAugment1);
  var augment2_name = await get_augment_name_from_id(curret_player_match.playerAugment2);
  var augment3_name = await get_augment_name_from_id(curret_player_match.playerAugment3);
  var augment4_name = await get_augment_name_from_id(curret_player_match.playerAugment4);
  if (!augment1_name) {
    return;
  }
  var size = 24;
  return (
    <div className="flex flex-row scale-90 gap-1 items-center">
      <Augment augment_name={augment1_name} size={size}></Augment>
      <Augment augment_name={augment2_name} size={size}></Augment>
      <Augment augment_name={augment3_name} size={size}></Augment>
      <Augment augment_name={augment4_name} size={size}></Augment>
    </div>
  );
}
function Augment({ augment_name, size }: { augment_name: string | null; size: number }) {
  var url: string | null =
    `https://raw.communitydragon.org/latest/game/assets/ux/cherry/augments/icons/${augment_name}`.toLowerCase();
  if (augment_name === null) {
    url = null;
  }
  return <Icon url={url} size={size} alt="Augment icon" classes={''}></Icon>;
}
export async function Items({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var item_0_name = await get_item_name_from_id(curret_player_match.item0);
  var item_1_name = await get_item_name_from_id(curret_player_match.item1);
  var item_2_name = await get_item_name_from_id(curret_player_match.item2);
  var item_3_name = await get_item_name_from_id(curret_player_match.item3);
  var item_4_name = await get_item_name_from_id(curret_player_match.item4);
  var item_5_name = await get_item_name_from_id(curret_player_match.item5);
  var item_6_name = await get_item_name_from_id(curret_player_match.item6);
  if (!item_0_name) {
    return;
  }
  var item_size = 24;
  return (
    <div className="flex flex-col scale-90">
      <div className="flex flex-row">
        <Item item_name={item_0_name} size={item_size}></Item>
        <Item item_name={item_1_name} size={item_size}></Item>
        <Item item_name={item_2_name} size={item_size}></Item>
        <Item item_name={item_6_name} size={item_size}></Item>
      </div>
      <div className="flex flex-row text-center whitespace-nowrap">
        <Item item_name={item_3_name} size={item_size}></Item>
        <Item item_name={item_4_name} size={item_size}></Item>
        <Item item_name={item_5_name} size={item_size}></Item>
      </div>
    </div>
  );
}
function Item({ item_name, size }: { item_name: string | null; size: number }) {
  var url: string | null =
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_name}`.toLowerCase();
  if (item_name === null) {
    url = null;
  }
  return <Icon url={url} size={size} alt="Item icon" classes={''}></Icon>;
}
export function Gold({
  curret_player_match,
  enemy_lane,
}: {
  curret_player_match: MatchPlayer;
  enemy_lane: MatchPlayer | null;
}) {
  return (
    <div className="flex flex-col justify-center text-center">
      <p title="Gold">{Math.floor(curret_player_match.goldEarned / 100) / 10}k gold</p>
      <p title="Gold advantage over enemey laner">
        {enemy_lane !== null
          ? `(${
              Math.floor(Math.floor(curret_player_match.goldEarned / 100) - Math.floor(enemy_lane.goldEarned / 100)) /
                10 >
              0
                ? '+'
                : ''
            }${
              Math.floor(Math.floor(curret_player_match.goldEarned / 100) - Math.floor(enemy_lane.goldEarned / 100)) /
              10
            }k)`
          : ''}
      </p>
    </div>
  );
}
export function CSVision({ curret_player_match, match }: { curret_player_match: MatchPlayer; match: Match }) {
  return (
    <div className="flex flex-col text-center justify-center">
      <p title="Vision score">
        {curret_player_match.totalMinionsKilled}
        cs(
        {Math.floor(curret_player_match.totalMinionsKilled / (match.gameDuration / 600)) / 10}
        cs/m)
      </p>
      <p title="Control wars places">
        {curret_player_match.visionScore} vision({curret_player_match.detectorWardsPlaced})
      </p>
    </div>
  );
}
export function Icon({
  url,
  size,
  alt,
  classes = '',
}: {
  url: string | null;
  size: number;
  alt: string;
  classes: string;
}) {
  if (url === null) {
    return <div style={{ width: size, height: size }}></div>;
  } else {
    return (
      <Image
        src={url}
        width={size}
        height={size}
        title={alt}
        alt={alt}
        className={`rounded-lg scale-110 ${classes} `}
      ></Image>
    );
  }
}
export function TeamSmall({ curret_player_match, match }: { curret_player_match: MatchPlayer; match: any }) {
  return (
    <div className="flex flex-col scale-90 justify-center">
      <TeamRow
        matchPlayers={match.matchPlayer.filter(
          (player_match: any) => player_match.teamId === curret_player_match.teamId
        )}
        curret_player_match={curret_player_match}
        match={match}
      ></TeamRow>
      <TeamRow
        matchPlayers={match.matchPlayer.filter(
          (player_match: any) => player_match.teamId !== curret_player_match.teamId
        )}
        curret_player_match={curret_player_match}
        match={match}
      ></TeamRow>
    </div>
  );
}
function TeamRow({
  matchPlayers,
  curret_player_match,
  match,
}: {
  matchPlayers: MatchPlayer[];
  curret_player_match: MatchPlayer;
  match: Match;
}) {
  return (
    <div className={`flex flex-row scale-110`}>
      {matchPlayers
        .sort(
          (player1, player2) =>
            TeamPostistions.indexOf(player1.teamPosition) - TeamPostistions.indexOf(player2.teamPosition)
        )
        .map((player_match) => (
          <div className="relative " key={player_match.puuid}>
            <a href={`/user/${PlatformIdToRegion[match.platformId.toLowerCase()]}/${player_match.summonerName}`}>
              <Icon
                url={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player_match.championId}.png`}
                size={24}
                alt={player_match.summonerName}
                classes={`rounded-lg  ${player_match.puuid === curret_player_match.puuid ? 'brightness-50' : ''}`}
              ></Icon>
              <div className="absolute bottom-0 left-1 ">
                <p className="text-base">{player_match.puuid === curret_player_match.puuid ? 'P' : ''}</p>
              </div>
            </a>
          </div>
        ))}
    </div>
  );
}
export function SmallMatch({
  match,
  curret_player_match,
  enemy_lane,
}: {
  match: Match;
  curret_player_match: MatchPlayer;
  enemy_lane: MatchPlayer | null;
}) {
  return (
    <div className={`grid grid-cols-[120px_600px_110px] auto-cols-min  rounded-sm`}>
      <Meta match={match} curret_player_match={curret_player_match}></Meta>
      <SmallPlayer curret_player_match={curret_player_match} match={match} enemy_lane={enemy_lane}></SmallPlayer>

      <TeamSmall curret_player_match={curret_player_match} match={match}></TeamSmall>
    </div>
  );
}
function SmallPlayer({
  match,
  curret_player_match,
  enemy_lane,
}: {
  match: Match;
  curret_player_match: MatchPlayer;
  enemy_lane: MatchPlayer | null;
}) {
  return (
    <div className="grid grid-cols-[80px_80px_100px_70px_110px] auto-cols-min ">
      <KDA match={match} curret_player_match={curret_player_match}></KDA>
      <Suspense fallback={<p>Summoner spells</p>}>
        {}
        <Champion curret_player_match={curret_player_match}></Champion>
      </Suspense>
      <Suspense fallback={<p>Items...</p>}>
        <Items curret_player_match={curret_player_match}></Items>
      </Suspense>
      {/* <Gold curret_player_match={curret_player_match} enemy_lane={enemy_lane}></Gold> */}
      <Suspense fallback={<p>Runes...</p>}>
        <Runes curret_player_match={curret_player_match}></Runes>
        <Augments curret_player_match={curret_player_match}></Augments>
      </Suspense>
      {/* <CSVision curret_player_match={curret_player_match} match={match}></CSVision> */}
    </div>
  );
}

export function LargeMatch({ match, curret_player_match }: { match: any; curret_player_match: MatchPlayer }) {
  return (
    <div id={`Large_${match.matchId}`} className={`hidden flex flex-col`}>
      {match.matchPlayer
        .filter((player_match: any) => player_match.teamId === curret_player_match.teamId)
        .map((player: MatchPlayer) => (
          <div
            key={player.puuid}
            className={`${player.win ? 'bg-green-800' : 'bg-red-800'} grid grid-cols-[120px_500px]`}
          >
            <div className="flex flex-col  justify-center whitespace-nowrap">
              <p>{player.summonerName}</p>
              <p>{player.summonerLevel}lvl</p>
            </div>
            <SmallPlayer
              key={player.puuid}
              curret_player_match={player}
              match={match}
              enemy_lane={
                match.matchPlayer.find(
                  (player2: MatchPlayer) =>
                    player2.teamPosition === curret_player_match.teamPosition && player2.puuid !== player.puuid
                ) || null
              }
            />
          </div>
        ))}
      {match.matchPlayer
        .filter((player_match: any) => player_match.teamId !== curret_player_match.teamId)
        .map((player: MatchPlayer) => (
          <div
            key={player.puuid}
            className={`${player.win ? 'bg-green-800' : 'bg-red-800'} grid grid-cols-[120px_500px]`}
          >
            <div className="flex flex-col justify-center items-center whitespace-nowrap">
              <p>{player.summonerName}</p>
              <p>{player.summonerLevel}lvl</p>
            </div>
            <SmallPlayer
              curret_player_match={player}
              match={match}
              enemy_lane={
                match.matchPlayer.find(
                  (player2: MatchPlayer) =>
                    player2.teamPosition === curret_player_match.teamPosition && player2.puuid !== player.puuid
                ) || null
              }
            />
          </div>
        ))}
    </div>
  );
}

//
