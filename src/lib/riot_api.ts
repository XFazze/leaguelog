import { User } from "./models";
import { RegionNames } from "./game_constants";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

export type UserResponse = {
    id: string,
    accountId: number,
    puuid: number,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
}
export async function get_user_by_username(region: string = '', username: string = ''): Promise<UserResponse> {
    if (!region || !username) {
        throw Error("Regrion or username does not exist.")
    }
    const region_format = Object.keys(RegionNames)[Object.values(RegionNames).indexOf(region)]
    const url = `${region_format}.${process.env.RIOT_URL}summoner/v4/summoners/by-name/${username}`
    return await request_riot(url);
}
async function request_riot(url: string, params: { [name: string]: any } = {}) {
    params['api_key'] = process.env.RIOT_KEY
    const response = await fetch("https://" + url + "?" + new URLSearchParams(params), { next: { revalidate: 10 }, cache: "no-store" })
    // console.log("FORMAT URL", "https://" + url + "?" + new URLSearchParams(params))
    if (!response.ok) {
        if (response.status == 403) {

            throw new Error(`Request_riot failed with status code ${response.status}. Riot api key is probably at fault.`);
        } {
            throw new Error(`Request_riot failed with status code ${response.status}`);
        }
    }

    return await response.json()
}
