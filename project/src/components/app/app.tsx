import { NotFound } from '../not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import PrivateRoute from './private-route';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSortedOffers } from '../../selectors/get-sorted-offers';
import { getRequireAuthorization } from '../../selectors/get-require-authorization';
import { getFavorites } from '../../selectors/get-favorites';


function App(): JSX.Element {
  const [active, setActive] = useState(undefined as number | undefined);
  const offers = useSelector(getSortedOffers);
  const favorites = useSelector(getFavorites);
  const authStatus = useSelector(getRequireAuthorization);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage offers={offers} setActive={setActive} active={active} />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/favorites' element={
          <PrivateRoute authStatus={authStatus}>
            <Favorites offers={favorites} />
          </PrivateRoute>
        }
        />
        <Route path='/offer/:id' element={<Room offers={offers} setActive={setActive} active={active} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
