import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalUpdate = ({ setIsOpenModalUpdate, id }) => {
  const [effectiveness, setEffectiveness] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [innovation, setInnovation] = useState(0);
  const [collaboration, setCollaboration] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [responsibility, setResponsibility] = useState(0);
  const [compliance, setCompliance] = useState(0);

  const getEmployeeCriteria = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/employee/criteria/${id}`
      );
      const { result } = response.data;
      setEffectiveness(result.effectiveness);
      setEfficiency(result.efficiency);
      setInnovation(result.innovation);
      setCollaboration(result.collaboration);
      setSpeed(result.speed);
      setResponsibility(result.responsibility);
      setCompliance(result.compliance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeCriteria();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/employee/criteria/${id}`,
        {
          effectiveness,
          efficiency,
          innovation,
          collaboration,
          speed,
          responsibility,
          compliance,
        }
      );
      setIsOpenModalUpdate(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">
          <h3 className="text-xl font-semibold text-gray-900">Kriteria</h3>
          <button
            type="button"
            onClick={() => setIsOpenModalUpdate(false)}
            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="effectiveness"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Effectiveness
              </label>
              <select
                name="effectiveness"
                id="effectiveness"
                value={effectiveness}
                onChange={(e) => setEffectiveness(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="efficiency"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Efficiency
              </label>
              <select
                name="efficiency"
                id="efficiency"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="innovation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Innovation
              </label>
              <select
                name="innovation"
                id="innovation"
                value={innovation}
                onChange={(e) => setInnovation(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="collaboration"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Collaboration
              </label>
              <select
                name="collaboration"
                id="collaboration"
                value={collaboration}
                onChange={(e) => setCollaboration(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="speed"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Speed
              </label>
              <select
                name="speed"
                id="speed"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="responsibility"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Responsibility
              </label>
              <select
                name="responsibility"
                id="responsibility"
                value={responsibility}
                onChange={(e) => setResponsibility(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="compliance"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Compliance
              </label>
              <select
                name="compliance"
                id="compliance"
                value={compliance}
                onChange={(e) => setCompliance(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                required
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
