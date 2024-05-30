import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input, DatePicker, Textarea } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
const WorkExperienceInput = () => {
  const [organization, setOrganization] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [startDate, setStartDate] = useState<CalendarDate>();
  const [endDate, setEndDate] = useState<CalendarDate>();
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

      <Button className="w-full" color="primary">
        Save
      </Button>
    </motion.div>
  );
};

export default WorkExperienceInput;
