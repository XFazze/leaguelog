export const RegionNames: Record<string, string> = {
    EUW: "euw1",
    EUNE: "eun1",
    BR: "br1",
    JP: "jp1",
    LA: "la1",
    LA2: "la2",
    NA: "na1",
    OC: "oc1",
    TR: "tri1",
}
export function prestige_border(level: number) {
    // var level = level % 25;
    var level_stage: string = pad(level - level % 25, 3)
    if (level_stage == "000") {
        level_stage = "001"
    } else if (level_stage == "175") {
        level_stage = "175.lvl_borderfix"
    }
    return level_stage
}

function pad(num: number, size: number): string {
    var number: string = num.toString();
    while (number.length < size) number = "0" + number;
    return number;
}
export const LargeRegionsConverter: Record<string, string> = {
    EUNE: "europe",
    EUW: "europe",
    BR: "americas",
    JP: "asia",
    LA: "americas",
    LA2: "americas",
    NA: "americas",
    OC: "europe",
    TR: "europe"
}

export const QueueTypeConverter: Record<string, string> = {
    400: "Draft",
    420: "Solo",
    430: "Blind",
    440: "Flex",
    450: "ARAM",
    700: "Clash",
    720: "CLash ARAM",
    830: "Intro bots",
    840: "Beginner bots",
    850: "Intermediate bots",
    900: "ARURF",
    1020: "One for all",
    1090: "TFT",
    1100: "Ranked TFT",
    1110: "Tutorial TFT",
    1400: "Ultimate Spellbook",
    1700: "Arena",

}

