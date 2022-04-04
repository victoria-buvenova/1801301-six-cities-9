import { Navigate } from 'react-router-dom';
import { AUTHORIZATION_STATUS } from '../../constants';


type PrivateRouteProps = {
  children: JSX.Element,
  authStatus: AUTHORIZATION_STATUS
};

function PrivateRoute({ children, authStatus }: PrivateRouteProps): JSX.Element {
  const hasAccess = authStatus === AUTHORIZATION_STATUS.AUTH;
  // eslint-disable-next-line no-console
  console.log('status', authStatus);
  return hasAccess ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
