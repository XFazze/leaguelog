import { prestige_border } from '@/lib/gameConstants';
import Image from 'next/image';
export default function UserDisplay(props: any) {
  const user = props.user;
  return (
    <div className="flex flex-col content-center p-2">
      <div>
        <h1 className="text-xl">{user.name}</h1>
      </div>
      <div className=" center w-28 ">
        <div className="relative h-32">
          <Image
            className="absolute z-10 scale-50"
            src={`${process.env.RAW_COMMUNITY_URL}${process.env.PATCH}/game/assets/ux/summonericons/profileicon${user.profileIconId}.png`}
            alt="profile-pic"
            width={160}
            height={160}
          />
          <Image
            className="absolute z-10 scale-125 "
            src={`${
              process.env.RAW_COMMUNITY_URL
            }/latest/game/assets/loadouts/regalia/crests/prestige/prestige_crest_lvl_${prestige_border(
              user.summonerLevel
            )}.png`}
            alt="profile-pic-border"
            width={368}
            height={368}
          />
        </div>
        <div className="w-full text-center top-">
          <p className="">{user.summonerLevel}</p>
        </div>
      </div>
    </div>
  );
}
