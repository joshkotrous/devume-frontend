import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { GetAllProfiles } from "../hooks/Profiles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

interface Profile {
  bio: string;
  uuid: string;
  user: {
    username: string;
    first_name: string;
    last_name: string;
  };
}

const ExploreProfiles = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>();
  const [filteredData, setFilteredData] = useState<Array<Profile>>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigateTo = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "search") {
      setSearchQuery(value);
      if (searchQuery != "" && searchQuery != null && searchQuery != " ") {
        const filtered = profiles?.filter(
          (item) =>
            item.user.username
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.user.first_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.user.last_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (item.user.first_name + " " + item.user.last_name)
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(profiles);
      }
    }
  };
  const getProfiles = async () => {
    try {
      const data = await GetAllProfiles();
      setProfiles(data);
      setFilteredData(data);
      console.log(profiles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <>
      <div className="w-fit mb-4 overflow-auto">
        <Input
          label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <IoSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          name="search"
          value={searchQuery}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="h-fit flex flex-wrap gap-4 justify-center ">
        {filteredData &&
          filteredData.map((profile: Profile, index: number) => {
            return (
              <Card
                isPressable
                onClick={() => {
                  navigateTo("/" + profile.uuid);
                }}
                key={index}
                className="w-40 h-40 text-left pb-4 -space-y-4"
              >
                <CardHeader className="flex-col items-start">
                  <span className="font-bold">
                    {profile.user.first_name} {profile.user.last_name}
                  </span>
                  <div>{profile.user.username}</div>
                </CardHeader>
                <CardBody className="text-sm font-light overflow-hidden">
                  {profile.bio}
                </CardBody>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default ExploreProfiles;
