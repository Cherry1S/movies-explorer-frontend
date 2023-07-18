import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onSubmit }) {

  return (
    <main className="main">
      <AuthForm title="Рады видеть!" buttonSubmitText="Войти" onSubmit={onSubmit} />
      <p className="auth__text">Ещё не зарегистрированы?<Link to="/signup" className="auth__link">Регистрация</Link></p>
    </main>
  );
}

export default Login;
