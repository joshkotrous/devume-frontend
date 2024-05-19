import React from "react";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <div className="w-full flex-col h-fit gap-2">
      <h2 className="mb-2 text-3xl font-bold">{title}</h2>
      <div className="flex-col space-y-4 h-fit">
        {children}
        {/* <Card className="h-fit w-full py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex items-center">
            <Avatar></Avatar>
            <h3 className="text-2xl font-semibold ml-2">Apple</h3>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="flex-col space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xl">Software Engineer</h4>
                  <p>12/1-5/1</p>
                </div>
                <p>test descriptions</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xl">Software Engineer</h4>
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
        </Card> */}
      </div>
    </div>
  );
};

export default ProfileSection;
