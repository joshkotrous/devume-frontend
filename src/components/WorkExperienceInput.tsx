import React, { useState, useEffect, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Button, Input, DatePicker, Textarea } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { WorkExperienceData } from "../hooks/WorkExperience";

interface WorkExperienceInputProps {
  workExperiences: WorkExperienceData[];
  setWorkExperiences: React.Dispatch<
    React.SetStateAction<WorkExperienceData[]>
  >;
}

const WorkExperienceInput: React.FC<WorkExperienceInputProps> = ({
  setWorkExperiences,
  workExperiences,
}) => {
  const [organization, setOrganization] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [startDate, setStartDate] = useState<CalendarDate | null>();
  const [endDate, setEndDate] = useState<CalendarDate | null>();
  const [description, setDescription] = useState<string>();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }} // Initial position (hidden)
      animate={{ opacity: 1, height: "auto" }} // Animation when becoming visible
      exit={{ opacity: 0, height: 0 }} // Animation when becoming hidden
      transition={{ duration: 0.25 }} // Animation duration
      style={{ overflow: "hidden" }} // Hide overflowing content
      className="space-y-2 bg-[rgb(21,21,21)] p-2 rounded-2xl"
    >
      <div className="space-y-1">
        <Input
          value={organization}
          placeholder="Organization"
          onChange={(event: any) => {
            setOrganization(event.target.value);
          }}
        />
        <Input
          value={title}
          onChange={(event: any) => {
            setTitle(event.target.value);
          }}
          placeholder="Title"
        />
        <div className="flex gap-1 text-left">
          <DatePicker
            calendarProps={{ className: "dark" }}
            label="Start Date"
            value={startDate!}
            onChange={(event: any) => {
              console.log(event);
              setStartDate(
                new CalendarDate(event.year, event.month, event.day)
              );
            }}
          />
          <DatePicker
            calendarProps={{ className: "dark" }}
            label="End Date"
            value={endDate!}
            onChange={(event: any) => {
              console.log(event);
              setEndDate(new CalendarDate(event.year, event.month, event.day));
            }}
          />
        </div>
        <Textarea
          minRows={6}
          className=""
          placeholder="Description"
          value={description}
          onChange={(event: any) => {
            setDescription(event?.target.value);
          }}
        />
      </div>

      <Button
        className="w-full"
        color="primary"
        onClick={() => {
          const workExperience: WorkExperienceData = {
            company: organization!,
            description: description!,
            job_title: title!,
            start_date: String(startDate!),
            end_date: String(endDate!),
          };
          setWorkExperiences((workExperiences) => [
            ...workExperiences,
            workExperience,
          ]);
          setOrganization("");
          setTitle("");
          setDescription("");
          setStartDate(null);
          setEndDate(null);
        }}
      >
        Save
      </Button>
    </motion.div>
  );
};

export default WorkExperienceInput;
