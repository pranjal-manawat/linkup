import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Header } from "../../components/common";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getData, postData } from "../../utils/rest";
import EmployeeTable from "./EmployeeTable";

const AdminDashboard = () => {
  const { data: session } = useSession();
  const [employeesData, setEmployeesData] = useState([]);
  const [openPointsModal, setOpenPointsModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);

  const fetchEmployeesData = async () => {
    try {
      const url = "http://localhost:5000/allEmployeeRecords";
      const { data } = await getData(url);
      const employeeRecords = data?.data || [];
      setEmployeesData(employeeRecords);
    } catch (e) {
      console.error("Error in fetching Employee records ", e);
    }
  };

  const handleUpdatePointsClick = (data) => {
    setOpenPointsModal(true);
    setActiveUserId(data.Id);
  };

  const PointsForm = () => {
    const pointsValidationSchema = yup.object().shape({
      points: yup
        .number()
        .required("Points are required")
        .typeError("Please enter a valid number")
        .test(
          "positive",
          "Please enter a value greater than 0",
          (value) => value > 0
        ),
      description: yup.string().required("Description is required"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "all",
      defaultValues: {
        points: null,
        description: "",
      },
      resolver: yupResolver(pointsValidationSchema),
    });

    const addPoints = async (payload) => {
      setOpenPointsModal(false);
      try {
        const url = "http://localhost:5000/addPoints";
        const { success, error, data } = postData(url, payload, {});

        if (success) {
          console.log("Response ", data.message);
        } else {
          console.error("Error ", error);
        }
      } catch (error) {
        console.error("Error while adding points ", error);
      }
      fetchEmployeesData();
    };

    const removePoints = async (payload) => {
      setOpenPointsModal(false);
      try {
        const url = "http://localhost:5000/removePoints";
        const { success, error, data } = postData(url, payload, {});

        if (success) {
          console.log("Response ", data.message);
        } else {
          console.error("Error ", error);
        }
      } catch (error) {
        console.error("Error while removing points ", error);
      }
      fetchEmployeesData();
    };

    const onSubmit = async (data, e) => {
      e.preventDefault();
      if (e.nativeEvent.submitter.innerHTML === "Add Points")
        await addPoints({ ...data, userId: activeUserId });
      else if (e.nativeEvent.submitter.innerHTML === "Remove Points")
        await removePoints({ ...data, userId: activeUserId });
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-inherit">
          <Input
            label="Points"
            type="number"
            placeholder="Enter value"
            className=""
            {...register("points")}
            itemRequired
            errorMessage={errors?.points?.message}
          />
          <Input
            label="Description"
            type="text"
            placeholder="Enter value"
            className=""
            {...register("description")}
            itemRequired
            errorMessage={errors?.description?.message}
          />
          <div className="inline-flex mt-4">
            <Button
              text="Add Points"
              className="pl-12 pr-12"
              type="submit"
              name="add"
            />
            <Button
              text="Remove Points"
              className="ml-3 pl-10 pr-10"
              type="submit"
              name="remove"
            />
          </div>
        </form>
      </>
    );
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  if (!session) {
    return <>No active session. Please log in.</>;
  }
  return (
    <>
      <EmployeeTable
        employeesData={employeesData}
        handleUpdatePointsClick={handleUpdatePointsClick}
      />
      <Modal
        open={openPointsModal}
        handleClose={() => setOpenPointsModal(false)}
        children={<PointsForm activeUserId={activeUserId} />}
        title="Update Points Modal"
        className="w-[30%]"
      />
      <div className="mt-40">
        <Header />
      </div>
    </>
  );
};

export default AdminDashboard;
