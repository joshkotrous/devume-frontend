import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Input,
  DatePicker,
  Textarea,
} from "@nextui-org/react";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { CalendarDate } from "@internationalized/date";
import ModalPopup from "../components/ModalPopup";
import { AnimatePresence } from "framer-motion";
interface Position {
  job_title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}

interface ExperienceProps {
  id?: number;
  organization?: string;
  positions?: Position[];
  deleteExperience: () => void;
  editMode?: boolean;
  experienceType?: string;
}

const Experience: React.FC<ExperienceProps> = ({
  organization,
  positions,
  deleteExperience,
  editMode,
  experienceType,
  id,
}) => {
  const [editExperience, setEditExperience] = useState<boolean>(false);
  const [editOrganization, setEditOrganization] = useState<string>();
  const [editJobTitle, setEditJobTitle] = useState<string>();
  const [editStartDate, setEditStartDate] = useState<CalendarDate | null>();
  const [editEndDate, setEditEndDate] = useState<CalendarDate>();
  const [editDescription, setEditDescription] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    if (positions![0].start_date) {
      const startDate = new Date(positions![0].start_date!);
      setEditStartDate(
        new CalendarDate(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDay()
        )
      );
    } else {
      setEditStartDate(null);
    }

    if (positions![0].end_date) {
      const endDate = new Date(positions![0].end_date!);

      setEditEndDate(
        new CalendarDate(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDay()
        )
      );
    } else {
      setEditStartDate(null);
    }

    setEditOrganization(organization);
    setEditJobTitle(positions![0].job_title);

    setEditDescription(positions![0].description);
  }, []);

  const cancelDelete = () => {
    if (showModal) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (!editMode) {
      setEditExperience(false);
    }
  }, [editMode]);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <ModalPopup
            message="Are you sure you want to delete this experience?"
            deleteText="Delete"
            deleteFunction={() => {
              deleteExperience();
              setShowModal(false);
            }}
            cancelFunction={cancelDelete}
          />
        )}
      </AnimatePresence>

      <Card className="h-fit w-full py-4">
        <CardHeader
          className={`pb-0 ${
            !editExperience && !editMode ? "pt-1" : "pt-4"
          } w-full flex items-center relative z-40`}
        >
          <Avatar></Avatar>
          {!(editExperience && editMode) ? (
            <h3 className="text-2xl font-semibold ml-2">{organization}</h3>
          ) : (
            <Input
              className="ml-2"
              placeholder={`${
                experienceType === "education" ? "School" : "Organization"
              }`}
              value={editOrganization}
            ></Input>
          )}
        </CardHeader>
        {editMode && (
          <div className="text-sm absolute right-4 top-2 p-0 flex gap-2 z-50">
            {!editExperience && (
              <FaPencil
                className="cursor-pointer"
                onClick={() => {
                  setEditExperience(true);
                }}
              />
            )}
            <FaTrashAlt
              className="text-red-700 cursor-pointer"
              onClick={() => {
                if (!showModal) {
                  setShowModal(true);
                }
              }}
            />
          </div>
        )}

        <CardBody className="overflow-visible py-1">
          <div className="flex-col space-y-1 w-full flex">
            {!(editExperience && editMode) &&
              positions &&
              positions.map((item: Position, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-xl">{item.job_title}</h4>
                    <p>
                      {item.start_date} - {item.end_date}
                    </p>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            {editMode && editExperience && (
              <>
                <Input placeholder="Job Title" value={editJobTitle}></Input>
                <div className="flex gap-1 text-left">
                  <DatePicker
                    calendarProps={{ className: "dark" }}
                    label="Start Date"
                    value={editStartDate}
                    onChange={(event: any) => {
                      console.log(event);
                      // setStartDate(
                      //   new CalendarDate(event.year, event.month, event.day)
                      // );
                    }}
                  />
                  <DatePicker
                    calendarProps={{ className: "dark" }}
                    label="End Date"
                    value={editEndDate}
                    onChange={(event: any) => {
                      console.log(event);
                      // setEndDate(
                      //   new CalendarDate(event.year, event.month, event.day)
                      // );
                    }}
                  />
                </div>
                <Textarea
                  minRows={6}
                  className=""
                  placeholder="Description"
                  value={editDescription}
                  onChange={(event: any) => {
                    // setDescription(event?.target.value);
                  }}
                />
                <Button
                  color="primary"
                  onClick={() => {
                    setEditExperience(false);
                  }}
                >
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Experience;
