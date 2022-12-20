import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/jpeg" ||
      type === "image/svg" ||
      type === "image/png" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && category && imageAsset?._id) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        category,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
      };

      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          {" "}
          Please fill in all the fields.
        </p>
      )}

      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full ">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex cursor-pointer justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong Image Type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex cursor-pointer flex-col items-center justify-center h-full ">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to Upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high quality JPG, SVG, PNG, GIF, etc. less then 20 MB.
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className=" w-0 h-0 cursor-pointer"
                />
              </label>
            ) : (
              <div className="relative h-full ">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" Add your title here"
            className="border-2 border-gray-300 p-3 outline-none focus:border-gray-400 transition-all duration-150 ease-in-out"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                alt=""
                className=" w-10 shadow-md h-10 rounded-full"
              />
              <p className="font-semibold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your image about?"
            className="border-2 border-gray-300 p-3 outline-none focus:border-gray-400 transition-all duration-150 ease-in-out"
          />

          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="border-2 border-gray-300 p-3 outline-none focus:border-gray-400 transition-all duration-150 ease-in-out"
          />

          <div className="flex flex-col">
            <div>
              <p className=" font-semibold pb-3">Choose Pin Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="border-2 border-gray-300 p-3 outline-none focus:border-gray-400  text-gray-400 focus:text-gray-600 transition-all duration-150 cursor-pointer ease-in-out w-full"
              >
                <option value="other" className="bg-white h-4 capitalize">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    className=" text-base bottom-0 outline-none capitalize bg-white text-black-600 "
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-semibold p-3 px-4 rounded-full w-28 outline-none shadow-sm hover:shadow-md transition-all duration-500 ease-in-out"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
