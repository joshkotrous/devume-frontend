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

  useEffect(() => {
    console.log(skillList);
  }, [skillList]);

  return (
    <div className="h-[90vh] flex justify-center">
      <div className="h-full w-full flex max-w-[1024px]">
        <Card className="h-fit w-fit mr-4 py-4">
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
          <div className="flex w-full space-x-2 items-center justify-center flex-wrap mt-2 space-y-3">
            {skillList &&
              skillList.map((skill, index) => (
                <p
                  className="bg-white/20 text-center p-1 w-fit text-xs rounded-md"
                  key={index}
                >
                  {skill}
                </p>
              ))}
          </div>
        </Card>
        <div className="w-full flex-col h-full gap-2">
          <h2 className="mb-2 text-3xl font-bold">Work Experience</h2>
          <div className="flex-col space-y-4 h-full">
            <Card className="h-fit w-full py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex items-center">
                <Avatar></Avatar>
                <h3 className="text-2xl font-semibold ml-2">Apple</h3>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="flex-col space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xl">
                        Software Engineer
                      </h4>
                      <p>12/1-5/1</p>
                    </div>
                    <p>test descriptions</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xl">
                        Software Engineer
                      </h4>
                      <p>12/1-5/1</p>
                    </div>
                    <p>test descriptions</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="h-fit w-full py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex items-center">
                <Avatar></Avatar>
                <h3 className="text-2xl font-semibold ml-2">Apple</h3>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xl">Software Engineer</h4>
                  <p>12/1-5/1</p>
                </div>
                <p>test descriptions</p>
              </CardBody>
            </Card>
            <Card className="h-fit w-full py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex items-center">
                <Avatar></Avatar>
                <h3 className="text-2xl font-semibold ml-2">Apple</h3>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xl">Software Engineer</h4>
                  <p>12/1-5/1</p>
                </div>
                <p>test descriptions</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
