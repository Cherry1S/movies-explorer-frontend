import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Register({ onSubmit, isLoading }) {

  return (
    <main className="main">
      <AuthForm title="Добро пожаловать!" buttonSubmitText="Зарегистрироваться" onSubmit={onSubmit} isLoading={isLoading} />
      <p className="auth__text">Уже зарегистрированы?<Link to="/signin" className="auth__link">Войти</Link></p></main>
  );
}

export default Register;
