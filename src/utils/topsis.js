export const dummyData = [
  {
    nama: "Alex Johnson",
    efektivitas: 8,
    efisiensi: 8,
    inovasi: 7,
    kerjaSama: 7,
    kecepatan: 8,
    tanggungJawab: 10,
    ketaatan: 9,
  },
  {
    nama: "John Doe",
    efektivitas: 9,
    efisiensi: 8,
    inovasi: 7,
    kerjaSama: 6,
    kecepatan: 5,
    tanggungJawab: 6,
    ketaatan: 9,
  },
  {
    nama: "Jane Smith",
    efektivitas: 8,
    efisiensi: 7,
    inovasi: 7,
    kerjaSama: 8,
    kecepatan: 9,
    tanggungJawab: 10,
    ketaatan: 8,
  },
  {
    nama: "Eva Brown",
    efektivitas: 9,
    efisiensi: 9,
    inovasi: 8,
    kerjaSama: 8,
    kecepatan: 8,
    tanggungJawab: 9,
    ketaatan: 10,
  },
  {
    nama: "Michael White",
    efektivitas: 7,
    efisiensi: 6,
    inovasi: 7,
    kerjaSama: 8,
    kecepatan: 8,
    tanggungJawab: 8,
    ketaatan: 7,
  },
];

// Weight criteria
export const weightCriteria = {
  efektivitas: 0.307176251,
  efisiensi: 0.235461566,
  inovasi: 0.185923593,
  kerjaSama: 0.09365132,
  kecepatan: 0.087608225,
  tanggungJawab: 0.045089523,
  ketaatan: 0.045089523,
};

// Function to separate data
export function separateData(array) {
  const separatedData = {};

  array.forEach((person) => {
    Object.entries(person).forEach(([key, value]) => {
      if (!separatedData[key]) {
        separatedData[key] = [];
      }
      separatedData[key].push(value);
    });
  });

  return separatedData;
}

// Separate data
export const separatedData = separateData(dummyData);

// Function to calculate Xn
export function calculateXnValues(data) {
  const xnValues = {};
  Object.entries(data).forEach(([key, values]) => {
    if (key !== "nama") {
      const xn = Math.sqrt(
        values?.reduce((sum, value) => sum + Math.pow(value, 2), 0)
      );
      xnValues[key] = xn;
    }
  });
  return xnValues;
}

// Calculate Xn
export const resultXn = calculateXnValues(separatedData);

// Function to calculate normalization matrix
export function calculateNormalizationMatrix(data, xnValues) {
  const normalizationMatrix = [];

  data.forEach((person) => {
    const normalizedValues = {};
    Object.entries(person).forEach(([key, value]) => {
      if (key !== "nama") {
        const xn = xnValues[key];
        normalizedValues[key] = value / xn;
      }
    });
    normalizationMatrix.push(normalizedValues);
  });

  return normalizationMatrix;
}

// Calculate normalization matrix R
export const normalizationMatrixR = calculateNormalizationMatrix(
  dummyData,
  resultXn
);

// Function to calculate normalized matrix Y
export function calculateNormalizedMatrixY(
  normalizationMatrixR,
  weightCriteria
) {
  const normalizedMatrixY = [];

  normalizationMatrixR.forEach((person) => {
    const normalizedValues = {};
    Object.entries(person).forEach(([key, value]) => {
      if (key !== "nama") {
        const weight = weightCriteria[key];
        normalizedValues[key] = value * weight;
      }
    });
    normalizedMatrixY.push(Object.values(normalizedValues));
  });

  return normalizedMatrixY;
}

// Calculate normalized matrix Y
export const normalizedMatrixY = calculateNormalizedMatrixY(
  normalizationMatrixR,
  weightCriteria
);

// Function to Find min and max values
export const groupAndFindMinMaxValues = (normalizedMatrixY) => {
  const groupedY = Array.from({ length: normalizedMatrixY[0].length }, () =>
    Array(normalizedMatrixY.length).fill(0)
  );

  normalizedMatrixY.forEach((person, personIndex) => {
    person.forEach((value, criteriaIndex) => {
      groupedY[criteriaIndex][personIndex] = value;
    });
  });

  const minMaxValues = groupedY.map((group) => {
    const min = Math.min(...group);
    const max = Math.max(...group);
    return { min, max };
  });

  return minMaxValues;
};

// Find min and max values
export const findMinMaxValues = groupAndFindMinMaxValues(normalizedMatrixY);

// Function to calculate positive ideal solution (D+)
export function calculateAPlus(normalizedMatrixY) {
  const aPlus = [];
  const numCriteria = normalizedMatrixY[0].length;

  for (let i = 0; i < numCriteria; i++) {
    const max = Math.max(...normalizedMatrixY.map((person) => person[i]));
    aPlus.push(max);
  }

  return aPlus;
}

// Calculate A+
export const aPlus = calculateAPlus(normalizedMatrixY);

// Function to calculate negative ideal solution (D-)
export function calculateAMinus(normalizedMatrixY) {
  const aMinus = [];
  const numCriteria = normalizedMatrixY[0].length;

  for (let i = 0; i < numCriteria; i++) {
    const min = Math.min(...normalizedMatrixY.map((person) => person[i]));
    aMinus.push(min);
  }

  return aMinus;
}

// Calculate A-
export const aMinus = calculateAMinus(normalizedMatrixY);

// Function to calculate Euclidean distance
export function calculateEuclideanDistance(vectorX, vectorY) {
  return Math.sqrt(
    vectorX.reduce(
      (sum, value, index) => sum + Math.pow(value - vectorY[index], 2),
      0
    )
  );
}

// Function to calculate distances to D+ and D- for each person
export function calculateDistancesToDPlusAndDMinus(
  normalizedMatrixY,
  aPlus,
  aMinus
) {
  const distancesToDPlus = [];
  const distancesToDMinus = [];

  normalizedMatrixY.forEach((person) => {
    const distanceToDPlus = calculateEuclideanDistance(person, aPlus);
    const distanceToDMinus = calculateEuclideanDistance(person, aMinus);

    distancesToDPlus.push(distanceToDPlus);
    distancesToDMinus.push(distanceToDMinus);
  });

  return {
    distancesToDPlus,
    distancesToDMinus,
  };
}

// Calculate distances to D+ and D-
export const { distancesToDPlus, distancesToDMinus } =
  calculateDistancesToDPlusAndDMinus(normalizedMatrixY, aPlus, aMinus);

// Function to calculate preference values for each alternative
export function calculatePreferenceValues(distancesToDPlus, distancesToDMinus) {
  const preferenceValues = [];

  distancesToDPlus.forEach((distanceDPlus, index) => {
    const distanceDMinus = distancesToDMinus[index];
    const preferenceValue = distanceDMinus / (distanceDMinus + distanceDPlus);

    preferenceValues.push(preferenceValue);
  });

  return preferenceValues;
}

// Calculate preference values
export const preferenceValues = calculatePreferenceValues(
  distancesToDPlus,
  distancesToDMinus
);
