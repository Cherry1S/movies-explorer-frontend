import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return (
    <main className="main">
      <AuthForm typeForm="login" title="Рады видеть!" buttonSubmitText="Войти" />
      <p className="auth__text">Ещё не зарегистрированы?<Link to="/signup" className="auth__link">Регистрация</Link></p>
    </main>
  );
}

export default Login;
