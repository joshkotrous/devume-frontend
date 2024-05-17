import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { GetProfile } from "../hooks/Profiles";
import { useEffect, useState } from "react";
import { getSkill } from "../hooks/Skills";
import ProfileCard from "../components/ProfileCard";
import ProfileSection from "../components/ProfileSection";
interface Skill {
  id: number;
  name: string;
}
interface ProfileData {
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
  profile: { bio: string; birth_date: string; skills: Array<Skill> };
}

const UserProfile = () => {
  const { uuid } = useParams();
  const [profileData, setProfileData] = useState<ProfileData>();
  const [skillList, setSkillList] = useState<Array<string>>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCurrentUserProfile, setIsCurrentUserProfile] =
    useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const getProfileData = async () => {
    const response = await GetProfile(String(uuid));
    setProfileData(response);

    let skillArray: Array<string> = [];
    if (response.profile.skills.length > 0) {
      for (const skill of response.profile.skills) {
        const response = await getSkill(skill);
        if (response.name) {
          skillArray.push(response.name);
        }
      }
    }

    setSkillList(skillArray);
    setIsLoaded(true);
  };

  useEffect(() => {
    getProfileData();
    if (uuid === localStorage.getItem("profileId")) {
      setIsCurrentUserProfile(true);
    }
  }, []);

  useEffect(() => {
    console.log(skillList);
  }, [skillList]);

  return (
    <div className="h-full flex justify-center">
      <div className="w-1/4  mr-4 space-y-4">
        <ProfileCard
          isLoaded={isLoaded}
          profileData={profileData}
          skillList={skillList}
          editMode={editMode}
        />
        {isCurrentUserProfile && (
          <Button
            color={!editMode ? "default" : "primary"}
            className="w-full"
            onClick={() => {
              if (editMode) {
                setEditMode(false);
              } else {
                setEditMode(true);
              }
            }}
          >
            {!editMode ? "Edit Profile" : "Save Changes"}
          </Button>
        )}
      </div>

      <div className="w-full flex-col space-y-10 overflow-auto pb-20">
        <ProfileSection title="Work Experience" />
        <ProfileSection title="Education" />
      </div>
    </div>
  );
};

export default UserProfile;
