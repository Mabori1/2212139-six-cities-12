import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import FavoritesPage from './favorites-page';
import HistoryRouter from '../../components/history-router/history-router';

const mockStore = configureMockStore();
const fakeFavoriteOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();

describe('Page: Favorites', () => {
  it('should render correctly if favoriteOffers empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Favorites]: {
        favorites: [],
        fetchStatus: FetchStatus.Success,
        setStatus: FetchStatus.Success
      }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Favorites]: {
        favorites: fakeFavoriteOffers,
        fetchStatus: FetchStatus.Success,
        setStatus: FetchStatus.Success
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
