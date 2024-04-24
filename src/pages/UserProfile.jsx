import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import { GetProfile } from "../hooks/Profiles";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState({});

  const getProfileData = async () => {
    const response = await GetProfile("dada9c9f-1a6b-4c5e-9e5d-20ec613a13bb");
    setProfileData(response);
  };
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="h-[90vh] max-w-[1024px] flex justify-center">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Avatar />
          <h2>{username}</h2>
          <p>{profileData.bio}</p>
          <p>{profileData.birth_date}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2"></CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
