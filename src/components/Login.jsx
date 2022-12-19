import axios from "axios";
import jwt_decode from "jwt-decode";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
  const createOrGetUser = async (response: any, addUser: any) => {
    const decoded = jwt_decode(response.credential);

    console.log(decoded);
  };

  const user = false;

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
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            {user ? (
              <div>Logged In</div>
            ) : (
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response)}
                onError={console.log("error")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
