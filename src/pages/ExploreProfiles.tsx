import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { GetAllProfiles } from "../hooks/Profiles";
import { useEffect } from "react";

interface Profile {
  name: string;
  username: string;
  bio: string;
  uuid: string;
}

const ExploreProfiles = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>();

  const getProfiles = async () => {
    try {
      const data = await GetAllProfiles();
      setProfiles(data);
      console.log(profiles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <div className="h-full flex justify-center">
      <div className="h-fit flex flex-wrap gap-4 max-w-[1024px] justify-center overflow-auto">
        {profiles &&
          profiles.map((profile: Profile, index: number) => {
            return (
              <Card key={index} className="w-40 h-40">
                <CardHeader>{profile.uuid}</CardHeader>
                <CardBody>{profile.bio}</CardBody>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default ExploreProfiles;
