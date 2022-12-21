import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,water.photography,coding";

const activeBtnStyles =
  " bg-red-500 text-white font-medium p-2 rounded-full w-20 outline-none ";

const notActiveBtnStyles =
  " bg-primary mr-4 text-black font-medium p-2  rounded-full w-20 outline-none ";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    // googleLogout();
    // navigate("/login");

    return <Spinner message="Loading Profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className=" flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-1/5 2xl:h-370 shadow-lg object-cover object-center	"
              alt="bannerImage"
            />
            <img
              className="rounded-full w-30 h-30  -m-12 shadow-xl object-center	 object-cover"
              src={user.image}
              alt="userImage"
            />
            <h1 className="font-bold text-3xl text-center mt-16">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 p-2 z-10 ">
              {userId === user._id && (
                <button
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md hover:shadow-lg"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <AiOutlineLogout color="red" fontSize={25} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center mb-7 mt-5">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>

            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-semibold items-center w-full text-xl mt-2">
              No, Pins Found !!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
