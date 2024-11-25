import  { useEffect, useState } from 'react';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import { getUserInterviewsAsync } from '../../service/apiClient';
import './style.css';

export default function ArchivePage() {
  const [interviews, setInterviews] = useState([]);

      async function fetchData() {
        try {
             const data = await getUserInterviewsAsync();
      setInterviews(data);
          
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
   
    }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <div className="dashboard-content">
        <h1>Archive</h1>
        <div className="archive">
          {interviews.map((interview, index) => (
            <div key={index} className="archive-item">
              <h3>{interview.Title}</h3>
              <p><strong>Description:</strong> {interview.Description}</p>
              <p><strong>Time:</strong> {interview.Time}</p>
              <p><strong>Address:</strong> {interview.Address}</p>
              <p><strong>Duration:</strong> {interview.Duration}</p>
              <p><strong>Status:</strong> {interview.Status}</p>
              <p><strong>Company Name:</strong> {interview.CompanyName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}