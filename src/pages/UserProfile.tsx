import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";
import { GetProfile } from "../hooks/Profiles";
import { useEffect, useState } from "react";
import { getSkill } from "../hooks/Skills";
interface Skill {
  id: number;
  name: string;
}
interface ProfileData {
  user: {
    first_name: string;
    last_name: string;
  };
  profile: { bio: string; birth_date: string; skills: Array<Skill> };
}

const UserProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<ProfileData>({
    user: { first_name: "", last_name: "" },
    profile: { bio: "", birth_date: "", skills: [] },
  });
  const [skillList, setSkillList] = useState<Array<string>>();

  const getSkillNames = async () => {
    let skillArray: Array<string> = [];
    console.log(profileData.profile);
    for (const skill of profileData.profile.skills) {
      const response = await getSkill(skill.id);
      if (response.name) {
        skillArray.push(response.name);
      }
    }
    setSkillList(skillArray);
  };

  const getProfileData = async () => {
    const response = await GetProfile("dada9c9f-1a6b-4c5e-9e5d-20ec613a13bb");
    setProfileData(response);
    // await getSkillNames();
    // console.log(skillList);
    let skillArray: Array<string> = [];
    for (const skill of response.profile.skills) {
      const response = await getSkill(skill);
      if (response.name) {
        skillArray.push(response.name);
      }
    }
    setSkillList(skillArray);
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="h-[90vh] flex justify-center">
      <div className="h-full w-full flex max-w-[1024px]">
        <Card className="h-fit w-1/3 mr-4 py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <Avatar className="mb-2 self-center" />
            <Button className="mb-2 self-center">Edit Profile</Button>
            {profileData.user && profileData.profile ? (
              <>
                <p>
                  {profileData.user.first_name +
                    " " +
                    profileData.user.last_name}
                </p>
                <h2>{username}</h2>
                <p>{profileData.profile.bio}</p>
                <p>{profileData.profile.birth_date}</p>
              </>
            ) : null}
          </CardHeader>
          <CardBody className="">
            <div className="flex justify-between">
              {skillList &&
                skillList.map((skill, index) => (
                  <p className="bg-white/20 text-center w-fit p-1" key={index}>
                    {skill}
                  </p>
                ))}
            </div>
          </CardBody>
        </Card>
        <Card className="h-full w-full py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
          <CardBody className="overflow-visible py-2"></CardBody>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
