import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_TYPE } from '../../constants';
import { getCurrentSortBy } from '../../selectors/get-current-sort-by';
import { sortByChange } from '../../store/action';

function SortingTypes() {
  const currentSortBy = useSelector(getCurrentSortBy);
  const [sortingDropdown, setSortingDropdown] = React.useState(false);
  const dispatch = useDispatch();
  const handleSortingClick = (sortingType: string) => {
    dispatch(sortByChange(sortingType));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by &nbsp;</span>
      <span onClick={() => setSortingDropdown((prevState) => !prevState)} className="places__sorting-type" tabIndex={0}>
        {SORT_TYPE[currentSortBy]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortingDropdown ? 'places__options--opened' : ''}`}>
        {Object.entries(SORT_TYPE).map(([key, sortingType]) => <li onClick={() => handleSortingClick(key)} key={key} className={`places__option ${sortingType === currentSortBy ? 'places__option--active' : ''}`} tabIndex={0}>{sortingType}</li>)}
      </ul>
    </form>
  );
}

export default SortingTypes;
