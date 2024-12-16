import { useState, useEffect } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Header from '../../components/headerComponents/header';
import NavBar from '../../components/navComponents/navigation';
import Searchbar from '../../components/common/searchbar';
import LogbookTable from '../../components/logbookPage/logbookTable';
import useModal from '../../hooks/useModal';
import LogFormModal from '../../components/logbookPage/logFormModal';
import { logLabels } from '../../service/constants';
import CheckboxDropdown from '../../components/logbookPage/checkboxDropdown';
import './style.css';
import { getLogbookByIdAsync } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';

export default function LogbookPage() {
  const [logbookData, setLogbookData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const { openModal, setModal } = useModal();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    fetchLogbookData();
  }, []);

  const fetchLogbookData = async () => {
    try {
      const data = await getLogbookByIdAsync(loggedInUser.logbookId);

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
    setModal(
      'Create a new log',
      <LogFormModal isEditing={false} fetchLogbookData={fetchLogbookData} />
    );
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
            <LogbookTable
              logbookData={logbookData}
              filteredLogs={searchFilteredLogs}
              fetchLogbookData={fetchLogbookData}
            />
          ) : (
            <p>Loading logbook...</p>
          )}
        </div>
      </div>
    </>
  );
}
