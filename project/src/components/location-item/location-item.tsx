import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLocation } from '../../store/app-process/selectors';
import { changeLocation } from '../../store/app-process/app-process';
import {Location} from '../../const';


type LocationItemProps = {
  location: Location;
};

export default function LocationItem({location}: LocationItemProps): JSX.Element {

  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector(getLocation);

  return (
    <li className="locations__item">
      <Link
        className={clsx('locations__item-link tabs__item', {
          'tabs__item--active': location === currentLocation
        })} to="#/"
        onClick={(event) => {
          event.preventDefault();
          dispatch(changeLocation(location));
        }}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}
