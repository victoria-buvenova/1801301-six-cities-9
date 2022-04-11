import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Routes, AuthorizationStatus } from '../../constants';
import { getCurrentUserName } from '../../selectors/get-current-user-name';
import { getRequireAuthorization } from '../../selectors/get-require-authorization';
import { logoutAction } from '../../store/api-action';


function Header() {
  const userName = useSelector(getCurrentUserName);
  const authStatus = useSelector(getRequireAuthorization);
  const dispatch = useDispatch();
  const hasAccess = authStatus === AuthorizationStatus.AUTH;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={Routes.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {hasAccess ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={Routes.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userName}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" onClick={() => dispatch(logoutAction())} to={Routes.Main}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={Routes.Login}>
                    <span className="header__signout">Sign in</span>
                  </Link>
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
