import { NotFound } from '../not-found';
import { Props } from './app-props';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../main-page';
import SignIn from '../sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import PrivateRoute from './private-route';
import { useState } from 'react';


function App(props: Props): JSX.Element {
  const { offers } = props;
  const [active, setActive] = useState(undefined as number | undefined);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage offers={offers} setActive={setActive} active={active} />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/favorites' element={
          <PrivateRoute>
            <Favorites offers={offers.filter((offer) => offer.isFavorite === true)} />
          </PrivateRoute>
        }
        />
        <Route path='/offer/:id' element={<Room setActive={setActive} active={active} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
