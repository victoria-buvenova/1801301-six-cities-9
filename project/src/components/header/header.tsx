import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AUTHORIZATION_STATUS } from '../../constants';
import { getRequireAuthorization } from '../../selectors/get-require-authorization';

function Header() {
  const authStatus = useSelector(getRequireAuthorization);
  const hasAccess = authStatus === AUTHORIZATION_STATUS.AUTH;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active" href="#work-in-progress">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {hasAccess ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#work-in-progress">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/login">
                    <span className="header__signout">Sign in</span>
                  </a>
                </li>
              )}

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
