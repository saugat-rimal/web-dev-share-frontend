import { GoogleOAuthProvider } from "@react-oauth/google";

import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = async (response) => {
    // console.log(response);
    // const decoded = jwt_decode(response.credential);

    localStorage.setItem(
      "user",
      JSON.stringify(jwt_decode(response.credential))
    );

    const { name, picture, sub } = jwt_decode(response.credential);

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-start flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 flex items-center gap-4">
            <img src={logo} alt="logo" width="60px" />
            <p className="text-white text-2xl font-medium">Web Dev Share</p>
          </div>
          <div className="w-[400px]">
            <p className="text-white text-center pb-10 shadow-xl">
              The place to share your ideas and expertise with the world. And if
              you want to, you can use it to promote your business, portfolio,
              blogs, and many more.{" "}
            </p>
          </div>

          <div className="shadow-2xl">
            <p className="text-white text-l capitalize text-center pb-4">
              Sign In to continue
            </p>
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            >
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
