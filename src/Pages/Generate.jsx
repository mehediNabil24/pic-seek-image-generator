import { useContext } from "react";
// import PageTitle from "../components/shared/PageTitle";
// import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import PageTitle from "../Components/PageTtile";
import axios from "axios";
import { useNavigate } from "react-router";

const Generate = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const options = [
    "painting",
    "animated-image",
    "walpaper",
    "poster",
    "digital-art",
    "realistic-image",
  ];

  const checkUser = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "Join as a Creator with One Click",
        imageUrl: "https://img.icons8.com/?size=100&id=szz75vJoS2OI&format=gif",
        imageHeight: "80px",
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: `Login using Google`,
        confirmButtonColor: "#149b9b",
      }).then((res) => {
        if (res.isConfirmed) {
          login()
            .then((res) => {
              const user = res.user;
              console.log(user);
              Swal.fire("success", "Welcome", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      return false;
    } else {
      return true;
    }
  };

  const validate = (prompt, category) => {
    // validation starts
    if (!category) {
      Swal.fire(
        "Select Category",
        "Select a Category from the dropdown",
        "error"
      );
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }
    if (prompt.trim().length < 20) {
      Swal.fire(
        "Invalid Prompt",
        "make your prompt bigger (minimum 20 character)",
        "error"
      );
      return false;
    }
    //validation End
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const prompt = form.prompt.value;
    const category = form.category.value;

    if (!checkUser()) return;
    if (!validate(prompt, category)) return;

    console.log({ prompt, category });
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we generate your image.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    axios
      .post("https://pic-seek-server-theta.vercel.app/api/v1/image/create", {
        email: user?.email,
        prompt,
        category,
        username: user?.displayName || "Anonymous",
        userImg:
          user?.photoURL ||
          "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png",
      })
      .then((res) => {
        console.log(res.data);
        // Close loading alert and show success message
        Swal.fire({
          title: "Success!",
          text: "Your image has been successfully created.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/creations");  // Navigate after success alert
        });;
      })
      .catch((error) => {
        console.error(error);
        // Close loading alert and show error message
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    // const blob = new Blob([buffer], { type: "image/jpeg" }); // Set correct MIME type
    // const url = URL.createObjectURL(blob);
    // console.log(url);
  };

  return (
    <div>
      <PageTitle>🌱Let&apos;s Create 🐦‍🔥</PageTitle>

      <div className="w-11/12 mx-auto py-10">
        <div className="flex justify-center py-5">
          <img
            src="https://img.icons8.com/?size=96&id=8gR77jBNhfyz&format=png"
            alt=""
            className="animate-bounce"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="join w-full justify-center flex-wrap"
        >
          <div className="flex-1">
            <div className="">
              <input
                name="prompt"
                className="input w-full input-bordered join-item outline-none focus:outline-none focus:border-primary"
                placeholder="Write , Whats on your Mind🧠🧠"
              />
            </div>
          </div>
          <select
            name="category"
            className="select select-bordered join-item max-w-max outline-none focus:outline-none focus:border-primary"
          >
            <option value="">Select a Category</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="indicator">
            <button  className="btn join-item btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Generate;