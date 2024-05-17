import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Image,
  Skeleton,
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
  const [profileData, setProfileData] = useState<ProfileData>();
  const [skillList, setSkillList] = useState<Array<string>>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const getSkillNames = async () => {
    let skillArray: Array<string> = [];
    console.log(profileData?.profile);
    for (const skill of profileData?.profile.skills!) {
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
    setIsLoaded(true);
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
          <Skeleton isLoaded={isLoaded} className="rounded-full">
            <Image src="/IMG_4907.JPG" className="rounded-full " />
          </Skeleton>
          {/* <Button className="mb-2 m-auto">Edit Profile</Button> */}
        </CardHeader>
        <CardBody className="p-1 mt-1 w-full space-y-1">
          <Skeleton isLoaded={isLoaded} className="rounded-full">
            <div className="font-bold text-xl h-8 w-full">
              {profileData &&
                profileData?.user.first_name +
                  " " +
                  profileData?.user.last_name}
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={isLoaded}
            className={
              !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
            }
          >
            <div className="text-lg h-5 content-center overflow-visible">
              {profileData && profileData?.user.username}
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={isLoaded}
            className={
              !isLoaded
                ? "mt-2 rounded-full"
                : "mt-2 rounded-full overflow-visible"
            }
          >
            <div className="font-light h-10">
              {profileData ? profileData?.profile.bio : "placeholder"}
            </div>
          </Skeleton>
          {/* <p>{profileData.profile.birth_date}</p> */}
          <Link className="text-sm mt-2" to="">
            🔗 Github
          </Link>
          <Link className="text-sm mb-1" to="">
            🔗 Twitter
          </Link>
        </CardBody>

        <div className="w-full flex space-x-2 items-center justify-center flex-wrap mt-2">
          {skillList ? (
            skillList.map((skill, index) => (
              <div
                className="bg-white/20 text-center p-1 w-fit text-xs rounded-md mb-2"
                key={index}
              >
                {skill}
              </div>
            ))
          ) : (
            <>
              <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
                <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
                <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
              </Skeleton>{" "}
              <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
                <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
              </Skeleton>{" "}
              <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
                <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
                <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
              </Skeleton>
            </>
          )}
        </div>
      </Card>
      <div className="w-full flex-col space-y-10 overflow-auto pb-20">
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
