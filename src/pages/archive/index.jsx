import { useEffect, useState } from 'react';
import Header from '../../components/header';
import NavBar from '../../components/navigation';
import { getUserInterviewsAsync } from '../../service/apiClient';
import './style.css';

export default function Archive() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserInterviewsAsync();
      setInterviews(data);
    }
    fetchData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <div className="dashboard-content">
        <h1>Archive</h1>
        <div className="archive">
          <table className="archive-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview, index) => (
                <tr key={index}>
                  <td>{interview.description}</td>
                  <td>{interview.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
