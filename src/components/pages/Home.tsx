import SearchBar from '../components/search-bar/SearchBar';
import { css } from '@emotion/react';
import Header from '../components/Header';
import CompanyList from '../components/company/CompanyList';
import { useRecoilValue } from 'recoil';
import { isLoadingAtoms } from '../../recoil/atoms';
import LoadingModal from '../components/modal/LoadingModal';
import Footer from '../components/Footer';

function Home() {
  const isLoading = useRecoilValue(isLoadingAtoms);
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
      })}
    >
      <Header />
      <SearchBar />
      <CompanyList />
      <Footer />
      {isLoading && <LoadingModal />}
    </div>
  );
}

export default Home;
