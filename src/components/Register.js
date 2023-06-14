import React from 'react';
import { Link } from 'react-router-dom'
function Register({ onRegister, renderLoading }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input id="register-email" required className="register__input" type="email" placeholder="Email" defaultValue="" name="email" onChange={handleEmail} />
        <input id="register-password" required className="register__input" type="password" placeholder="Пароль" defaultValue="" name="password" onChange={handlePassword}/>
        <button type="submit" className="register__button">{renderLoading}</button>
      </form>
      <p className="register__question">Уже зарегистрированы?{" "}<Link to="/sign-in" className="register__link">Войти</Link></p>
    </div>
  )
}

export default Register