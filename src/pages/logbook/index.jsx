import './style.css';
import { logbooksMockData } from '../../service/mockData';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import { useEffect, useState } from 'react';
import LogbookTable from '../../components/logbookTable';
import Searchbar from '../../components/searchbar';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import useModal from '../../hooks/useModal';
import LogFormModal from '../../components/logFormModal';

export default function LogbookPage() {
  const [logbookData, setLogbookData] = useState(logbooksMockData);
  const [searchValue, setSearchValue] = useState('');
  const { openModal, setModal } = useModal();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // TODO: Fetch logbook data from backend later
  useEffect(() => {
    setLogbookData(logbooksMockData);
  }, []);

  const showModal = () => {
    setModal('Create a new log', <LogFormModal isEditing={false} />);

    openModal();
  };

  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <NavBar />

        <div className="dashboard-content">
          <div className="container-above-interview">
            <Searchbar
              searchValue={searchValue}
              handleChange={handleSearchChange}
              placeholder="Search for a log..."
            />
            <MdOutlineAddCircleOutline className="add-interview-icon" onClick={showModal} />
          </div>

          <LogbookTable data={logbookData} searchValue={searchValue} />
        </div>
      </div>
    </>
  );
}
