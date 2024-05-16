import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Image,
} from "@nextui-org/react";
import { GetProfile } from "../hooks/Profiles";
import { useEffect, useState } from "react";
import { getSkill } from "../hooks/Skills";
import { Link } from "react-router-dom";
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
  const [profileData, setProfileData] = useState<ProfileData>({
    user: { first_name: "", last_name: "", username: "" },
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
    const response = await GetProfile(String(uuid));
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
    <div className="h-full flex justify-center">
      <Card className="h-fit w-1/4 mr-4 p-4">
        <CardHeader className="pb-0 flex-col gap-4 text-cente w-full text-center mb-2">
          <Image src="/IMG_4907.JPG" className="rounded-full " />
          {/* <Button className="mb-2 m-auto">Edit Profile</Button> */}
        </CardHeader>
        <CardBody className="w-fit p-1 mt-1">
          {profileData.user && profileData.profile ? (
            <>
              <p className="font-bold text-xl">
                {profileData.user.first_name + " " + profileData.user.last_name}
              </p>
              <h2 className="text-lg">{profileData.user.username}</h2>
              <p className="mt-2 font-light">{profileData.profile.bio}</p>
              {/* <p>{profileData.profile.birth_date}</p> */}
              <Link className="text-sm mt-2" to="">
                🔗 Github
              </Link>
              <Link className="text-sm mb-1" to="">
                🔗 Twitter
              </Link>
            </>
          ) : null}
        </CardBody>

        <div className="w-full flex space-x-2 items-center justify-center flex-wrap mt-2">
          {skillList &&
            skillList.map((skill, index) => (
              <p
                className="bg-white/20 text-center p-1 w-fit text-xs rounded-md mb-2"
                key={index}
              >
                {skill}
              </p>
            ))}
        </div>
      </Card>
      <div className="w-full flex-col space-y-10 overflow-auto">
        <div className="w-full flex-col h-fit gap-2">
          <h2 className="mb-2 text-3xl font-bold">Work Experience</h2>
          <div className="flex-col space-y-4 h-fit">
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
        <div className="w-full flex-col h-fit gap-2">
          <h2 className="mb-2 text-3xl font-bold">Education</h2>
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
