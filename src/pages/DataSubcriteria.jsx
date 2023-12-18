import React from "react";
import Layout from "./Layout";

const DataSubcriteria = () => {
  const dummyData = [
    { no: 1, kodeKriteria: "KR001", bobot: 1 },
    { no: 2, kodeKriteria: "KR002", bobot: 2 },
    { no: 3, kodeKriteria: "KR003", bobot: 3 },
    { no: 4, kodeKriteria: "KR004", bobot: 4 },
    { no: 5, kodeKriteria: "KR005", bobot: 5 },
  ];
  return (
    <Layout>
      <h2 className="font-semibold text-2xl">Data Sub Kriteria</h2>
      <div className="mt-8 shadow-md">
        <h3 className="font-semibold text-xl">Efektifitas</h3>
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
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => (
                  <tr
                    key={data.no}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{data.no}</td>
                    <td className="py-4 px-6">{data.kodeKriteria}</td>
                    <td className="py-4 px-6">{data.bobot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-8 shadow-md">
        <h3 className="font-semibold text-xl">Tanggung Jawab</h3>
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
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => (
                  <tr
                    key={data.no}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{data.no}</td>
                    <td className="py-4 px-6">{data.kodeKriteria}</td>
                    <td className="py-4 px-6">{data.bobot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-8 shadow-md">
        <h3 className="font-semibold text-xl">Efektifitas</h3>
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
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => (
                  <tr
                    key={data.no}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{data.no}</td>
                    <td className="py-4 px-6">{data.kodeKriteria}</td>
                    <td className="py-4 px-6">{data.bobot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataSubcriteria;
