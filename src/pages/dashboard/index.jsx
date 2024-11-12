import Header from '../../components/header';
import InterviewDashboard from '../../components/interviewDashboard';
import NavBar from '../../components/navigation';
import './style.css';

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <div className="dashboard-content">
        <InterviewDashboard />
      </div>
    </div>
  );
}
