import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';

function LoginFormAuth() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState('');

  const checkPassword = (plainPassword, hashedPassword) => {//Método Hash
    return bcrypt.compareSync(plainPassword, hashedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // const response = await axios.get('http://localhost:8080/users');//Buscando usuarios
      const response = await axios.get('https://siteprotoon.azurewebsites.net/users');//Buscando usuarios
      const users = response.data;
      const user = users.find(u => u.username === username);
      if (user) {
        if (checkPassword(password, user.password)) {
          console.log('Login bem-sucedido!');
          alert('Login bem-sucedido!');

          const loginResponse = await axios.get('http://localhost:8080/authenticate', {//Obtendo Token
            auth: {
              username: username,
              password: password
            }
          });

          const token = loginResponse.data;
          // console.log('Token JWT:', token);
          const role = jwtDecode(token).scope.split('_').pop().toUpperCase();//Pegando a role do token

          // console.log(role);

          localStorage.setItem('role', role);
          localStorage.setItem('username', username);

          if (role === "ADMIN") {
            navigate('/welcomeAdmin');

          } else if (role === "MUNICIPE") {
            navigate('/welcomeUser', { state: { username, password, role, token } });
          }
        } else {
          alert('Senha Inválida!');
        }
      } else {
        alert('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    };

  }
  useEffect(() => { //Aqui é para listar os usuários na tela de Login para teste
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
        const role = localStorage.getItem('role');

        
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username) => {
    try {
      if (window.confirm('Tem certeza que deseja remover este usuário?')) {
        await axios.delete(`http://localhost:8080/users/${username}`);// Para deletar usuario do banco de dados
        setUsers(users.filter(user => user.username !== username));
        alert('Usuário deletado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      alert('Erro ao deletar o usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div>      
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-container">
            <div className="input-container">
              <label>Username </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Login de Administrador</button>
          <br />
          <br />
          </form>
          {errorMessage ? (
        <p>{errorMessage}</p>        
      ) :
      <div> 
          <Link to="/registerUser">cadastrar um Usuário</Link>
        <div>
          <h3>Lista de Usuários</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {users.map((user, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>

                <div style={{width: 300}}>User: {user.username}</div>
                <div>Role: {user.role ? user.role : "MUNICIPE"}</div>
                <div>
                  {user.username !== "admin" && (
                    <button onClick={() => handleDelete(user.username)}>Excluir</button>
                  )}
                </div>
                <div>
                  {user.username !== "admin" && (
                    <button onClick={() => navigate(`/updateUser/${user.username}`)}>Editar</button>
                  )}
                </div>
              </div>              
            ))}
          </ul>
        </div>
      </div>} 
      <Link to="/home">Voltar</Link><br></br><br></br>     
    </div>
  );
}

export default LoginFormAuth;
