import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Register = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não conferem')
      .required('Confirmação de senha é obrigatória'),
  });

  const handleSubmit = (values) => {
    console.log('Register:', values);
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <Field name="name" type="text" placeholder="Nome" className="form-control" />
              {errors.name && touched.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <Field name="email" type="email" placeholder="Email" className="form-control" />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <Field name="password" type="password" placeholder="Senha" className="form-control" />
              {errors.password && touched.password && <div className="error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <Field name="confirmPassword" type="password" placeholder="Confirmar Senha" className="form-control" />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="btn-submit">Registrar</button>
            <p>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;