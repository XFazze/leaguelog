export async function get_summoner_name_from_id(id: string): Promise<string> {
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_PATCH}/data/en_US/summoner.json`)
    if (!response.ok) {
        return "SummonerBarrier.png"
    }
    var summoners_json: any = await response.json()
    for (let key in summoners_json['data']) {
        if (summoners_json['data'][key]['key'] === id) {
            return summoners_json['data'][key]['image']['full']
        }
    }
    return "SummonerBarrier.png"
}

export async function get_rune_name_from_id(id: number): Promise<string | null> {
    const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json`)
    if (!response.ok) {
        return "Inspiration/FirstStrike/FirstStrike.png"
    }
    var runes_json: any = await response.json()
    var found = runes_json.find((rune: { id: number }) => id === rune.id)!;
    if (!found) {
        return null
    }
    return found.iconPath.slice(37)
}

export async function get_item_name_from_id(id: number): Promise<string | null> {
    const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json`)
    if (!response.ok) {
        return "1001_Class_T1_BootsofSpeed.png"
    }
    var items_json: any = await response.json()
    var found = items_json.find((item: { id: number }) => id === item.id)!;
    if (!found) {
        return null
    }
    return found.iconPath.slice(43)
}
export async function get_augment_name_from_id(id: number): Promise<string | null> {
    const response = await fetch(`https://raw.communitydragon.org/latest/cdragon/arena/en_us.json`)
    if (!response.ok) {
        return "phenomenalevil_large.2v2_mode_fighters.png"
    }
    var augment_json: any = await response.json()
    var found = augment_json.augments.find((augment: { id: number }) => id === augment.id)!;
    if (!found) {
        return null
    }
    return found.iconSmall.slice(32)
}