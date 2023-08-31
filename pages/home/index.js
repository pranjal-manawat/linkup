import React, { useEffect, useState } from "react";
import { Text, Button, Header } from "../../components/common";
import PointsHistoryTable from "./PointsHistoryTable";
import { useSession } from "next-auth/react";
import { getData } from "../../utils/rest";

const HomePage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.details?.Id || null;
  const [points, setPoints] = useState(null);
  const [pointsHistory, setPointsHistory] = useState([]);

  const fetchPoints = async (userId) => {
    try {
      const url = `http://localhost:5000/points?userId=${userId}`;
      const { data } = await getData(url);
      const points = data?.data;
      setPoints(points);
    } catch (e) {
      console.error("Error in fetching Points ", e);
    }
  };

  const fetchPointsHistory = async (userId) => {
    try {
      const url = `http://localhost:5000/pointsHistory?userId=${userId}`;
      const { data } = await getData(url);
      const pointsHistory = data?.data || [];
      setPointsHistory(pointsHistory);
    } catch (e) {
      console.error("Error in fetching Points ", e);
    }
  };

  useEffect(() => {
    fetchPoints(userId);
    fetchPointsHistory(userId);
  }, [userId]);

  return (
    <>
      <div className="flex justify-center p-2">
        <div className="mt-4">
          <div>
            <Text variant="h4">Balance: {points}</Text>
          </div>
          <div className="mt-4">
            <Button
              text="Redeem Now"
              type="button"
              className="mb-4 ml-auto mr-auto"
            />
          </div>
        </div>
      </div>
      <PointsHistoryTable pointsHistoryData={pointsHistory} />
      <div className="mt-40">
        <Header />
      </div>
    </>
  );
};

export default HomePage;
