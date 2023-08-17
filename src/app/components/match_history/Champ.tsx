import { get_rune_name_from_id, get_summoner_name_from_id, get_item_name_from_id } from '@/lib/ddragonApi';
import { MatchPlayer } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function Champ({ player_match }: { player_match: MatchPlayer }) {
  var summoner_1_name = await get_summoner_name_from_id(player_match.summoner1Id.toString());
  var summone_2_name = await get_summoner_name_from_id(player_match.summoner2Id.toString());

  return (
    <div className="flex flex-row text-center items-center justify-center gap-2  ">
      <div className="flex flex-row">
        <div className="overflow-hidden relative">
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player_match.championId}.png`}
            width={48}
            height={48}
            alt="Champion icon"
            className="rounded-lg scale-110"
          ></Image>
          <div className="absolute bottom-0 left-0 opacity-80 bg-black pr-1 ">
            <p className="drop-shadow opacity-100">{player_match.champLevel}</p>
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
      <Suspense fallback={<p>Runes...</p>}>
        {/* @ts-expect-error Server Component */}
        <Runes player_match={player_match}></Runes>
      </Suspense>
      <Suspense fallback={<p>Runes...</p>}>
        {/* @ts-expect-error Server Component */}
        <Items player_match={player_match}></Items>
      </Suspense>
    </div>
  );
}
export async function Runes({ player_match }: { player_match: MatchPlayer }) {
  var rune_primary_1_name = await get_rune_name_from_id(player_match.runePrimary1);
  var rune_primary_3_name = await get_rune_name_from_id(player_match.runePrimary2);
  var rune_primary_4_name = await get_rune_name_from_id(player_match.runePrimary3);
  var rune_primary_2_name = await get_rune_name_from_id(player_match.runePrimary4);
  var rune_secondary_1_name = await get_rune_name_from_id(player_match.runeSecondary1);
  var rune_secondary_2_name = await get_rune_name_from_id(player_match.runeSecondary2);
  var rune_stat_flex_name = await get_rune_name_from_id(player_match.runeStatFlex);
  var rune_stat_defense_name = await get_rune_name_from_id(player_match.runeStatdefense);
  var rune_stat_offense_name = await get_rune_name_from_id(player_match.runeStatOffenes);
  if (!rune_primary_1_name) {
    return;
  }
  var rune_size = 24;
  var x = 4;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-1">
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_primary_1_name}`.toLowerCase()}
          width={rune_size}
          height={rune_size}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_primary_2_name}`.toLowerCase()}
          width={rune_size}
          height={rune_size}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_primary_3_name}`.toLowerCase()}
          width={rune_size}
          height={rune_size}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_primary_4_name}`.toLowerCase()}
          width={rune_size}
          height={rune_size}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
      </div>
      <div className="flex flex-row">
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_secondary_1_name}`.toLowerCase()}
          width={rune_size}
          height={rune_size}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_secondary_2_name}`.toLowerCase()}
          width={rune_size}
          height={rune_size}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>

        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_stat_flex_name}`.toLowerCase()}
          width={rune_size - x}
          height={rune_size - x}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_stat_defense_name}`.toLowerCase()}
          width={rune_size - x}
          height={rune_size - x}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/game/assets/perks/${rune_stat_offense_name}`.toLowerCase()}
          width={rune_size - x}
          height={rune_size - x}
          alt="Rune icon"
          className="rounded-lg scale-110"
        ></Image>
      </div>
    </div>
  );
}
export async function Items({ player_match }: { player_match: MatchPlayer }) {
  var item_0_name = await get_item_name_from_id(player_match.item0);
  var item_1_name = await get_item_name_from_id(player_match.item1);
  var item_2_name = await get_item_name_from_id(player_match.item2);
  var item_3_name = await get_item_name_from_id(player_match.item3);
  var item_4_name = await get_item_name_from_id(player_match.item4);
  var item_5_name = await get_item_name_from_id(player_match.item5);
  var item_6_name = await get_item_name_from_id(player_match.item6);
  if (!item_0_name) {
    console.log('No items');
    return;
  }
  var item_size = 24;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_0_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_1_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_2_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_3_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_6_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
      </div>
      <div className="flex flex-row text-center whitespace-nowrap">
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_4_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
        <Image
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item_5_name}`.toLowerCase()}
          width={item_size}
          height={item_size}
          alt="Item icon"
          className="rounded-lg scale-110"
        ></Image>
        <p className="flex items-center  text-sm mr-1 ml-1">{Math.floor(player_match.goldEarned / 100) / 10}k gold</p>
      </div>
    </div>
  );
}
