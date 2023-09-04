import React, { useState } from "react";
import { Button, Input } from "../../components/common";
import PropTypes from "prop-types";

const EmployeeTable = ({ employeesData, handleUpdatePointsClick }) => {
  const [employees, setEmployees] = useState(employeesData);

  const handleSearch = (value) => {
    if (value === "") {
      if (employees === employeesData) return;
      else {
        setEmployees(employeesData);
        return;
      }
    }
    const updatedEmployees = employeesData.filter(
      (emp) =>
        emp.fullName.toLowerCase().includes(value.toLowerCase()) ||
        emp.email.toLowerCase().includes(value.toLowerCase())
    );
    setEmployees(updatedEmployees);
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-1 bg-white ml-5 flex">
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none pt-2">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400 mb-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Input
            type="text"
            className="h-10 pl-10 text-primaryText border-2 border-b-2 border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-primaryBg focus:border-primaryBg"
            placeholder="Search email"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {employeesData && employeesData.length ? (
          <div className="mt-7 ml-5 font-medium text-gray-900">
            Total Users: {employeesData.length}
          </div>
        ) : null}
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Full Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Total Points
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            return (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.fullName}
                </th>
                <td class="px-6 py-4">{employee.email}</td>
                <td class="px-6 py-4">{employee.points}</td>
                <td class="flex items-center px-6 py-4 space-x-3">
                  <Button
                    text="Update Points"
                    type="button"
                    onClick={() => {
                      handleUpdatePointsClick(employee);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

EmployeeTable.propTypes = {
  employeesData: PropTypes.array.isRequired,
  handleUpdatePointsClick: PropTypes.func,
};
