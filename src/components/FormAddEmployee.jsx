import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [position, setPosition] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const createEmployee = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to create an employee
      await axios.post("http://localhost:5000/employee", {
        name,
        email,
        nip,
        position,
      });

      // Redirect to the employees page after successful creation
      navigate("/employees");
    } catch (error) {
      // Handle errors, display error message if available
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl">Tambah Karyawan</h2>
      <div className="mt-6">
        <form onSubmit={createEmployee}>
          <p className="has-text-centered">{msg}</p>
          <div className="flex flex-col space-y-4">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Employee Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Employee Email"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">NIP</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="NIP"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Position</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Position"
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" className="btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddProduct;
