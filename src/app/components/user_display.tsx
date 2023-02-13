import { prestige_border } from '@/lib/game_constants';
import Image from 'next/image';
export default function UserDisplay(props: any) {
  const user = props.user;
  return (
    <div className="flex-col">
      <div>
        <h1>{user.name}</h1>
      </div>
      <div className="flex-row center">
        <div>
          <div className="profile-pic-parent">
            <Image
              className="profile-pic-background"
              src="https://raw.communitydragon.org/latest/game/assets/loadouts/regalia/banners/banner_default.png"
              alt="profile-pic-background"
              width={352}
              height={300}
            />
            <Image
              className="profile-pic"
              src={`${process.env.RAW_COMMUNITY_URL}${process.env.PATCH}/game/assets/ux/summonericons/profileicon${user.profileIconId}.png`}
              alt="profile-pic"
              width={160}
              height={160}
            />
            <Image
              className="profile-pic-border"
              src={`${
                process.env.RAW_COMMUNITY_URL
              }/latest/game/assets/loadouts/regalia/crests/prestige/prestige_crest_lvl_${prestige_border(
                user.summonerLevel
              )}.png`}
              alt="profile-pic-border"
              width={368}
              height={368}
            />
            <div className="profile-pic-text">
              <p>{user.summonerLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
