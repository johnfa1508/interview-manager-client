import { useState, useEffect } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import Searchbar from '../../components/searchbar';
import LogbookTable from '../../components/logbookTable';
import useModal from '../../hooks/useModal';
import LogFormModal from '../../components/logFormModal';
// import { logbooksMockData } from '../../service/mockData';
import { logLabels } from '../../service/constants';
import CheckboxDropdown from '../../components/checkboxDropdown';
import './style.css';
import { getLogbookByIdAsync } from '../../service/apiClient';

export default function LogbookPage() {
  const [logbookData, setLogbookData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const { openModal, setModal } = useModal();

  useEffect(() => {
    fetchLogbookData();
  }, []);

  const fetchLogbookData = async () => {
    try {
      const data = await getLogbookByIdAsync();

      // Extract $values arrays
      const logs = data.logs.$values.map((log) => ({
        ...log,
        label: log.label.$values
      }));

      setLogbookData({ ...data, logs });
    } catch (error) {
      console.error('Error fetching logbook data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLabelChange = (selectedOptions) => {
    setSelectedLabels(selectedOptions);
  };

  const showModal = () => {
    setModal('Create a new log', <LogFormModal isEditing={false} />);
    openModal();
  };

  const searchFilteredLogs =
    logbookData?.logs?.filter((log) => {
      // Finds logs matching title based on search value
      const matchesTitle = log.title.toLowerCase().includes(searchValue.toLowerCase());

      // Finds logs matching selected labels
      const matchesLabels =
        selectedLabels.length === 0 || selectedLabels.every((label) => log.label.includes(label));

      // Returns logs that match both title and labels
      return matchesTitle && matchesLabels;
    }) || [];

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
              placeholder="Search for a log title..."
            />

            <CheckboxDropdown
              options={logLabels}
              selectedOptions={selectedLabels}
              onChange={handleLabelChange}
            />

            <MdOutlineAddCircleOutline className="add-interview-icon" onClick={showModal} />
          </div>

          {logbookData ? (
            <LogbookTable logbookData={logbookData} filteredLogs={searchFilteredLogs} />
          ) : (
            <p>Loading logbook...</p>
          )}
        </div>
      </div>
    </>
  );
}
