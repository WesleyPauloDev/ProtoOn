import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterFormUser() {
  const [role, setRole] = useState("MUNICIPE"); //Seta o radio Button paa Municipe
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "MUNICIPE"
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") { //Escuta radio button
      setRole(value);
      setFormData({
        ...formData,
        role: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/users", {
      username: formData.username,
      password: formData.password,
      role: formData.role ? formData.role : "MUNICIPE"
    }).then(response => {
      console.log(response.data);
      alert("Dados enviados com sucesso!");
    }).catch(error => {
      console.error("Erro ao enviar os dados:", error);
    });

  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Cadastro</h1>
      <div className="input-container">
        <div className="input-container">
          <label style={{ marginBottom: -10 }}>Username </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-container">
        <div className="input-container">
          <label style={{ marginBottom: -10 }}>Password </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="register-form">
        <div className="input-container">
          <label style={{ marginBottom: -10 }}>Role:</label>
          <label style={{ marginRight: 80 }}>
            <input style={{ marginRight: -80 }}
              type="radio"
              name="role"
              value="MUNICIPE"
              checked={role === "MUNICIPE"}
              onChange={handleChange}
            /> Municipe
          </label>
          <label style={{ marginRight: 100 }}>
            <input style={{ marginRight: -80 }}
              type="radio"
              name="role"
              value="ADMIN"
              checked={role === "ADMIN"}
              onChange={handleChange}
            />Admin
          </label>
        </div>
      </div>
      <button type="submit">Cadastrar-se</button><br></br><br></br>
      <Link to="/authenticate">Voltar</Link>
    </form>
  );
}

export default RegisterFormUser;

