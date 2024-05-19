import React from "react";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";

interface Position {
  job_title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}

interface ExperienceProps {
  organization?: string;
  positions?: Position[];
}

const Experience: React.FC<ExperienceProps> = ({ organization, positions }) => {
  return (
    <Card className="h-fit w-full py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex items-center">
        <Avatar></Avatar>
        <h3 className="text-2xl font-semibold ml-2">{organization}</h3>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex-col space-y-2">
          {positions &&
            positions.map((item: Position) => (
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xl">{item.job_title}</h4>
                  <p>
                    {item.start_date} - {item.end_date}
                  </p>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Experience;
