import Layout from "./Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  separateData,
  calculateXnValues,
  calculateNormalizationMatrix,
  calculateNormalizedMatrixY,
  calculateAPlus,
  calculateAMinus,
  calculateDistancesToDPlusAndDMinus,
  calculatePreferenceValues,
} from "../utils/topsis";
import { transformData } from "../utils/helper";

const DataCalculation = () => {
  const [weightCriteria, setWeightCriteria] = useState({});
  const [data, setData] = useState([]);
  const [resultSeparateData, setResultSeparateData] = useState({});
  const [resultXnValues, setResultXnValues] = useState({});
  const [resultNormalizationMatrix, setResultNormalizationMatrix] = useState(
    []
  );
  const [resultNormalizedMatrixY, setResultNormalizedMatrixY] = useState([]);
  const [resultCalculateAPlus, setResultCalculateAPlus] = useState([]);
  const [resultCalculateAMinus, setResultCalculateAMinus] = useState([]);
  const [resultDistancesToDPlus, setResultDistancesToDPlus] = useState([]);
  const [resultDistancesToDMinus, setResultDistancesToDMinus] = useState([]);
  const [resultPreferenceValues, setResultPreferenceValues] = useState([]);
  const [names, setNames] = useState([]);
  const [result, setResult] = useState([]);

  const fetchNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees/name");
      const names = response.data.map((item) => item.name);
      setNames(names);
    } catch (error) {}
  };
  const fetchEmployeeCriteria = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      const transformedData = transformData(response?.data);
      setData(transformedData);
    } catch (error) {}
  };
  const fetchWeightCriteria = async () => {
    try {
      const response = await axios.get("http://localhost:5000/criterias");
      setWeightCriteria(response.data.result);
      const originalData = response.data.result;
      const weightCriteria = {};

      originalData.forEach((item) => {
        let camelCaseName = item.name
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, "");
        weightCriteria[camelCaseName] = item.weight;
      });

      setWeightCriteria(weightCriteria);
    } catch (error) {}
  };

  useEffect(() => {
    fetchEmployeeCriteria();
    fetchWeightCriteria();
    fetchNames();
  }, []);

  // Second useEffect for calculations
  useEffect(() => {
    // Check if all required data is available
    if (data.length > 0 && weightCriteria !== null) {
      const separatedData = separateData(data);
      setResultSeparateData(separatedData);

      const xnValues = calculateXnValues(separatedData);
      setResultXnValues(xnValues);

      const normalizationMatrix = calculateNormalizationMatrix(data, xnValues);
      setResultNormalizationMatrix(normalizationMatrix);

      const normalizedMatrixY = calculateNormalizedMatrixY(
        normalizationMatrix,
        weightCriteria
      );
      setResultNormalizedMatrixY(normalizedMatrixY);

      const aPlus = calculateAPlus(normalizedMatrixY);
      setResultCalculateAPlus(aPlus);

      const aMinus = calculateAMinus(normalizedMatrixY);
      setResultCalculateAMinus(aMinus);

      const { distancesToDPlus, distancesToDMinus } =
        calculateDistancesToDPlusAndDMinus(normalizedMatrixY, aPlus, aMinus);
      setResultDistancesToDPlus(distancesToDPlus);
      setResultDistancesToDMinus(distancesToDMinus);

      setResultPreferenceValues(
        calculatePreferenceValues(distancesToDPlus, distancesToDMinus)
      );

      // Sort the result array
      const sortedResult = names.map((name, index) => ({
        name,
        value: resultPreferenceValues[index],
      }));
      sortedResult.sort((a, b) => b.value - a.value);
      setResult(sortedResult);
    }
  }, [data, weightCriteria, names]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Data Perhitungan</h2>
      <div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">Matriks Keputusan (X)</h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efektivitas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efisiensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inovasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kerja Sama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kecepatan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggung Jawab
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ketaatan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{item.nama}</td>
                      <td className="px-6 py-4">{item.efektivitas}</td>
                      <td className="px-6 py-4">{item.efisiensi}</td>
                      <td className="px-6 py-4">{item.inovasi}</td>
                      <td className="px-6 py-4">{item.kerjaSama}</td>
                      <td className="px-6 py-4">{item.kecepatan}</td>
                      <td className="px-6 py-4">{item.tanggungJawab}</td>
                      <td className="px-6 py-4">{item.ketaatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">Bobot Kriteria (W)</h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Efektivitas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efisiensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inovasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kerja Sama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kecepatan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggung Jawab
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ketaatan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {Object?.entries(weightCriteria)?.map(([key, value]) => (
                      <td key={key} className="px-6 py-4">
                        {value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">
            Matriks Normalisasi (R)
          </h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efektivitas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efisiensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inovasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kerja Sama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kecepatan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggung Jawab
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ketaatan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultNormalizationMatrix.map((row, rowIndex) => (
                    <tr
                      key={rowIndex + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{names[rowIndex]}</td>
                      <td className="px-6 py-4">{row.efektivitas}</td>
                      <td className="px-6 py-4">{row.efisiensi}</td>
                      <td className="px-6 py-4">{row.inovasi}</td>
                      <td className="px-6 py-4">{row.kerjaSama}</td>
                      <td className="px-6 py-4">{row.kecepatan}</td>
                      <td className="px-6 py-4">{row.tanggungJawab}</td>
                      <td className="px-6 py-4">{row.ketaatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mt-6 text-xl font-semibold">Matriks (Y)</h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efektivitas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efisiensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inovasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kerja Sama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kecepatan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggung Jawab
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ketaatan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultNormalizedMatrixY.map((person, index) => (
                    <tr
                      key={index + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{names[index]}</td>
                      {Object.values(person).map((value, criteriaIndex) => (
                        <td key={criteriaIndex} className="px-6 py-4">
                          {typeof value === "number" ? value.toFixed(9) : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">
            Solusi Ideal Positif (A+)
          </h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Efektivitas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efisiensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inovasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kerja Sama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kecepatan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggung Jawab
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ketaatan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {resultCalculateAPlus.map((value, index) => (
                      <td className="px-6 py-4" key={index + 1}>
                        {value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">
            Solusi Ideal Negatif (A-)
          </h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Efektivitas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Efisiensi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inovasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kerja Sama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kecepatan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggung Jawab
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ketaatan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {resultCalculateAMinus.map((value, index) => (
                      <td className="px-6 py-4" key={index + 1}>
                        {value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">
            Jarak Ideal Positif (Si+)
          </h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Nama</th>
                    <th className="px-6 py-3">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {resultDistancesToDPlus.map((item, index) => (
                    <tr
                      key={index + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{names[index]}</td>
                      <td className="px-6 py-4">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">
            Jarak Ideal Negatif (Si-)
          </h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Nama</th>
                    <th className="px-6 py-3">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {resultDistancesToDMinus.map((item, index) => (
                    <tr
                      key={index + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{names[index]}</td>
                      <td className="px-6 py-4">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-6 text-xl font-semibold">
            Kedekatan Relatif Terhadap Solusi (V)
          </h3>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nilai
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => (
                    <tr
                      key={index + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataCalculation;
