import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortType } from '../../const';
import { changeSort, updateOffers } from '../../store/actions';
import useOnClickOutside from '../../hooks/useOnClickOutside/useOnClickOutside';

export default function Sort(): JSX.Element {

  const [open, setOpen] = useState(false);
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();
  const refOne = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = () => {
    setOpen(false);
  };
  useOnClickOutside(refOne, clickOutsideHandler);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        ref={refOne}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx ('places__options places__options--custom', {
          'places__options--opened': open
        })}
      >
        {Object.entries(SortType).map(([,value]) => (
          <li
            key={value}
            className={clsx('places__option', {
              'places__option--active': value === sortType
            })}
            tabIndex={0}
            onClick={() => {
              setOpen(false);
              dispatch(changeSort(value));
              dispatch(updateOffers());
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

