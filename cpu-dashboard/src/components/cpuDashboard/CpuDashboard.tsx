import CpuLoadHistory from '../cpuLoadHistory/CpuLoadHistory';
import CpuLoadStatus from '../cpuLoadStatus/CpuLoadStatus';
import './CpuDashboard.css';

function CpuDashboard() {
  return (
    <div className="cpu-dashboard-container">
      <CpuLoadStatus />
      <CpuLoadHistory />
    </div>
  );
}

export default CpuDashboard;
