import { PlatformIdToRegion, QueueTypeConverter } from '@/lib/gameConstants';
import {
  get_champion_url_from_id,
  get_summoner_icon_url_from_id,
  get_rune_url_from_id,
  get_item_url_from_id,
  get_augment_url_from_id,
} from '@/lib/cdragonApi';
import { TeamPostistions } from '@/lib/gameConstants';
import { Match, MatchPlayer } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';
import SuspenseFallback from './SuspenseFallback';

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
    <div className="flex flex-row text-center justify-center divide-x divide-slate-400/25 [&>*]:flex [&>*]:flex-col [&>*]:justify-center">
      <div className=" w-14">
        <p title="Gamemode">{QueueTypeConverter[match.queueId]}</p>
        {/* <p>Avg rank</p> */}
      </div>
      <div className="w-16 ">
        <p title="Time since creation">{format_date(match.gameCreation)}</p>
      </div>
      <div className="w-12 ">
        <p title="Match length">{Math.floor(match.gameDuration / 6) / 10}m</p>
      </div>
    </div>
  );
}

export function KDA({ match, curret_player_match }: { match: Match; curret_player_match: MatchPlayer }) {
  return (
    <div className="flex flex-col  text-center justify-center w-14">
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
  var champion_url = await get_champion_url_from_id(curret_player_match.championId);
  var summoner_1_url = await get_summoner_icon_url_from_id(curret_player_match.summoner1Id);
  var summoner_2_url = await get_summoner_icon_url_from_id(curret_player_match.summoner2Id);

  var size = 24;
  return (
    <div className="flex w-24 ">
      <div className="flex flex-row rounded-s-md">
        <div className="overflow-hidden relative">
          <Icon url={champion_url} size={48} alt="Champion icon" classes=" scale-110"></Icon>

          <div title="Level" className="absolute bottom-0 left-0 opacity-80 bg-black pr-1 ">
            <p className="drop-shadow opacity-100">{curret_player_match.champLevel}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Icon url={summoner_1_url} size={size} alt="Summoner icon" classes={''}></Icon>
          <Icon url={summoner_2_url} size={size} alt="Summoner icon" classes={''}></Icon>
        </div>
      </div>
    </div>
  );
}

export async function Items({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var item_0_url = await get_item_url_from_id(curret_player_match.item0);
  var item_1_url = await get_item_url_from_id(curret_player_match.item1);
  var item_2_url = await get_item_url_from_id(curret_player_match.item2);
  var item_3_url = await get_item_url_from_id(curret_player_match.item3);
  var item_4_url = await get_item_url_from_id(curret_player_match.item4);
  var item_5_url = await get_item_url_from_id(curret_player_match.item5);
  var item_6_url = await get_item_url_from_id(curret_player_match.item6);
  if (!item_0_url) {
    return <div className="flex flex-col  w-28 "></div>;
  }
  var size = 24;
  return (
    <div className="flex flex-col  w-28 ">
      <div className="flex flex-col  scale-90 flex-start ">
        <div className="flex flex-row">
          <Icon url={item_0_url} size={size} alt={'Item icon'} classes={''}></Icon>
          <Icon url={item_1_url} size={size} alt={'Item icon'} classes={''}></Icon>
          <Icon url={item_2_url} size={size} alt={'Item icon'} classes={''}></Icon>
          <Icon url={item_6_url} size={size} alt={'Item icon'} classes={''}></Icon>
        </div>
        <div className="flex flex-row text-center whitespace-nowrap items-start">
          <Icon url={item_3_url} size={size} alt={'Item icon'} classes={''}></Icon>
          <Icon url={item_4_url} size={size} alt={'Item icon'} classes={''}></Icon>
          <Icon url={item_5_url} size={size} alt={'Item icon'} classes={''}></Icon>
        </div>
      </div>
    </div>
  );
}

export async function Runes({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var rune_primary_1_url = await get_rune_url_from_id(curret_player_match.runePrimary1);
  if (!rune_primary_1_url) {
    return;
  }
  var rune_primary_2_url = await get_rune_url_from_id(curret_player_match.runePrimary2);
  var rune_primary_3_url = await get_rune_url_from_id(curret_player_match.runePrimary3);
  var rune_primary_4_url = await get_rune_url_from_id(curret_player_match.runePrimary4);
  var rune_secondary_1_url = await get_rune_url_from_id(curret_player_match.runeSecondary1);
  var rune_secondary_2_url = await get_rune_url_from_id(curret_player_match.runeSecondary2);
  var rune_stat_flex_url = await get_rune_url_from_id(curret_player_match.runeStatFlex);
  var rune_stat_defense_url = await get_rune_url_from_id(curret_player_match.runeStatdefense);
  var rune_stat_offense_url = await get_rune_url_from_id(curret_player_match.runeStatOffenes);
  var rune_size = 24;
  var stat_size = 20;
  return (
    <div className="flex flex-col scale-90 w-32 ">
      <div className="flex flex-row gap-1">
        <Icon url={rune_primary_1_url} size={rune_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_primary_2_url} size={rune_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_primary_3_url} size={rune_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_primary_4_url} size={rune_size} alt={'Rune icon'} classes={''}></Icon>
      </div>
      <div className="flex flex-row">
        <Icon url={rune_secondary_2_url} size={rune_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_secondary_1_url} size={rune_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_stat_flex_url} size={stat_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_stat_defense_url} size={stat_size} alt={'Rune icon'} classes={''}></Icon>
        <Icon url={rune_stat_offense_url} size={stat_size} alt={'Rune icon'} classes={''}></Icon>
      </div>
    </div>
  );
}

export async function Augments({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  var augment1_url = await get_augment_url_from_id(curret_player_match.playerAugment1);
  if (!augment1_url) {
    return;
  }
  var augment2_url = await get_augment_url_from_id(curret_player_match.playerAugment2);
  var augment3_url = await get_augment_url_from_id(curret_player_match.playerAugment3);
  var augment4_url = await get_augment_url_from_id(curret_player_match.playerAugment4);
  var size = 24;
  return (
    <div className="flex flex-row scale-90 gap-1 w-32">
      <Icon url={augment1_url} size={size} alt="Augment icon" classes={''}></Icon>
      <Icon url={augment2_url} size={size} alt="Augment icon" classes={''}></Icon>
      <Icon url={augment3_url} size={size} alt="Augment icon" classes={''}></Icon>
      <Icon url={augment4_url} size={size} alt="Augment icon" classes={''}></Icon>
    </div>
  );
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
          ? `${
              Math.floor(Math.floor(curret_player_match.goldEarned / 100) - Math.floor(enemy_lane.goldEarned / 100)) /
                10 >
              0
                ? '+'
                : ''
            }${
              Math.floor(Math.floor(curret_player_match.goldEarned / 100) - Math.floor(enemy_lane.goldEarned / 100)) /
              10
            }k`
          : ''}
      </p>
    </div>
  );
}

export function Dmg({ curret_player_match, team }: { curret_player_match: MatchPlayer; team: MatchPlayer[] }) {
  return (
    <div className="flex flex-col justify-center text-center">
      <p title="Dmg">{Math.floor(curret_player_match.totalDamageDealtToChampions / 100) / 10}k dmg</p>
      <p title="Dmg advantage over enemey laner">
        {`${Math.floor(
          (100 * Math.floor(curret_player_match.totalDamageDealtToChampions)) /
            Math.floor(team.reduce((n, { totalDamageDealtToChampions }) => n + totalDamageDealtToChampions, 0))
        )}%`}
      </p>
    </div>
  );
}

export function Cs({ curret_player_match }: { curret_player_match: MatchPlayer }) {
  return (
    <div className="flex flex-col text-center justify-center w-12">
      <p title="Vision score">{curret_player_match.totalMinionsKilled}cs</p>
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

export function TeamSmall({ curret_player_match, match }: { curret_player_match: MatchPlayer; match: any }) {
  return (
    <div className={`w-36`}>
      <div className="flex flex-col justify-center items-center">
        <TeamRow
          matchPlayers={match.matchPlayer.slice(0, 5)}
          curret_player_match={curret_player_match}
          match={match}
        ></TeamRow>
        <TeamRow
          matchPlayers={match.matchPlayer.slice(5, 10)}
          curret_player_match={curret_player_match}
          match={match}
        ></TeamRow>
      </div>
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
    <div className={``}>
      <div className={`flex flex-row justify-center items-center`}>
        {matchPlayers.map((player_match) => (
          <div className="relative scale-90" key={player_match.puuid}>
            <a href={`/user/${PlatformIdToRegion[match.platformId.toLowerCase()]}/${player_match.summonerName}`}>
              <Icon
                url={`${process.env.RAW_COMMUNITY_URL}plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player_match.championId}.png`}
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
    <div className="flex flex-row  child [&>*]:justify-center [&>*]:items-center [&>*]:text-center divide-x divide-slate-400/25">
      <KDA match={match} curret_player_match={curret_player_match}></KDA>
      <Cs curret_player_match={curret_player_match} />
      <Suspense fallback={<SuspenseFallback text={'Champion'} width={'w-24'} />}>
        <Champion curret_player_match={curret_player_match}></Champion>
      </Suspense>
      <Suspense fallback={<SuspenseFallback text={'Items'} width={'w-28'} />}>
        <Items curret_player_match={curret_player_match}></Items>
      </Suspense>
      {/* <Gold curret_player_match={curret_player_match} enemy_lane={enemy_lane}></Gold> */}
      <Suspense fallback={<SuspenseFallback text={'Runes'} width={'w-32'} />}>
        <Runes curret_player_match={curret_player_match}></Runes>
        <Augments curret_player_match={curret_player_match}></Augments>
      </Suspense>
    </div>
  );
}

export function OtherSummoner({ player }: { player: any }) {
  return (
    <div className={'flex flex-col justify-center items-center whitespace-nowrap w-28'}>
      <p>{player.summonerName}</p>
      <p>{player.summonerLevel}lvl</p>
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
  var background_color = curret_player_match.win ? 'bg-green-800' : 'bg-red-800';
  return (
    <div className={`flex flex-row `}>
      <div className={`${background_color} w-2`}></div>
      <div className={`flex flex-row  divide-x divide-slate-400/25`}>
        <Meta match={match} curret_player_match={curret_player_match}></Meta>
        <SmallPlayer curret_player_match={curret_player_match} match={match} enemy_lane={enemy_lane}></SmallPlayer>

        <TeamSmall curret_player_match={curret_player_match} match={match}></TeamSmall>
      </div>
    </div>
  );
}

export function LargeMatch({ match, curret_player_match }: { match: any; curret_player_match: MatchPlayer }) {
  return (
    <div id={`Large_${match.matchId}`} className={`hidden flex flex-col items-center justify-center `}>
      {match.matchPlayer.map((player: MatchPlayer) => (
        <div key={player.puuid} className={`flex flex-row  backdrop-brightness-75 `}>
          <div className={` w-2 ${player.win ? 'bg-green-800' : 'bg-red-800'}`}></div>
          <div className={` flex flex-row divide-x divide-slate-400/25`}>
            <OtherSummoner player={player} />
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
            <div className="w-20">
              <Gold
                curret_player_match={player}
                enemy_lane={
                  match.matchPlayer.find(
                    (player2: MatchPlayer) =>
                      player2.teamPosition === curret_player_match.teamPosition && player2.puuid !== player.puuid
                  ) || null
                }
              ></Gold>
            </div>
            <div className="w-20">
              <Dmg
                curret_player_match={player}
                team={match.matchPlayer.filter((player2: MatchPlayer) => player2.teamId !== player.teamId) || null}
              ></Dmg>
            </div>
          </div>
        </div>
      ))}
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
