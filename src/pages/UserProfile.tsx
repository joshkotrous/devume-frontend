import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { GetProfile } from "../hooks/Profiles";
import { useEffect, useState } from "react";
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
  profile: {
    bio: string;
    birth_date: string;
    skills: Array<Skill>;
    location: string;
    link_1: string;
    link_2: string;
    link_3: string;
  };
}

const UserProfile = () => {
  const { uuid } = useParams();
  const [profileData, setProfileData] = useState<ProfileData>();
  const [skillList, setSkillList] = useState<Array<string>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCurrentUserProfile, setIsCurrentUserProfile] =
    useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [link1, setLink1] = useState<string>("");
  const [link2, setLink2] = useState<string>("");
  const [link3, setLink3] = useState<string>("");

  const getProfileData = async () => {
    const response = await GetProfile(String(uuid));
    setProfileData(response);
    setFirstName(response?.user.first_name!);
    setLastName(response?.user.last_name!);
    setBio(response?.profile.bio!);
    setLocation(response?.profile.location!);
    setLink1(response?.profile.link_1!);
    setLink2(response?.profile.link_2!);
    setLink3(response?.profile.link_3!);
    setSkillList(response.profile.skills);
    setIsLoaded(true);
  };

  useEffect(() => {
    getProfileData();
    if (uuid === localStorage.getItem("profileId")) {
      setIsCurrentUserProfile(true);
    }
  }, []);

  return (
    <div className="h-full md:flex justify-center">
      <div className="md:w-1/4 mr-4 space-y-4 w-full mb-4">
        <ProfileCard
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          bio={bio}
          setBio={setBio}
          location={location}
          setLocation={setLocation}
          link1={link1}
          setLink1={setLink1}
          link2={link2}
          setLink2={setLink2}
          link3={link3}
          setLink3={setLink3}
          isLoaded={isLoaded}
          skillList={skillList}
          setSkillList={setSkillList}
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
