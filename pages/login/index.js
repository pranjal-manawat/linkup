import React from "react";
import { Input, Text, Button } from "../../components/common";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });

    if (status.ok) {
      router.push("/dashboard");
    } else {
      console.error("Error ", status.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="mt-5 max-w-[30%] ml-[35%] p-5 border-2 border-paperSecondary"
    >
      <div className="flex justify-center">
        <Text variant="h4">Login</Text>
      </div>
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
        text="Log In"
        type="submit"
        className="ml-auto mr-auto mt-2 w-full"
      />
      <div className="inline-flex">
        <Text variant="hint" className="mt-3">
          New User?
        </Text>
        <Text
          variant="hint"
          className="mt-3 ml-1 !text-primaryText cursor-pointer"
          onClick={() => router.push("/")}
        >
          Create Account
        </Text>
      </div>
    </form>
  );
};

export default LoginPage;
