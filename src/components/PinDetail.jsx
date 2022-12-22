import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
          window.location.reload();
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return (
    <>
      <div
        className="flex xl:flex-col flex-col m-auto bg-white sm:p-8 lg:p-11"
        style={{ maxWidth: "1500px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="user-post"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className=" flex  gap-4 flex-wrap items-center justify-between">
            <div>
              <Link
                to={`/user-profile/${pinDetail.postedBy?._id}`}
                className="flex gap-2 items-center bg-white rounded-lg"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={pinDetail.postedBy?.image}
                  alt="user-profile"
                />
                <p className="font-medium capitalize text-dark ">
                  {pinDetail.postedBy?.userName}
                </p>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4  ">
              <div className="flex gap-2 items-center justify-between">
                <a
                  href={`${pinDetail.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-full flex gap-3 px-5 py-2 items-center justify-center text-l opacity-75 hover:opacity-100 hover:shadow-md text-dark hover:text-white hover:bg-black focus:outline-none transition-all duration-500 ease-in-out "
                >
                  <MdDownloadForOffline /> Download
                </a>
              </div>

              <div>
                <a
                  className="flex items-center gap-2 bg-white rounded-full px-5 py-2 opacity-75 hover:opacity-100 hover:shadow-md text-dark hover:text-white hover:bg-black focus:outline-none transition-all duration-500 ease-in-out  "
                  href={pinDetail.destination}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFillArrowUpRightCircleFill />{" "}
                  {/* {pinDetail.destination.slice(8)} */}
                  {pinDetail.destination.length > 24
                    ? pinDetail.destination.slice(8, 30) + "..."
                    : pinDetail.destination.slice(8)}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold break-words mt-3 capitalize ">
              {pinDetail.title}
            </h1>
            <p className="text-gray-600 mt-3">{pinDetail.about}</p>
          </div>

          <h2 className="mt-10 text-2xl font-semibold ">Comments</h2>

          <div className="min-h-370 overflow-y-auto ">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex bg-slate-100 p-4 gap-3 mt-5 items-center rounded "
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />

                <div className="flex flex-col ">
                  <p className="font-medium marker: capitalize text-dark ">
                    {comment.postedBy.userName}
                  </p>
                  <p className="text-gray-600  ">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex  items-center flex-wrap mt-6 gap-3 ">
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={pinDetail.postedBy?.image}
                alt="user-profile"
              />
            </Link>
            <input
              type="text"
              className=" h-12 flex-1 border-2 border-gray-300 p-3 outline-none focus:border-gray-400  text-gray-400 focus:text-gray-600 transition-all duration-150 cursor-pointer ease-in-out w-full"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500  text-white rounded-full px-6 py-2 font-semibold text-base"
              onClick={addComment}
            >
              {addingComment ? " Posting the comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>

      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl lg:mt-20 mt-10 ">
            More like this
          </h2>
          <div className=" p-10 ">
            <MasonryLayout pins={pins} />
          </div>
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>
  );
};

export default PinDetail;
