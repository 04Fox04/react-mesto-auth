import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      <Routes>
        <Route path="/" element={
          <div className="header__menu">
            <a className="header__email">{userEmail}</a>
            <Link className="header__exit" to="/sign-in" onClick={onSignOut}>Выйти</Link>
          </div>
        } />
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>}></Route>
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>}></Route>
      </Routes>
    </div>
  );
};

export default Header