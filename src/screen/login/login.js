import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const handleSubmit = (values) => {
    console.log('Login:', values);
    // Simulação de autenticação bem-sucedida
    localStorage.setItem('isAuthenticated', 'true');
    
    // Disparar um evento de storage para notificar outras partes da aplicação
    window.dispatchEvent(new Event('storage'));
    
    // Navegar para a página inicial
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <Field name="email" type="email" placeholder="Email" className="form-control" />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <Field name="password" type="password" placeholder="Senha" className="form-control" />
              {errors.password && touched.password && <div className="error">{errors.password}</div>}
            </div>

            <button type="submit" className="btn-submit">Entrar</button>
            <p>
              Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;