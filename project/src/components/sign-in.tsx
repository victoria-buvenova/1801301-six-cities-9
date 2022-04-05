import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { APIRoute, AUTHORIZATION_STATUS } from '../constants';
import { getRequireAuthorization } from '../selectors/get-require-authorization';
import { authorizationCompleted } from '../store/action';
import { loginAction } from '../store/api-action';
import { Auth } from '../types/auth-types';
import { isPasswordValid } from '../utils';

const checkPassword = (name: string, password: string) => isPasswordValid(password) && name;

const getNameAndPassword = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const name = formData.get('email');
  const password = formData.get('password');
  if (typeof name !== 'string') {
    throw new Error('error');
  }
  if (typeof password !== 'string') {
    throw new Error('wrong type of value for pass');
  }
  return { name, password };
};

function SignIn(): JSX.Element {
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(getRequireAuthorization);
  const onSubmit = (authData: Auth) => {
    dispatch(loginAction(authData));
  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { name, password } = getNameAndPassword(evt.currentTarget);
    if (checkPassword(name, password)) {
      dispatch(authorizationCompleted());
      onSubmit({
        email: name,
        password: password,
      });
      navigate(APIRoute.Main);
    } else {
      setErrMessage('error');
    }
  };
  if (authStatus === AUTHORIZATION_STATUS.AUTH) {
    return <Navigate to={APIRoute.Main} />;
  }
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={APIRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {errMessage ? <p> {errMessage} </p> : null}
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#work-in-progress">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
