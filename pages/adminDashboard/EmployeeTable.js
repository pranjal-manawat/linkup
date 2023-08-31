import React from "react";
import { Button } from "../../components/common";
import PropTypes from "prop-types";

const EmployeeTable = ({ employeesData, handleUpdatePointsClick }) => {
  return (
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {employeesData.map((employee, index) => {
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
