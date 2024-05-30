import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Textarea,
  Button,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { EducationData } from "../hooks/Education";
interface EducationInputProps {
  degrees?: string[];
  newEducation: EducationData[];
  setNewEducation: React.Dispatch<React.SetStateAction<EducationData[]>>;
}

const EducationInput: React.FC<EducationInputProps> = ({
  degrees,
  newEducation,
  setNewEducation,
}) => {
  const [school, setSchool] = useState<string>();
  const [field, setField] = useState<string>();
  const [startDate, setStartDate] = useState<CalendarDate | null>();
  const [endDate, setEndDate] = useState<CalendarDate | null>();
  const [description, setDescription] = useState<string>();
  const [degree, setDegree] = useState<string>();

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
          value={school}
          placeholder="School"
          onChange={(event: any) => {
            setSchool(event.target.value);
          }}
        />
        <div className="flex gap-1">
          <Input
            value={field}
            onChange={(event: any) => {
              setField(event.target.value);
            }}
            placeholder="Field of Study"
          />
          <Autocomplete
            onSelectionChange={(event: any) => {
              setDegree(degrees![event]);
            }}
            popoverProps={{
              placement: "bottom",
              shouldFlip: false,
              classNames: {
                content:
                  "h-[125px] w-[150px] rounded-xl overflow-hidden bg-neutral-800 text-white",
              },
            }}
            placeholder="Degree Level"
            className="relative "
            aria-label="degree level"
          >
            {degrees! &&
              degrees.map((degree: any, index: number) => (
                <AutocompleteItem textValue={degree} key={index} value={degree}>
                  {degree}
                </AutocompleteItem>
              ))}
          </Autocomplete>
        </div>

        <div className="flex gap-1 text-left">
          <DatePicker
            value={startDate}
            onChange={(event: any) => {
              setStartDate(
                new CalendarDate(event.year, event.month, event.day)
              );
            }}
            calendarProps={{ className: "dark" }}
            label="Start Date"
          />
          <DatePicker
            value={endDate}
            onChange={(event: any) => {
              setEndDate(new CalendarDate(event.year, event.month, event.day));
            }}
            calendarProps={{ className: "dark" }}
            label="End Date"
          />
        </div>
        <Textarea
          value={description}
          onChange={(event: any) => {
            setDescription(event.target.value);
          }}
          minRows={6}
          className=""
          placeholder="Description"
        />
      </div>

      <Button
        className="w-full"
        color="primary"
        onClick={() => {
          const education: EducationData = {
            school_name: school!,
            start_date: String(startDate!),
            end_date: String(endDate!),
            description: description!,
            degree: degree!,
            field_of_study: field!,
          };
          setNewEducation((newEducation) => [...newEducation, education]);
          setSchool("");
          setStartDate(null);
          setEndDate(null);
          setField("");
          setDegree("");
          setDescription("");
        }}
      >
        Save
      </Button>
    </motion.div>
  );
};

export default EducationInput;
