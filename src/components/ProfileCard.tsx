import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Skeleton,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  isLoaded: boolean;
  profileData: any;
  skillList: any;
  editMode: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  isLoaded,
  profileData,
  skillList,
  editMode,
}) => {
  return (
    <Card className="h-fit px-4 py-2">
      <CardHeader className="pb-0 flex-col gap-4 text-cente w-full text-center mb-2">
        <Skeleton isLoaded={isLoaded} className="rounded-full">
          <Image src="/IMG_4907.JPG" className="rounded-full " />
        </Skeleton>
        {/* <Button className="mb-2 m-auto">Edit Profile</Button> */}
      </CardHeader>
      <CardBody className="p-1 mt-1 w-full space-y-1">
        {editMode ? (
          <div className="flex gap-2">
            <Input
              value={profileData?.user.first_name}
              placeholder="First name"
            />
            <Input
              value={profileData?.user.last_name}
              placeholder="First name"
            />
          </div>
        ) : (
          <Skeleton isLoaded={isLoaded} className="rounded-full">
            <div className="font-bold text-xl h-8 w-full">
              {profileData &&
                profileData?.user.first_name +
                  " " +
                  profileData?.user.last_name}
            </div>
          </Skeleton>
        )}

        {editMode ? (
          <Textarea value={profileData?.profile.bio} placeholder="Bio" />
        ) : (
          <Skeleton
            isLoaded={isLoaded}
            className={
              !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
            }
          >
            <div
              className={
                isLoaded ? "font-light h-fit mb-1" : "font-light h-10 mb-1"
              }
            >
              {profileData ? profileData?.profile.bio : "placeholder"}
            </div>
          </Skeleton>
        )}
        {editMode ? (
          <>
            <Input value={"https://github.com"} placeholder="Link" />
            <Input value={"https://twitter.com"} placeholder="Link" />
          </>
        ) : (
          <>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              <Link className="text-sm" to="">
                🔗 Github
              </Link>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              <Link className="text-sm" to="">
                🔗 Twitter
              </Link>
            </Skeleton>
          </>
        )}
      </CardBody>

      <div className="w-full flex space-x-2 items-center justify-center flex-wrap mt-2">
        {skillList ? (
          skillList.map((skill: any, index: number) => (
            <div
              className="bg-white/20 text-center p-1 w-fit text-xs rounded-md mb-2 "
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
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
              <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
              <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="rounded-lg mb-2">
              <div className="bg-white/20 text-center p-1 text-xs rounded-md mb-2 h-4 w-12"></div>
            </Skeleton>
          </>
        )}
        {editMode && (
          <Input
            className="scale-75 mb-1 w-2/3"
            placeholder="+ Add Skill"
          ></Input>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
