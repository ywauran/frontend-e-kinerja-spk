import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalUpdate from "./modal/ModalUpdate";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModalUpdate = (employeeId) => {
    setIsOpenModalUpdate(true);
    setSelectedEmployeeId(employeeId);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      {isOpenModalUpdate && (
        <ModalUpdate
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          id={selectedEmployeeId}
        />
      )}

      <h2 className="text-2xl font-semibold">Data Karyawan</h2>
      <div className="flex items-center justify-end">
        <Link to="/employee/add" className="btn-primary">
          Tambah Karyawan
        </Link>
      </div>

      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  NIP
                </th>
                <th scope="col" className="px-6 py-3">
                  Posisi
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.uuid}
                  className={`${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100 dark:bg-gray-800"
                  } border-b dark:border-gray-700`}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.nip}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4 ">
                    <Link
                      to={`/employee/edit/${employee.uuid}`}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    >
                      Edit Profil
                    </Link>
                    <button
                      onClick={() => openModalUpdate(employee.id)}
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Edit Kriteria
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeesList;
