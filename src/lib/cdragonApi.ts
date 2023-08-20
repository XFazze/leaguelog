export async function get_champion_url_from_id(id: number): Promise<string | null> {
  return `${process.env.RAW_COMMUNITY_URL}plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`;
}

export async function get_summoner_icon_url_from_id(id: number): Promise<string | null> {
  return await get_cdragon_path(
    'summoner-spells',
    id,
    42,
    'plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/'
  );
}

export async function get_rune_url_from_id(id: number): Promise<string | null> {
  return await get_cdragon_path('perks', id, 37, 'game/assets/perks/');
}
export async function get_item_url_from_id(id: number): Promise<string | null> {
  return await get_cdragon_path('items', id, 43, 'plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/');
}

export async function get_augment_url_from_id(id: number | null): Promise<string | null> {
  if (id === null) {
    return null;
  }
  const response = await fetch(`${process.env.RAW_COMMUNITY_URL}cdragon/arena/en_us.json`);
  if (!response.ok) {
    return 'phenomenalevil_large.2v2_mode_fighters.png';
  }
  var augment_json: any = await response.json();
  var found = augment_json.augments.find((augment: { id: number }) => id === augment.id)!;
  if (!found) {
    return null;
  }
  return `${process.env.RAW_COMMUNITY_URL}game/assets/ux/cherry/augments/icons/${found.iconSmall.slice(
    32
  )}`.toLowerCase();
}

async function get_cdragon_path(
  type: string,
  id: number,
  slice_length: number,
  icon_url: string
): Promise<string | null> {
  const response = await fetch(
    `${process.env.RAW_COMMUNITY_URL}plugins/rcp-be-lol-game-data/global/default/v1/${type}.json`
  );
  if (!response.ok) {
    return null;
  }
  var json: any = await response.json();
  var found = json.find((a: { id: number }) => id === a.id)!;
  if (!found) {
    return null;
  } else {
    return `${process.env.RAW_COMMUNITY_URL}${icon_url}${found.iconPath.slice(slice_length).toLowerCase()}`;
  }
}
