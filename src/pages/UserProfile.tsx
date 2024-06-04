import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import {
  GetProfile,
  UpdateProfile,
  ProfileData,
  UpdateProfileData,
} from "../hooks/Profiles";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileSection from "../components/ProfileSection";
import Experience from "../components/Experience";
import {
  GetWorkExperience,
  WorkExperienceData,
  CreateWorkExperience,
  DeleteWorkExperience,
} from "../hooks/WorkExperience";
import { motion, AnimatePresence } from "framer-motion";
import { GetDegrees } from "../hooks/Degress";
import {
  GetEducation,
  CreateEducation,
  EducationData,
  DeleteEducation,
} from "../hooks/Education";
import { UpdateUser, UserData } from "../hooks/Users";
import WorkExperienceInput from "../components/WorkExperienceInput";
import EducationInput from "../components/EducationInput";
import ModalPopup from "../components/ModalPopup";
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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [newWorkExperiences, setNewWorkExperiences] = useState<
    WorkExperienceData[]
  >([]);
  const [newEducation, setNewEducation] = useState<EducationData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const getDegrees = async () => {
    const response = await GetDegrees();
    setDegrees(response);
  };

  const updateUser = async () => {
    const userData: UserData = {
      id: profileData?.user.id!,
      first_name: firstName,
      last_name: lastName,
      email: profileData?.user.email!,
      username: profileData?.user.username!,
    };
    try {
      const response = await UpdateUser(userData, profileData?.user.id!);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    const updateProfileData: UpdateProfileData = {
      uuid: profileData?.profile.uuid!,
      bio: bio,
      skills: skillList,
      link_1: link1,
      link_2: link2,
      link_3: link3,
      location: location,
    };
    try {
      const response = await UpdateProfile(
        updateProfileData,
        profileData?.profile.uuid!
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const saveProfileChanges = async () => {
    setIsSaving(true);
    await updateUser();
    await updateProfile();

    setShowAddEducation(false);
    setShowAddWorkExperience(false);
    for (const item of newWorkExperiences) {
      const response = await CreateWorkExperience(item);
      console.log(response);
    }
    for (const item of newEducation) {
      const response = await CreateEducation(item);
      console.log(response);
    }
    getProfileData();
    setNewWorkExperiences([]);
    setNewEducation([]);
    setIsSaving(false);
    setEditMode(false);
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

  const deleteEducation = async (experienceId: number, arrayIndex: number) => {
    const response = await DeleteEducation(experienceId);
    const array = educationData
      ?.splice(0, arrayIndex)
      .concat(educationData.slice(arrayIndex + 1));
    setEducationData(array);
  };

  const deleteNewEducation = (arrayIndex: number) => {
    const array = newEducation
      ?.splice(0, arrayIndex)
      .concat(newEducation.slice(arrayIndex + 1));
    setNewEducation(array);
  };

  const deleteWorkExperience = async (
    experienceId: number,
    arrayIndex: number
  ) => {
    const response = await DeleteWorkExperience(experienceId);
    const array = workExperienceData
      ?.splice(0, arrayIndex)
      .concat(workExperienceData.slice(arrayIndex + 1));
    setWorkExperienceData(array);
    console.log(response);
  };

  const deleteNewWorkExperience = (arrayIndex: number) => {
    const array = newWorkExperiences
      ?.splice(0, arrayIndex)
      .concat(newWorkExperiences.slice(arrayIndex + 1));
    setNewWorkExperiences(array);
  };

  const discardChanges = () => {
    setEditMode(false);
    setShowAddEducation(false);
    setShowAddWorkExperience(false);
    getProfileData();
    setNewWorkExperiences([]);
    setNewEducation([]);
  };

  useEffect(() => {
    getProfileData();
    getDegrees();

    if (uuid === localStorage.getItem("profileId")) {
      setIsCurrentUserProfile(true);
    }
  }, []);

  return (
    <div className="md:flex justify-center">
      <AnimatePresence>
        {showModal && (
          <ModalPopup
            message="Are you sure you want to discard changes?"
            deleteText="Discard Changes"
            deleteFunction={() => {
              discardChanges();
              setShowModal(false);
            }}
            cancelFunction={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
      <div className="md:w-1/4 mr-4 space-y-2 w-full overflow-auto">
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
              isLoading={isSaving}
              color={!editMode ? "default" : "primary"}
              className="w-full"
              onClick={() => {
                if (editMode) {
                  saveProfileChanges();
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
                onClick={() => {
                  setShowModal(true);
                }}
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
                  {showAddWorkExperience ? (
                    <span className="text-red-600">Cancel</span>
                  ) : (
                    "+ Add Work Experience"
                  )}
                </div>
                <AnimatePresence>
                  {showAddWorkExperience && (
                    <WorkExperienceInput
                      workExperiences={newWorkExperiences!}
                      setWorkExperiences={setNewWorkExperiences}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {workExperienceData &&
            workExperienceData.map(
              (item: WorkExperienceData, index: number) => (
                <Experience
                  deleteExperience={() => {
                    deleteWorkExperience(item.id!, index);
                  }}
                  editMode={editMode}
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
                  id={item.id}
                />
              )
            )}
          {newWorkExperiences &&
            newWorkExperiences.map(
              (item: WorkExperienceData, index: number) => (
                <Experience
                  deleteExperience={() => {
                    deleteNewWorkExperience(index);
                  }}
                  editMode={editMode}
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
                  id={item.id}
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
                  {showAddEducation ? (
                    <span className="text-red-600">Cancel</span>
                  ) : (
                    "+ Add Education"
                  )}
                </div>
                <AnimatePresence>
                  {showAddEducation && (
                    <EducationInput
                      newEducation={newEducation}
                      setNewEducation={setNewEducation}
                      degrees={degrees}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          {educationData &&
            educationData.map((item: EducationData, index: number) => (
              <Experience
                deleteExperience={() => deleteEducation(item.id!, index)}
                editMode={editMode}
                organization={item.school_name}
                positions={[
                  {
                    job_title: item.field_of_study,
                    description: item.degree,
                  },
                ]}
                key={index}
                id={item.id}
              />
            ))}
          {newEducation &&
            newEducation.map((item: EducationData, index: number) => (
              <Experience
                deleteExperience={() => deleteNewEducation(index)}
                editMode={editMode}
                organization={item.school_name}
                positions={[
                  {
                    job_title: item.field_of_study,
                    description: item.degree,
                  },
                ]}
                key={index}
                id={item.id}
              />
            ))}
        </ProfileSection>
      </div>
    </div>
  );
};

export default UserProfile;
