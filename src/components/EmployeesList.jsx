import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl">Data Karyawan</h2>
      <div className="flex justify-end items-center">
        <Link to="/employee/add" className="btn-primary">
          Tambah Karyawan
        </Link>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  NO
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  NIP
                </th>
                <th scope="col" className="py-3 px-6">
                  Posisi
                </th>
                <th scope="col" className="py-3 px-6">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.uuid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">#</td>
                  <td className="py-4 px-6">{employee.name}</td>
                  <td className="py-4 px-6">{employee.email}</td>
                  <td className="py-4 px-6">{employee.nip}</td>
                  <td className="py-4 px-6">{employee.position}</td>
                  <td className="py-4 px-6s">
                    <Link
                      to={`/employee/edit/${employee.uuid}`}
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
