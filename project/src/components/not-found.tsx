import { Link } from 'react-router-dom';

export function NotFound(): JSX.Element {
  return (
    <div style={{
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
    }}
    >
      <div>
        <h1>
          Page not found
        </h1>
        <Link to='/'>Return to home page</Link>
      </div>
    </div>
  );
}
