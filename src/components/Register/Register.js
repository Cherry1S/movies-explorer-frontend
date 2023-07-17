import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return (
    <main className="main">
      <AuthForm
        typeForm="register"
        title="Добро пожаловать!"
        buttonSubmitText="Зарегистрироваться"
      />

      <p className="auth__text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="auth__link">
          Войти
        </Link>
      </p>
    </main>
  );
}

export default Register;
