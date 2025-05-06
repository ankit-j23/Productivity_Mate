import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { Lock, User, Mail, Camera, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import profileAvatar from "../assets/profile.png";
import modalClose from "../lib/modalClose";
import { useSelector, useDispatch } from "react-redux";
import {
  authStarted,
  authSuccess,
  authFailed,
  uploadImage,
} from "../features/auth/AuthSlice";
import validateForm from "../lib/validateForm";

const SignupPage = () => {
  //ref for modal closing
  const closeRef = useRef();
  const navigate = useNavigate();

  //from rtk
  const dispatch = useDispatch();
  const { user, isUploadingImage, loading, error } = useSelector(
    (state) => state.auth
  );

  //credentails to put in the route
  const [credentails, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: "",
  });

  //selected current image
  const [selectedImage, setSelectedImage] = useState(null);

  //function to upload profilePic
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    dispatch(uploadImage(true));

    //reading the file and converting into the base url
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64FormatImageUrl = reader.result;
      setSelectedImage(base64FormatImageUrl);
      setCredentials((prev) => ({ ...prev, profilePic: base64FormatImageUrl }));

      dispatch(uploadImage(false));
    };
  };

  //main signup function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStarted(true));

    //validations
    const validationRes = validateForm(credentails, "signup");
    if (!validationRes) {
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", credentails);
      dispatch(authSuccess(res.data));

      toast.success("Account created successfully");
      // console.log(res);
      setTimeout(() => {
        navigate("/authhome");
      }, 200);
    } catch (error) {
      dispatch(authFailed(error.response.data.message || "Signup Failed"));
      toast.error(error.response.data.message || "Invalid Credentials");
    }
  };

  //onchange function to pass in the inputs
  const onChange = (e) => {
    setCredentials({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <div
      ref={closeRef}
      onClick={(e) => {
        modalClose(e, closeRef, navigate);
      }}
      className="flex fixed inset-0 min-h-screen bg-black/60 items-center justify-center"
    >
      <div className="relative flex flex-col login-modal bg-white rounded-lg sm:w-[400px] lg:w-[450px]  -mt-10">
        <button onClick={()=>{navigate('/')}} className="place-self-end absolute top-2 right-2">
          <X />
        </button>
        <div className="flex flex-col gap-2 2xl:gap-3 w-full px-12 sm:px-16 py-8 2xl:py-10">
          <div className="flex flex-col items-center max-sm:gap-1 sm:gap-3">
            <h1 className="text-xl 2xl:text-3xl text-green-800 font-sans font-semibold  italic">
              Productivity Mate
            </h1>
            <p className="text-md sm:text-xl font-semibold">Welcome !!</p>
          </div>

          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-2 items-center">
                <div className="relative">
                  <img
                    src={selectedImage || profileAvatar}
                    className="size-18 2xl:size-28 rounded-full border-4 object-cover border-green-800/60"
                    alt="profile-avatar"
                  />
                  <label
                    htmlFor="profile-avatar-upload"
                    className={`absolute bottom-0 right-0 hover:scale-110 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                      isUploadingImage
                        ? "animate-pulse pointer-events-none"
                        : " "
                    }`}
                  >
                    <Camera className="w-4 2xl:w-5 h-4 2xl:h-5 text-green-800" />
                    <input
                      type="file"
                      id="profile-avatar-upload"
                      className="hidden"
                      name="profilePic"
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
                <p>{selectedImage ? "" : "Upload your profile"}</p>
              </div>
              <div className="flex flex-col">
                <label className="text-black/75" htmlFor="name">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 pl-3 flex items-center">
                    <User className="size-4 2xl:size-5 text-green-800/60" />
                  </div>
                  <input
                    className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                    type="text"
                    id="name"
                    name="fullName"
                    value={credentails.fullName}
                    placeholder="Jhon Cena"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-black/75" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 pl-3 flex items-center">
                    <Mail className="size-4 2xl:size-5 text-green-800/60" />
                  </div>
                  <input
                    className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                    type="email"
                    id="email"
                    name="email"
                    value={credentails.email}
                    placeholder="Jhon@cena.com"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-black/75" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 pl-3 flex items-center">
                    <Lock className="size-4 2xl:size-5 text-green-800/60" />
                  </div>
                  <input
                    className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                    type="password"
                    id="password"
                    name="password"
                    value={credentails.password}
                    placeholder="type your password here"
                    onChange={onChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`border p-2 rounded-md ${
                  loading ? "bg-green-800/60" : "bg-green-800"
                } text-white cursor-pointer`}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-5 animate-spin m-auto" />
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-center text-md">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-800 text-md sm:text-lg">
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
