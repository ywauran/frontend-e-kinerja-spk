import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import ToastSuccess from "../components/toast/ToastSuccess";

const AhpCalculator = () => {
  const [criterias, setCriterias] = useState([]);
  const [newCriterias, setNewCriterias] = useState([]);
  const [pairwiseComparisonMatrix, setPairwiseComparisonMatrix] = useState([]);
  const [criteriaData, setCriteriaData] = useState(criterias);
  const [eigenValues, setEigenValues] = useState([]);
  const [eigenVector, setEigenVector] = useState([]);
  const [consistencyRatio, setConsistencyRatio] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const updateWeight = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:5000/criteria/update",
        {
          dataWeight: newCriterias,
        }
      );
      if (response) {
        navigate("/criteria");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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

  useEffect(() => {
    setPairwiseComparisonMatrix(initializePairwiseComparisonMatrix(criterias));
  }, [criterias]);

  useEffect(() => {
    const eigenVector = calculateEigen(pairwiseComparisonMatrix);
    const preferenceWeights = normalizeVector(eigenVector);

    setCriteriaData((prevCriteriaData) => {
      return prevCriteriaData.map((criteria, index) => {
        return { ...criteria, weight: preferenceWeights[index] };
      });
    });

    const consistencyRatio = calculateConsistencyRatio(
      pairwiseComparisonMatrix,
      eigenVector
    );
    setConsistencyRatio(consistencyRatio);
  }, [pairwiseComparisonMatrix]);

  const initializePairwiseComparisonMatrix = (criterias) => {
    return Array(criterias.length).fill(Array(criterias.length).fill(1));
  };

  const calculateEigen = (matrix) => {
    const n = matrix.length;
    const eigenValues = Array(n).fill(0);
    const eigenVector = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      eigenValues[i] = matrix[i].reduce((acc, val) => acc + val, 0) / n;
    }

    const sumEigenValues = eigenValues.reduce((acc, val) => acc + val, 0);

    for (let i = 0; i < n; i++) {
      eigenVector[i] = eigenValues[i] / sumEigenValues;
    }

    return eigenVector;
  };

  const calculateConsistencyRatio = (matrix, eigenVector) => {
    const n = matrix.length;
    const weightedSum = matrix.map((row, i) =>
      row.reduce((acc, val) => acc + val * eigenVector[i], 0)
    );

    const lambdaMax = weightedSum.reduce((acc, val) => acc + val, 0) / n;
    const consistencyIndex = (lambdaMax - n) / (n - 1);
    const randomIndex = getConsistencyRandomIndex(n);

    const consistencyRatio = consistencyIndex / randomIndex;

    return consistencyRatio;
  };

  const getConsistencyRandomIndex = (n) => {
    // You can define the random index values for different n
    // Here, we are using a predefined table of random index values
    const randomIndexTable = [
      0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49,
    ];
    return randomIndexTable[n - 1];
  };

  const normalizeVector = (eigenVector) => {
    const sum = eigenVector.reduce((acc, val) => acc + val, 0);
    return eigenVector.map((val) => val / sum);
  };

  useEffect(() => {
    const eigenVector = calculateEigen(pairwiseComparisonMatrix);
    const preferenceWeights = normalizeVector(eigenVector);

    const combinedArray = criterias.map((item, index) => ({
      ...item,
      newWeight: preferenceWeights[index] || 0, // Menangani kasus jika panjang array2 lebih pendek dari array1
    }));
    setNewCriterias(combinedArray);
    console.log(newCriterias);
    setEigenValues(eigenVector);
    setEigenVector(preferenceWeights);
  }, [pairwiseComparisonMatrix]);

  const handleMatrixChange = (event, rowIndex, colIndex) => {
    const value = parseFloat(event.target.value) || 1;
    const updatedMatrix = pairwiseComparisonMatrix.map((row, i) =>
      row.map((col, j) => (i === rowIndex && j === colIndex ? value : col))
    );
    setPairwiseComparisonMatrix(updatedMatrix);
  };

  useEffect(() => {
    if (consistencyRatio !== null && consistencyRatio < 0.1) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }
  }, [consistencyRatio]);

  return (
    <Layout>
      {isSuccess && <ToastSuccess message="CR < 0.1" />}
      <h2 className="mb-4 text-2xl font-bold">Bobot Preferensi:</h2>

      {/* Pairwise Comparison Matrix Table */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">
          Matriks Perbandingan Berpasangan:
        </h3>
        <table className="w-full mb-4 border border-collapse">
          <thead>
            <tr>
              <th className="p-2 border"></th>
              {criterias.map((criteria, index) => (
                <th key={index} className="p-2 border">
                  {criteria.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criterias.map((rowCriteria, rowIndex) => (
              <tr key={rowCriteria.id}>
                <td className="p-2 border">{rowCriteria?.name}</td>
                {criterias.map((colCriteria, colIndex) => (
                  <td key={colCriteria.id} className="p-2 border">
                    <select
                      value={
                        pairwiseComparisonMatrix[rowIndex]?.[colIndex] || "1"
                      }
                      onChange={(event) =>
                        handleMatrixChange(event, rowIndex, colIndex)
                      }
                      className="w-full p-1"
                      disabled={rowIndex === colIndex}
                    >
                      <option value="1">Sama</option>
                      <option value="3">Sedikit Lebih Baik</option>
                      <option value="5">Cukup Lebih Baik</option>
                      <option value="7">Jauh Lebih Baik</option>
                      <option value="9">Sangat Lebih Baik</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Criteria Weights Table */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Bobot Preferensi:</h3>
        <table className="w-full border border-collapse">
          <tbody>
            {criteriaData.map((criteria) => (
              <tr key={criteria.id}>
                <td className="p-2 border">{criteria.name}:</td>
                <td className="p-2 border">{criteria.weight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Eigenvalues Table */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Eigenvalues:</h3>
        <table className="w-full border border-collapse">
          <tbody>
            {eigenValues.map((value, index) => (
              <tr key={index}>
                <td className="p-2 border">{`Lambda_${index + 1}:`}</td>
                <td className="p-2 border">{value.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Eigenvector Table */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Eigenvector:</h3>
        <table className="w-full border border-collapse">
          <tbody>
            {eigenVector.map((value, index) => (
              <tr key={index}>
                <td className="p-2 border">{`W_${index + 1}:`}</td>
                <td className="p-2 border">{value.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={(e) => updateWeight(e)} className="mt-4 btn-primary">
          Update Bobot Kriteria
        </button>
      </div>
    </Layout>
  );
};

export default AhpCalculator;
