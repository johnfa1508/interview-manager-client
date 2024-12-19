import { useState } from 'react';
import Header from '../../components/headerComponents/header';
import NavBar from '../../components/navComponents/navigation';
import AvailableJobs from '../../components/availableJobs';
import './style.css';

export default function AvailableJobsPage() {
  const allJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Remote',
      company: 'Tech Corp',
      positions: 3,
      date: '2023-12-10'
    },
    {
      id: 2,
      title: 'Backend Developer',
      location: 'Oslo',
      company: 'DevWorks',
      positions: 2,
      date: '2023-12-08'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      location: 'Trondheim',
      company: 'DesignHub',
      positions: 1,
      date: '2023-12-05'
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      location: 'Remote',
      company: 'Innovate Tech',
      positions: 4,
      date: '2023-12-12'
    },
    {
      id: 5,
      title: 'Product Manager',
      location: 'Oslo',
      company: 'Growthify',
      positions: 1,
      date: '2023-12-09'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  const handleApply = (jobId) => {
    console.log(`Applied for job with id: ${jobId}`);
  };

  const handleDismiss = (jobId) => {
    console.log(`Dismissed job with id: ${jobId}`);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <div className="dashboard-content">
        <h1 className="page-title">Available Jobs</h1>
        <div className="filter-section">
          <input type="text" placeholder="Search for jobs..." className="filter-input" />
          <select className="filter-select">
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Oslo">Oslo</option>
            <option value="Trondheim">Trondheim</option>
          </select>
        </div>
        <AvailableJobs jobs={currentJobs} onApply={handleApply} onDismiss={handleDismiss} />
        <div className="pagination">
          <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
            {'<'}
          </button>
          <span className="pagination-info">
            Page {currentPage}/{totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
