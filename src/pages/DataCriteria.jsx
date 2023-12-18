import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const DataCriteria = () => {
  const [criterias, setCriterias] = useState([]);

  useEffect(() => {
    const fetchCriterias = async () => {
      try {
        const response = await axios.get("http://localhost:5000/criterias");
        console.log(response.data.result);
        setCriterias(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCriterias();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Data Kriteria</h2>
      <div className="mt-4">
        <Link to="/ahp/calculator" className="btn-primary">
          Bobot Preferensi AHP
        </Link>
      </div>
      <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode Kriteria
                </th>
                <th scope="col" className="px-6 py-3">
                  Bobot
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis
                </th>
              </tr>
            </thead>
            <tbody>
              {criterias.map((data) => (
                <tr
                  key={data.uuid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{data.id}</td>
                  <td className="px-6 py-4">{data.name}</td>
                  <td className="px-6 py-4">{data.weight}</td>
                  <td className="px-6 py-4">{data.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default DataCriteria;
