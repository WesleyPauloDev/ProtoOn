import React from 'react';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';

import Home from '../components/home-page/homePage';
import LoginForm from '../components/municipe/login';
import RegisterForm from '../components/municipe/register';
import EmailForm from '../components/municipe/recuperarSenha';
import RecuperarForm from '../components/municipe/atualizarSenha';
import LoginFormAuth from '../components/user/authenticate';
import TelaUser from '../components/user/welcomeUser';
import TelaAdmin from '../components/user/welcomeAdmin';
import RegisterFormUser from '../components/user/registerUser';
import UpdateFormUser from '../components/user/updateUser';

//Esta função, adiciona todos os components (que contém o html junto com funções), para serem exibidos conforme a url inserida
function AppRoutes() {
    return (
        <Router>
            <Routes>
            <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/cadastro" element={<RegisterForm />} />
                <Route path="/recuperarSenha" element={<EmailForm />} />
                <Route path="/atualizarSenha/:username" element={<RecuperarForm />} />
                <Route path="/authenticate" element={<LoginFormAuth />} />
                <Route path="/welcomeUser" element={<TelaUser />} />
                <Route path="/welcomeAdmin" element={<TelaAdmin />} />
                <Route path="/registerUser" element={<RegisterFormUser />} />
                <Route path="/updateUser/:username" element={<UpdateFormUser />} />
                {/* Adicione outras rotas aqui, se necessário */}
            </Routes>
        </Router>
    );
}
 export default AppRoutes;