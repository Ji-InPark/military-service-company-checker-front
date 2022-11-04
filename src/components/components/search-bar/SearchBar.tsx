import { css } from '@emotion/react';
import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  autocompleteHoverIndexAtoms,
  companyListAtoms,
  isLoadingAtoms,
  selectedGovernmentLocationAtoms,
  selectedPageNumberAtoms,
  selectedSectorAtoms,
} from '../../../recoil/atoms';
import { CompanyListType } from '../../../types';
import search from '../../../axios';
import SearchOptionContainer from './search-option/SearchOptionContainer';
import PaginationContainer from './page/PaginationContainer';
import SearchInput from './search-input/SearchInput';

function SearchBar() {
  const setCompanyList = useSetRecoilState(companyListAtoms);
  const inputElement = useRef<HTMLInputElement>(null);
  const setIsLoading = useSetRecoilState(isLoadingAtoms);
  const governmentLocation = useRecoilValue(selectedGovernmentLocationAtoms);
  const sector = useRecoilValue(selectedSectorAtoms);
  const setSelectedPageNumber = useSetRecoilState(selectedPageNumberAtoms);
  const setHoverIndex = useSetRecoilState(autocompleteHoverIndexAtoms);

  const searchCompany = (searchText: string | undefined, useOption: boolean) => {
    setHoverIndex(-1);

    setIsLoading(true);

    setSelectedPageNumber(0);

    search
      .post<CompanyListType>('/search', {
        companyName: searchText,
        governmentLocation: useOption ? governmentLocation : '',
        sector: useOption ? sector : '',
      })
      .then((response) => {
        setCompanyList(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '1rem',
        alignItems: 'center',
        padding: '1.5rem',
      })}
    >
      <SearchInput inputElement={inputElement} searchCompany={searchCompany} />
      <SearchOptionContainer inputElement={inputElement} searchCompany={searchCompany} />
      <PaginationContainer />
    </div>
  );
}

export default SearchBar;
