import CpuLoadAlerts from './cpuLoadAlerts/CpuLoadAlerts';
import CpuLoadChart from './cpuLoadChart/CpuLoadChart';
import './CpuLoadHistory.css';

function CpuLoadHistory() {
  return (
    <div className="cpu-load-history">
      <h1>CPU Load History</h1>
      <CpuLoadChart />
      <CpuLoadAlerts />
    </div>
  );
}

export default CpuLoadHistory;
