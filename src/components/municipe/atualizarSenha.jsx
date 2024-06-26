import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import updateUser from "../user/api";

function RecuperarForm() {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    setFormData({
      ...formData,
      username: username
    });
  }, [username]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(username, formData);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      // O erro será tratado pela função updateUser
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Atualizar Usuário</h1>
      <div className="input-container">
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="input-container">
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button type="submit">Atualizar</button><br></br><br></br>
      <Link to="/recuperarSenha" style={{ textDecoration: 'none' }}>Voltar</Link>
    </form>
  );
}

export default RecuperarForm;
