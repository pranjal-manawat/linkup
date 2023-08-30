import React from "react";
import { Button, Input, Text } from "../components/common";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postData } from "../utils/rest";

const signUpValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  userName: yup.string().required("User Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email id"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message:
        "Password should be at least 8 characters. Should contain 1 uppercase, 1 lowercase, 1 special char",
    }),
});

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signUpValidationSchema),
  });

  const postSignupData = async (payload) => {
    try {
      const url = "http://localhost:5000/signup";
      const { success, error, data } = postData(url, {...payload, isAdmin: 'false'}, {});

      if (success) {
        console.log("Response ", data.message);
      } else {
        console.error("Error ", error);
      }
    } catch (error) {
      console.error("Error in postSignupData ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => postSignupData(data))}
      className="mt-5 max-w-[30%] ml-[35%] p-5 border-2 border-paperSecondary"
    >
      <div className="flex justify-center">
        <Text variant="h4">SignUp</Text>
      </div>
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter value"
        className=""
        {...register("fullName")}
        itemRequired
        errorMessage={errors?.fullName?.message}
      />
      <Input
        label="User Name"
        type="text"
        placeholder="Enter value"
        className=""
        {...register("userName")}
        itemRequired
        errorMessage={errors?.userName?.message}
      />
      <Input
        label="Email"
        type="text"
        placeholder="Enter value"
        className=""
        {...register("email")}
        itemRequired
        errorMessage={errors?.email?.message}
      />
      <Input
        label="Password"
        type="text"
        placeholder="Enter value"
        className=""
        {...register("password")}
        itemRequired
        errorMessage={errors?.password?.message}
      />
      <Button
        text="Create Account"
        type="submit"
        className="ml-auto mr-auto mt-2 w-full"
      />
      <div className="inline-flex">
        <Text variant="hint" className="mt-3">
          Already have an Account?
        </Text>
        <Text
          variant="hint"
          className="mt-3 ml-1 !text-primaryText cursor-pointer"
          onClick={() => router.push("login")}
        >
          Log In
        </Text>
      </div>
    </form>
  );
};

export default SignUpPage;
