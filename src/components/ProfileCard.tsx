import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Skeleton,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Dropdown,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdPhotos, IoIosLink, IoIosClose } from "react-icons/io";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { GetAllSkills } from "../hooks/Skills";

interface ProfileCardProps {
  isLoaded: boolean;
  skillList: any;
  setSkillList: React.Dispatch<React.SetStateAction<Array<string>>>;
  editMode: boolean;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  link1: string;
  setLink1: React.Dispatch<React.SetStateAction<string>>;
  link2: string;
  setLink2: React.Dispatch<React.SetStateAction<string>>;
  link3: string;
  setLink3: React.Dispatch<React.SetStateAction<string>>;
}

interface Skill {
  id: number;
  name: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  isLoaded,
  skillList,
  setSkillList,
  editMode,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  location,
  setLocation,
  link1,
  setLink1,
  link2,
  setLink2,
  link3,
  setLink3,
}) => {
  const [file, setFile] = useState();
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [allSkills, setAllSkills] = useState<Array<Skill>>([]);

  const handleChange = (event: any) => {
    if (event.target.name === "first_name") {
      setFirstName(event.target.value);
    }
    if (event.target.name === "last_name") {
      setLastName(event.target.value);
    }
    if (event.target.name === "bio") {
      setBio(event.target.value);
    }
    if (event.target.name === "location") {
      setLocation(event.target.value);
    }
    if (event.target.name === "link_1") {
      setLink1(event.target.value);
    }
    if (event.target.name === "link_2") {
      setLink2(event.target.value);
    }
    if (event.target.name === "link_3") {
      setLink3(event.target.value);
    }
    if (event.target.name === "file") {
      setFile(event.target.value);
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01, // Adjust this value to control the delay between each child's animation
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  function getBaseDomain(url: string) {
    try {
      let parsedUrl = new URL(url);
      let hostname = parsedUrl.hostname;

      return hostname;
    } catch (e) {
      console.error("Invalid URL:", e);
      return null;
    }
  }
  const showLink = (link: string) => {
    if (link.toLowerCase().includes("github")) {
      return (
        <div className="flex gap-3 items-center h-fit w-fit">
          <FaGithub className="scale-150" />
          Github
        </div>
      );
    } else if (link.toLowerCase().includes("twitter")) {
      return (
        <div className="flex gap-3 items-center h-fit w-fit">
          <FaXTwitter className="scale-150" />
          Twitter
        </div>
      );
    } else if (link.toLowerCase().includes("linkedin")) {
      return (
        <div className="flex gap-3 items-center h-fit w-fit">
          <FaLinkedin className="scale-150" />
          LinkedIn
        </div>
      );
    } else {
      return (
        <div className="flex gap-3 items-center h-fit w-fit">
          <IoIosLink className="scale-150" />
          {getBaseDomain(link.toLowerCase())}
        </div>
      );
    }
  };

  const removeSkill = (index: number) => {
    if (skillList) {
      const newSkillList = [...skillList]; // Create a copy of the array
      newSkillList.splice(index, 1); // Remove the element at the specified index
      setSkillList(newSkillList); // Update the state with the modified array
    }
  };

  const addSkill = (skill: string) => {
    // Create a new array by spreading the existing skillList and adding the new skill
    const newSkillList = [...skillList, skill];
    // Set the new skill list as the state variable
    setSkillList(newSkillList);
  };

  const handleSelect = (event: any) => {
    addSkill(allSkills[event].name);
  };

  const getAllSkills = async () => {
    const skills = await GetAllSkills();
    setAllSkills(skills);
    console.log(allSkills);
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  return (
    <Card className="h-fit px-4 py-2">
      <CardHeader className="pb-0 flex-col gap-4 w-full text-center mb-2">
        <Skeleton isLoaded={isLoaded} className="rounded-full">
          {editMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute flex bg-black/50 z-50 h-full w-full items-center"
            >
              <Popover
                placement="bottom"
                className="before:bg-neutral-900"
                showArrow={true}
              >
                <PopoverTrigger>
                  <Button disableAnimation className="bg-transparent w-full">
                    <IoMdPhotos className="z-60 m-auto hover:text-primary scale-[3]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-neutral-900">
                  <FileUploader
                    classes="bg-neutral-900"
                    multiple={false}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  />
                </PopoverContent>
              </Popover>
            </motion.div>
          )}
          <Image
            src="/IMG_4907.JPG"
            className="z-10 rounded-full border-black"
          />
        </Skeleton>
      </CardHeader>
      <CardBody className="p-1 mt-1 w-full space-y-1">
        {editMode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex gap-1"
          >
            <Input
              value={firstName}
              placeholder="First name"
              name="first_name"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <Input
              value={lastName}
              placeholder="Last name"
              name="last_name"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </motion.div>
        ) : (
          <Skeleton
            isLoaded={isLoaded}
            className={
              !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
            }
          >
            <div className="font-bold text-xl h-8 w-full">
              {firstName + " " + lastName}
            </div>
          </Skeleton>
        )}

        {editMode ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <Textarea
                value={bio}
                name="bio"
                onChange={(event) => {
                  handleChange(event);
                }}
                placeholder="Bio"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <Input
                value={location}
                placeholder="Location"
                name="location"
                onChange={(event) => {
                  handleChange(event);
                }}
              />
            </motion.div>
          </>
        ) : (
          <>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              <div
                className={
                  isLoaded ? "font-light h-fit mb-2 -mt-2" : "font-light h-10"
                }
              >
                {bio}
              </div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              <div
                className={
                  isLoaded
                    ? "font-light h-fit mb-4 flex items-center gap-2 ml-1"
                    : "font-light h-6"
                }
              >
                <IoLocationSharp className="scale-125" />
                {location}
              </div>
            </Skeleton>
          </>
        )}
        {editMode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="space-y-1"
          >
            <Input
              value={link1}
              name="link_1"
              onChange={(event) => {
                handleChange(event);
              }}
              placeholder="Link 1"
            />
            <Input
              value={link2}
              name="link_2"
              onChange={(event) => {
                handleChange(event);
              }}
              placeholder="Link 2"
            />
            <Input
              value={link3}
              name="link_3"
              onChange={(event) => {
                handleChange(event);
              }}
              placeholder="Link 3"
            />
          </motion.div>
        ) : (
          <>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              {isLoaded && link1 ? (
                <div className="mb-1 ml-1">
                  <Link className="text-sm" target="_blank" to={link1}>
                    {showLink(link1)}
                  </Link>
                </div>
              ) : null}
              {!isLoaded && <div className="w-full h-5"></div>}
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              {isLoaded && link2 ? (
                <div className="mb-1 ml-1">
                  <Link className="text-sm" target="_blank" to={link2}>
                    {showLink(link2)}
                  </Link>
                </div>
              ) : null}
              {!isLoaded && <div className="w-full h-5"></div>}
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className={
                !isLoaded ? "rounded-full" : "rounded-full overflow-visible"
              }
            >
              {isLoaded && link3 ? (
                <div className="mb-1 ml-1">
                  <Link className="text-sm" target="_blank" to={link3}>
                    {showLink(link3)}
                  </Link>
                </div>
              ) : null}
              {!isLoaded && <div className="w-full h-5"></div>}
            </Skeleton>
          </>
        )}
      </CardBody>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex space-x-2 items-center justify-center flex-wrap mt-2"
      >
        {skillList &&
          skillList.map((skill: any, index: number) => (
            <motion.div
              variants={childVariants}
              className="item bg-white/20 text-center p-1 w-fit h-6 text-xs rounded-md mb-2 flex overflow-hidden"
              key={index}
            >
              {skill}
              {editMode && (
                <div className="ml-1 flex items-center">
                  <IoIosClose
                    onClick={() => {
                      removeSkill(index);
                    }}
                    className="scale-150 hover:text-black"
                  />
                </div>
              )}
            </motion.div>
          ))}
        {!isLoaded && (
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
          <>
            <Autocomplete
              onSelectionChange={(event: any) => {
                handleSelect(event);
              }}
              popoverProps={{
                placement: "bottom",
                shouldFlip: false,
                classNames: {
                  content:
                    "h-[100px] w-[150px] rounded-xl overflow-hidden bg-neutral-800 text-white",
                },
              }}
              placeholder="+ Add Skill"
              className="scale-75 mb-1 w-[120px] h-9"
              aria-label="add skill"
            >
              {allSkills &&
                allSkills.map((skill: any, index: number) => (
                  <AutocompleteItem
                    textValue={skill.name}
                    key={index}
                    value={skill.name}
                  >
                    {skill.name}
                  </AutocompleteItem>
                ))}
            </Autocomplete>
          </>
        )}
      </motion.div>
    </Card>
  );
};

export default ProfileCard;
