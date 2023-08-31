import React from "react";
import PropTypes from "prop-types";

const PointsHistoryTable = ({ pointsHistoryData = [] }) => {
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Points
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {pointsHistoryData &&
              pointsHistoryData.length &&
              pointsHistoryData.map((pointHistory, index) => {
                return (
                  <tr
                    key={index}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {pointHistory.points}
                    </th>
                    <td class="px-6 py-4">{pointHistory.description}</td>
                    <td class="px-6 py-4">
                      {pointHistory.operationType === "add"
                        ? "Added"
                        : "Deducted"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PointsHistoryTable;

PointsHistoryTable.propTypes = {
  pointsHistoryData: PropTypes.array.isRequired,
};
