import { NotFound } from '../not-found';
import { Props } from './app-props';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../main-page';
import SignIn from '../sign-in';
import Favorites from '../Favorites';
import Room from '../Room';
import PrivateRoute from './private-route';


function App(props: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage offersCount={236} />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/favorites' element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path='/offer/:id' element={<Room />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
