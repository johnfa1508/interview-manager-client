import Header from '../../components/headerComponents/header';
import InterviewDashboard from '../../components/dashboardPage/interviewDashboard';
import NavBar from '../../components/navComponents/navigation';
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
