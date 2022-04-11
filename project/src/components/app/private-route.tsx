import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';


type PrivateRouteProps = {
  children: JSX.Element,
  authStatus: AuthorizationStatus
};

const privateRouteSettings: Record<
  AuthorizationStatus,
  (c: JSX.Element) => JSX.Element | null
> = {
  [AuthorizationStatus.UNKNOWN]: () => null,
  [AuthorizationStatus.AUTH]: (children: JSX.Element) => children,
  [AuthorizationStatus.NO_AUTH]: () => <Navigate to="/login" />,
};

function PrivateRoute({ children, authStatus }: PrivateRouteProps): JSX.Element | null {
  const createMarkup = privateRouteSettings[authStatus];
  return createMarkup(children);
}

export default PrivateRoute;
