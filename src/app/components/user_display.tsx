import { prestige_border } from '@/lib/game_constants';
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
            <img
              className="profile-pic-background"
              src="https://raw.communitydragon.org/latest/game/assets/loadouts/regalia/banners/banner_default.png"
              alt="profile-pic-background"
            />
            <img
              className="profile-pic"
              src={`${process.env.RAW_COMMUNITY_URL}${process.env.PATCH}/game/assets/ux/summonericons/profileicon${user.profileIconId}.png`}
              alt="profile-pic"
            />
            <img
              className="profile-pic-border"
              src={`${
                process.env.RAW_COMMUNITY_URL
              }/latest/game/assets/loadouts/regalia/crests/prestige/prestige_crest_lvl_${prestige_border(
                user.summonerLevel
              )}.png`}
              alt="profile-pic-border"
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
