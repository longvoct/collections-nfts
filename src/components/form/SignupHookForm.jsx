import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import InputHookForm from "../input/InputHookForm";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = Yup.object({
  name: Yup.string().required("Please enter your username"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8, "Your password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: "Must have at least 1 letter, 1 number and 1 special character",
    })
    .required("Please enter your password"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
}).required();

const SignUpHookForm = ({ http, setToken, ...props }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [existEmail, setExistEmail] = useState(null);
  const onSubmit = async (data) => {
    console.log(data);
    http
      .post("/register", {
        ...data,
        type: 0,
      })
      .then((res) => {
        toast.success("Create Success!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setToken(res.data.remember_token);
        if (isValid) {
          console.log("Send data to backend");
          reset({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
        }
      })
      .catch((error) =>
        toast.warn(error?.response?.data.errors[0], {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };
  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <div className="w-full max-w-[450px] mx-auto shadow-lg text-[14px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <InputHookForm
            name="name"
            control={control}
            placeholder="Enter your user name"
            id="name"
          />
          {errors?.username && (
            <p className="text-sm font-[300] text-red-500">
              {errors?.username?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <InputHookForm
            name="email"
            type="email"
            control={control}
            placeholder="Enter your email address"
            id="email"
          />
          {errors?.email && (
            <p className="text-sm font-[300] text-red-500">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <InputHookForm
            type="password"
            name="password"
            control={control}
            placeholder="Enter your password"
            id="password"
          />
          {errors?.password && (
            <p className="text-sm font-[300] text-red-500">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <InputHookForm
            type="password"
            name="password_confirmation"
            control={control}
            placeholder="Confirm your password"
            id="password_confirmation"
          />
          {errors?.password && (
            <p className="text-sm font-[300] text-red-500">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <strong className="cursor-pointer text-[#c68afc]">Sign in</strong>
          </Link>
        </p>
        <button
          type="submit"
          className="mt-3 w-full p-4 bg-[#c68afc] text-white font-semibold rounded-lg active:bg-opacity-90"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer autoClose={500} />
    </div>
  );
};
export default SignUpHookForm;
