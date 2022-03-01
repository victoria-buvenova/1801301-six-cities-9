import { Link } from 'react-router-dom';

export function NotFound(): JSX.Element {
  return (
    <div>
      <h1>
        Page not found
      </h1>
      <Link to='/'>Return to home page</Link>
    </div>
  );
}
