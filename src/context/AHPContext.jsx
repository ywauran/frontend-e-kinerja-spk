import React, { createContext, useState, useContext } from "react";
import * as math from "mathjs";

const AHPContext = createContext();

export const AHPContextProvider = ({ children }) => {
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [matrix, setMatrix] = useState([
    [1, 2, 4, 4, 2, 5, 5],
    [0.5, 1, 3, 4, 2, 5, 5],
    [0.333, 0.333, 1, 4, 3, 5, 5],
    [0.25, 0.25, 0.25, 1, 4, 1, 1],
    [0.5, 0.5, 0.333, 0.25, 1, 2, 2],
    [0.2, 0.2, 0.2, 1, 0.2, 1, 1],
    [0.2, 0.2, 0.2, 1, 0.2, 1, 1],
  ]);
  const [weights, setWeights] = useState([]);

  const updateMatrix = (rowIndex, colIndex, value) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  const calculateWeights = () => {
    const normalizedMatrix = math.divide(matrix, math.sum(matrix, 1));
    const { values, vectors } = math.eig(normalizedMatrix);
    const maxEigenvalueIndex = math.argmax(values);
    const maxEigenvalueVector = math.column(vectors, maxEigenvalueIndex);
    const weights = math.divide(
      maxEigenvalueVector,
      math.sum(maxEigenvalueVector)
    );
    setWeights(weights.toArray());
  };

  return (
    <AHPContext.Provider
      value={{
        criteria,
        setCriteria,
        alternatives,
        setAlternatives,
        matrix,
        updateMatrix,
        weights,
        calculateWeights,
      }}
    >
      {children}
    </AHPContext.Provider>
  );
};

export const useAHP = () => {
  const context = useContext(AHPContext);
  if (!context) {
    throw new Error("useAHP must be used within an AHPContextProvider");
  }
  return context;
};
