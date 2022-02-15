import { Props } from '../..';
import MainPage from '../MainPage';

function App(props: Props): JSX.Element {
  return <MainPage offersCount={props.offersCount} />;
}

export default App;
