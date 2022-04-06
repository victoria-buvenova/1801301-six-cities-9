import { Navigate } from 'react-router-dom';
import { AUTHORIZATION_STATUS } from '../../constants';


type PrivateRouteProps = {
  children: JSX.Element,
  authStatus: AUTHORIZATION_STATUS
};

const privateRouteSettings: Record<
  AUTHORIZATION_STATUS,
  (c: JSX.Element) => JSX.Element | null
> = {
  [AUTHORIZATION_STATUS.AUTH]: (children: JSX.Element) => children,
  [AUTHORIZATION_STATUS.UNKNOWN]: () => null,
  [AUTHORIZATION_STATUS.NO_AUTH]: () => <Navigate to="/login" />,
};

function PrivateRoute({ children, authStatus }: PrivateRouteProps): JSX.Element|null {
  return privateRouteSettings[authStatus](children);
}

export default PrivateRoute;
