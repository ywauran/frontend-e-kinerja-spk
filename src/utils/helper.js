export function transformData(inputData) {
  return inputData.map((item) => {
    return {
      nama: item.name,
      efektivitas: item.employee_criterium.effectiveness,
      efisiensi: item.employee_criterium.efficiency,
      inovasi: item.employee_criterium.innovation,
      kerjaSama: item.employee_criterium.collaboration,
      kecepatan: item.employee_criterium.speed,
      tanggungJawab: item.employee_criterium.responsibility,
      ketaatan: item.employee_criterium.compliance,
    };
  });
}
