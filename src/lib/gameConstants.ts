export enum RegionNames {
    EUW = <any>"euw1",
    EUNE = <any>"eun1",
    BR = <any>"br1",
    JP = <any>"jp1",
    LA = <any>"la1",
    LA2 = <any>"la2",
    NA = <any>"na1",
    OC = <any>"oc1",
    TR = <any>"tri1",
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
export var LargeRegionsConverter: Record<string, string> = {
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