import React from "react";
import Button from "../Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const signOutAndRedirect = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/login",
    });
    router.push("login");
    return null;
  };

  return (
    <div className="flex justify-end mt-2 mb-2 mr-10">
      <Button type="button" text="Log Out" onClick={signOutAndRedirect} />
    </div>
  );
};

export default Header;

Header.propTypes = {};
