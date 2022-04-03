import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AUTHORIZATION_STATUS } from '../../constants';
import { getRequireAuthorization } from '../../selectors/get-require-authorization';

type PrivateRouteProps = {
  children: JSX.Element
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useSelector(getRequireAuthorization);
  const hasAccess = authStatus === AUTHORIZATION_STATUS.AUTH;
  return hasAccess ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
