import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import ToastSuccess from "../components/toast/ToastSuccess";
import { headers } from "../utils/data";

const AhpCalculator = () => {
  const [criterias, setCriterias] = useState([]);
  const [pairwiseComparisonMatrix, setPairwiseComparisonMatrix] = useState([]);
  const [criteriaData, setCriteriaData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);
  const [sumsOfArrays, setSumsOfArrays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCriterias = async () => {
      try {
        const response = await axios.get("http://localhost:5000/criterias");
        setCriterias(response.data.result);
        initializePairwiseComparisonMatrix(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCriterias();
  }, []);

  const initializePairwiseComparisonMatrix = (criterias) => {
    const newMatrix = Array.from({ length: criterias.length }, (_, rowIndex) =>
      Array.from({ length: criterias.length }, (_, colIndex) =>
        rowIndex === colIndex ? 1 : 1
      )
    );

    setPairwiseComparisonMatrix(newMatrix);
  };

  const handleSelectChange = (rowIndex, colIndex, selectedValue) => {
    if (rowIndex === colIndex || rowIndex > colIndex) {
      return;
    }

    const newMatrix = updateMatrixValues(
      [...pairwiseComparisonMatrix],
      rowIndex,
      colIndex,
      selectedValue
    );

    setPairwiseComparisonMatrix(newMatrix);
  };

  const updateMatrixValues = (matrix, rowIndex, colIndex, selectedValue) => {
    matrix[rowIndex][colIndex] = parseInt(selectedValue);
    matrix[colIndex][rowIndex] = 1 / parseInt(selectedValue);
    return matrix;
  };

  const updateWeight = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:5000/criteria/update",
        { dataWeight: sumsOfArrays }
      );
      if (response) {
        navigate("/criteria");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateNormalizedMatrix = () => {
    const normalizedMatrix = criterias.map((_, colIndex) => {
      const totalColumn = pairwiseComparisonMatrix
        .map((row) => row[colIndex])
        .reduce((acc, val) => acc + val, 0);

      return pairwiseComparisonMatrix.map((row) =>
        (row[colIndex] / totalColumn).toFixed(2)
      );
    });

    // Transpose the normalized matrix
    const transposedMatrix = normalizedMatrix[0]?.map((_, colIndex) =>
      normalizedMatrix.map((row) => row[colIndex])
    );

    // Set the transposed matrix to the state (assuming setNormalizedMatrix is a state setter function)
    setNormalizedMatrix(transposedMatrix);

    // Calculate the sum of each array in the transposed matrix
    const arraySums = transposedMatrix?.map((row) =>
      row.reduce((acc, val) => acc + parseFloat(val) / 7, 0)
    );

    // Set the sums of arrays to the state
    setSumsOfArrays(arraySums);
    console.log(arraySums);
    // Return the transposed matrix
    return transposedMatrix;
  };

  useEffect(() => {
    console.log(calculateNormalizedMatrix());
  }, [pairwiseComparisonMatrix]);

  return (
    <Layout>
      {isSuccess && <ToastSuccess message="CR < 0.1" />}
      <h2 className="mb-4 text-2xl font-bold">Bobot Preferensi:</h2>
      <div className="mt-4">
        <h3 className="mt-4 text-lg font-semibold">
          Matriks Perbandingan Berpasangan:
        </h3>
        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                {criterias.map((criteria, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {criteria.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {criterias.map((rowCriteria, rowIndex) => (
                <tr key={rowCriteria.id}>
                  <td className="px-6 py-3">{rowCriteria?.name}</td>
                  {criterias.map((colCriteria, colIndex) => (
                    <td key={colCriteria.id} className="px-6 py-3">
                      <select
                        value={
                          rowIndex === colIndex
                            ? "1"
                            : pairwiseComparisonMatrix[rowIndex]?.[colIndex] ||
                              "1"
                        }
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          handleSelectChange(rowIndex, colIndex, selectedValue);
                        }}
                        className="w-full p-1"
                        disabled={rowIndex === colIndex || rowIndex > colIndex}
                      >
                        <option value="1">Sama</option>
                        <option value="2">Sedikit Lebih Baik</option>
                        <option value="3">Cukup Lebih Baik</option>
                        <option value="4">Jauh Lebih Baik</option>
                        <option value="5">Sangat Lebih Baik</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        Matriks Perbandingan Berpasangan (Updated):
      </h3>
      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              {criterias.map((criteria, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {criteria.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {criterias.map((rowCriteria, rowIndex) => (
              <tr key={rowCriteria.id}>
                <td className="px-6 py-3">{rowCriteria?.name}</td>
                {criterias.map((colCriteria, colIndex) => (
                  <td key={colCriteria.id} className="px-6 py-3">
                    {pairwiseComparisonMatrix[rowIndex]?.[colIndex].toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-6 py-3">Total</td>
              {criterias.map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-3">
                  {pairwiseComparisonMatrix
                    .map((row) => row[colIndex])
                    .reduce((acc, val) => acc + val, 0)
                    .toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        Matriks Perbandingan Berpasangan (Normalized):
      </h3>
      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              {criterias.map((criteria, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {criteria.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {criterias.map((rowCriteria, rowIndex) => (
              <tr key={rowCriteria.id}>
                <td className="px-6 py-3">{rowCriteria?.name}</td>
                {criterias.map((colCriteria, colIndex) => {
                  const normalizedValue =
                    pairwiseComparisonMatrix[rowIndex]?.[colIndex] /
                    pairwiseComparisonMatrix
                      .map((row) => row[colIndex])
                      .reduce((acc, val) => acc + val, 0);
                  return (
                    <td key={colCriteria.id} className="px-6 py-3">
                      {isNaN(normalizedValue)
                        ? "N/A"
                        : normalizedValue.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="mt-4 text-lg font-semibold">Jumlah Tiap Kriteria :</h3>
      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {sumsOfArrays?.map((sum, index) => (
              <tr key={index + 1}>
                <td className="px-6 py-3">{headers[index]}</td>
                <td className="px-6 py-3">{sum.toFixed(2)}</td>
              </tr>
            ))}
            {/* Baris tambahan untuk menampilkan total dari semua sumsOfArrays */}
            <tr>
              <td className="px-6 py-3">Total</td>
              <td className="px-6 py-3">
                {sumsOfArrays?.reduce((acc, val) => acc + val, 0).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="mt-4 text-lg font-semibold">Bobot Preferensi:</h3>
        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full border border-collapse">
            <tbody className>
              {criteriaData.map((criteria) => (
                <tr key={criteria.id}>
                  <td className="px-6 py-3">{criteria.name}:</td>
                  <td className="px-6 py-3">{criteria.weight.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={(e) => updateWeight(e)} className="mt-4 btn-primary">
        Update Bobot Kriteria
      </button>
    </Layout>
  );
};

export default AhpCalculator;
