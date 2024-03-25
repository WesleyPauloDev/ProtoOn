import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
//Função que excecuta o login, contendo configurações do login e o formulário HTML
// function LoginForm() {
//     const navigate = useNavigate();

//     //Função assíncrona que lida com a parte de conexão com o backend, requerindo uma resposta do back
//     const handleSubmit = async () => { 
//       //TODO: É necessário configurar essa função corretamente após a construção da autenticação no back
//         try {
//           const response = await axios.get('http://localhost:8080/municipes');
//           // const response = await axios.get('https://proton-1710414195673.azurewebsites.net/municipes');

//           console.log(response.data); 
//           alert('Dados enviados com sucesso!');
//         } catch (error) {
//           console.error('Erro ao enviar os dados:', error);
//         }
//       };

//   //Função responsável para redirecionar para o /cadastro page
//   const handleCadastroClick = () => {
//     navigate('/cadastro'); // Redireciona para a página de cadastro
//   };

//   //É retornado o formulário html abaixo
//   return (
//     <div>
//       <header className="header">
//         <div className="title-proton">PROTO-ON</div>
//           <nav>
//             <ul className="nav-links">
//               <li><a href="/home">Home</a></li>
//               <li>
//                 <a href="#">Serviços</a>
//                 <ul className="submenu">
//                   <li><a href="#">Abrir reclamação</a></li>
//                   <li><a href="#">Consultar protocolos</a></li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="#">Mais</a>
//                 <ul className="submenu">
//                   <li><a href="#">Contato</a></li>
//                   <li><a href="#">Sobre nós</a></li>
//                 </ul>
//               </li>
//                 </ul>
//           </nav>
//       </header>
//       <div className="container">
//         <label>Login:</label>
//         <input type="text" />
//         <label className="lbl-password">Senha:</label>
//         <input type="password"/>
//       <div className="container-button">
//         <button type="submit" className="shadow__btn" onClick={handleSubmit}>Login</button>
//         <button type="button"  className="shadow__btn" onClick={() => (window.location.href = '/home')}>Voltar</button>
//       </div>
//       </div>
//       <footer className="footer">
//         © 2024 Proto-on. Todos os direitos reservados.
//       </footer>
//     </div>
//   );
// }

function LoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const checkPassword = (plainPassword, hashedPassword) => {//Método Hash
    return bcrypt.compareSync(plainPassword, hashedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.get('http://localhost:8080/users');//Buscando usuarios
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
    }
  };

  return (
    <div>
      <header className="header">
        <div className="title-proton">PROTO-ON</div>
        <nav>
          <ul className="nav-links">
            <li><a href="/home">Home</a></li>
            <li>
              <a href="#">Serviços</a>
              <ul className="submenu">
                <li><a href="#">Abrir reclamação</a></li>
                <li><a href="#">Consultar protocolos</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Mais</a>
              <ul className="submenu">
                <li><a href="#">Contato</a></li>
                <li><a href="#">Sobre nós</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-container">
              <label>Login:</label>
              <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value)} required />
              <label className="lbl-password">Senha:</label>
              <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required /><br></br>
            </div>
          </div>
          <Link to="/recuperarSenha">Esqueceu a senha Clique Aqui!</Link><br></br><br></br>
          <div className="container-button">
            <button type="submit" className="shadow__btn">Login</button>
            <button type="button" style={{ backgroundColor: 'blue' }} className="shadow__btn" onClick={() => (window.location.href = '/cadastro')}>Cadastre-se</button>
            <button type="button" className="shadow__btn" onClick={() => (window.location.href = '/home')}>Voltar</button>
          </div>
        </form>
      </div>
      <footer className="footer">
        © 2024 Proto-on. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default LoginForm;
