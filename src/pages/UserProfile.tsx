import { useParams } from "react-router-dom";
import {
  Button,
  Input,
  DatePicker,
  Textarea,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/react";
import { GetProfile } from "../hooks/Profiles";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileSection from "../components/ProfileSection";
import Experience from "../components/Experience";
import { GetWorkExperience, WorkExperienceData } from "../hooks/WorkExperience";
import { motion, AnimatePresence } from "framer-motion";
import { GetDegrees } from "../hooks/Degress";
import { GetEducation, EducationData } from "../hooks/Education";
interface Skill {
  id: number;
  name: string;
}
interface ProfileData {
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
  profile: {
    bio: string;
    birth_date: string;
    skills: Array<Skill>;
    location: string;
    link_1: string;
    link_2: string;
    link_3: string;
  };
}

const UserProfile = () => {
  const { uuid } = useParams();
  const [profileData, setProfileData] = useState<ProfileData>();
  const [workExperienceData, setWorkExperienceData] =
    useState<WorkExperienceData[]>();
  const [educationData, setEducationData] = useState<EducationData[]>();
  const [skillList, setSkillList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCurrentUserProfile, setIsCurrentUserProfile] =
    useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [link1, setLink1] = useState<string>("");
  const [link2, setLink2] = useState<string>("");
  const [link3, setLink3] = useState<string>("");
  const [degrees, setDegrees] = useState<string[]>([]);
  const [showAddWorkExperience, setShowAddWorkExperience] =
    useState<boolean>(false);
  const [showAddEducation, setShowAddEducation] = useState<boolean>(false);

  const getDegrees = async () => {
    const response = await GetDegrees();
    setDegrees(response);
    console.log(degrees);
  };

  const getProfileData = async () => {
    const response = await GetProfile(String(uuid));
    setProfileData(response);
    setFirstName(response?.user.first_name!);
    setLastName(response?.user.last_name!);
    setBio(response?.profile.bio!);
    setLocation(response?.profile.location!);
    setLink1(response?.profile.link_1!);
    setLink2(response?.profile.link_2!);
    setLink3(response?.profile.link_3!);
    if (Array.isArray(response.profile.skills)) {
      setSkillList(response.profile.skills);
    }
    const workexperienceResponse = await GetWorkExperience(String(uuid));
    setWorkExperienceData(workexperienceResponse);
    const educationResponse = await GetEducation(String(uuid));
    setEducationData(educationResponse);
    setIsLoaded(true);
  };

  useEffect(() => {
    getProfileData();
    getDegrees();

    if (uuid === localStorage.getItem("profileId")) {
      setIsCurrentUserProfile(true);
    }
  }, []);

  useEffect(() => {
    console.log(degrees);
  }, [degrees]);

  return (
    <div className="h-full md:flex justify-center">
      <div className="md:w-1/4 mr-4 space-y-2 w-full mb-4">
        <ProfileCard
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          bio={bio}
          setBio={setBio}
          location={location}
          setLocation={setLocation}
          link1={link1}
          setLink1={setLink1}
          link2={link2}
          setLink2={setLink2}
          link3={link3}
          setLink3={setLink3}
          isLoaded={isLoaded}
          skillList={skillList}
          setSkillList={setSkillList}
          editMode={editMode}
        />
        {isCurrentUserProfile && (
          <>
            <Button
              color={!editMode ? "default" : "primary"}
              className="w-full"
              onClick={() => {
                if (editMode) {
                  setEditMode(false);
                } else {
                  setEditMode(true);
                }
              }}
            >
              {!editMode ? "Edit Profile" : "Save Changes"}
            </Button>
            {editMode && (
              <p
                className="text-center text-red-500 cursor-pointer"
                onClick={() => {}}
              >
                Discard Changes
              </p>
            )}
          </>
        )}
      </div>

      <div className="w-full flex-col space-y-10 overflow-auto pb-20">
        <ProfileSection title="Work Experience">
          <AnimatePresence>
            {editMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1 }}
                className="w-full text-center space-y-1"
              >
                <div
                  className="mb-4 cursor-pointer w-fit m-auto"
                  onClick={() => {
                    if (showAddWorkExperience) {
                      setShowAddWorkExperience(false);
                    } else {
                      setShowAddWorkExperience(true);
                    }
                  }}
                >
                  + Add Work Experience
                </div>
                <AnimatePresence>
                  {showAddWorkExperience && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} // Initial position (hidden)
                      animate={{ opacity: 1, height: "auto" }} // Animation when becoming visible
                      exit={{ opacity: 0, height: 0 }} // Animation when becoming hidden
                      transition={{ duration: 0.25 }} // Animation duration
                      style={{ overflow: "hidden" }} // Hide overflowing content
                      className="space-y-2"
                    >
                      <div className="space-y-1">
                        <Input placeholder="Organization"></Input>
                        <Input placeholder="Title"></Input>
                        <div className="flex gap-1 text-left">
                          <DatePicker
                            calendarProps={{ className: "dark" }}
                            label="Start Date"
                          ></DatePicker>
                          <DatePicker
                            calendarProps={{ className: "dark" }}
                            label="End Date"
                          ></DatePicker>
                        </div>
                        <Textarea
                          minRows={6}
                          className=""
                          placeholder="Description"
                        ></Textarea>
                      </div>

                      <Button className="w-full" color="primary">
                        Save
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {workExperienceData &&
            workExperienceData.map(
              (item: WorkExperienceData, index: number) => (
                <Experience
                  organization={item.company}
                  positions={[
                    {
                      job_title: item.job_title,
                      description: item.description,
                      start_date: item.start_date,
                      end_date: item.end_date,
                    },
                  ]}
                  key={index}
                />
              )
            )}
        </ProfileSection>
        <ProfileSection title="Education">
          <AnimatePresence>
            {editMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1 }}
                className="w-full text-center space-y-1"
              >
                <div
                  className="mb-4 cursor-pointer w-fit m-auto"
                  onClick={() => {
                    if (showAddEducation) {
                      setShowAddEducation(false);
                    } else {
                      setShowAddEducation(true);
                    }
                  }}
                >
                  + Add Education
                </div>
                <AnimatePresence>
                  {showAddEducation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} // Initial position (hidden)
                      animate={{ opacity: 1, height: "auto" }} // Animation when becoming visible
                      exit={{ opacity: 0, height: 0 }} // Animation when becoming hidden
                      transition={{ duration: 0.25 }} // Animation duration
                      style={{ overflow: "hidden" }} // Hide overflowing content
                      className="space-y-2"
                    >
                      <div className="space-y-1">
                        <Input placeholder="School"></Input>
                        <div className="flex gap-1">
                          <Input placeholder="Field of Study"></Input>
                          <Autocomplete
                            onSelectionChange={(event: any) => {}}
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
                            {degrees &&
                              degrees.map((degree: any, index: number) => (
                                <AutocompleteItem
                                  textValue={degree}
                                  key={index}
                                  value={degree}
                                >
                                  {degree}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete>
                        </div>

                        <div className="flex gap-1 text-left">
                          <DatePicker
                            calendarProps={{ className: "dark" }}
                            label="Start Date"
                          ></DatePicker>
                          <DatePicker
                            calendarProps={{ className: "dark" }}
                            label="End Date"
                          ></DatePicker>
                        </div>
                        <Textarea
                          minRows={6}
                          className=""
                          placeholder="Description"
                        ></Textarea>
                      </div>

                      <Button className="w-full" color="primary">
                        Save
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          {educationData &&
            educationData.map((item: EducationData) => (
              <Experience
                organization={item.school_name}
                positions={[
                  {
                    job_title: item.field_of_study,
                    description: item.degree,
                  },
                ]}
              />
            ))}
        </ProfileSection>
      </div>
    </div>
  );
};

export default UserProfile;
