import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizationCompleted } from '../store/action';

const checkPassword = (name: string, password: string) => password === '12345' && name === 'ac@js.com';

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
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { name, password } = getNameAndPassword(evt.currentTarget);
    if (checkPassword(name, password)) {
      dispatch(authorizationCompleted());
      navigate('/favorites');
    } else {
      setErrMessage('error');
    }
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
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
