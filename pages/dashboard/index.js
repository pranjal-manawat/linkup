import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  if (!session) {
    return <>No active session. Please log in.</>;
  }
  return (
    <>
      Dashboard
    </>
  );
};

export default Dashboard;
