import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Routes, AuthorizationStatus } from '../../constants';
import { getRequireAuthorization } from '../../selectors/get-require-authorization';
import { loginAction } from '../../store/api-action';
import { State } from '../../store/reducer';
import { isEmailValid, isPasswordValid } from '../../utils';

const checkPassword = (name: string, password: string) => isPasswordValid(password) && isEmailValid(name);

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
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const dispatch = useDispatch();
  const loginMessage = useSelector((state: State) => state.loginMessage);
  const authStatus = useSelector(getRequireAuthorization);
  useEffect(() => { setPasswordErrMsg(loginMessage || ''); }, [loginMessage]);
  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { name, password } = getNameAndPassword(evt.currentTarget);
    if (checkPassword(name, password)) {
      dispatch(loginAction({ email: name, password }));
    } else {
      if (!isPasswordValid(password)) {
        setPasswordErrMsg('Password must meet reqirements');
      }
      if (!isEmailValid(name)) {
        setEmailErrMessage('Email is not valid');
      }
    }
  };
  if (authStatus === AuthorizationStatus.AUTH) {
    return <Navigate to={Routes.Main} />;
  }
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={Routes.Main}>
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
            {passwordErrMsg ? <p style={{ color: 'red' }}> {passwordErrMsg} </p> : null}
            {emailErrMessage ? <p style={{ color: 'red' }}> {emailErrMessage} </p> : null}
            <form onSubmit={submitHandle} className="login__form form" action="#" method="post">
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
              <Link className="locations__item-link" to={Routes.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
