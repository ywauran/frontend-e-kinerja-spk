import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [position, setPosition] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEmployeeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employee/${id}`
        );
        setName(response.data.name);
        setEmail(response.data.email);
        setNip(response.data.nip);
        setPosition(response.data.position);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getEmployeeById();
  }, [id]);

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/employee/${id}`, {
        name: name,
        email: email,
        nip: nip,
        position: position,
      });
      navigate("/employees");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl">Edit Karyawan</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateEmployee}>
              <p className="has-text-centered">{msg}</p>
              <div className="flex flex-col space-y-4">
                <div className="field">
                  <label className="label">Nama</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Product Name"
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
                      placeholder="Email"
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
                  <label className="label">Posisi</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="Posisi"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button type="submit" className="btn-primary">
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditEmployee;
