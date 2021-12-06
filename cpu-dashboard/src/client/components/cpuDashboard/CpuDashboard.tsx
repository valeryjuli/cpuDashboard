import { useEffect, useState, createContext } from 'react';
import { Queue } from '../../../dataStructures/queue';
import CpuLoadHistory from '../cpuLoadHistory/CpuLoadHistory';
import CpuLoadStatus from '../cpuLoadStatus/CpuLoadStatus';
import { CPUDataContextState, CPULoadDataPoint } from '../dataLoader/data-types';
import { CPUDataLoader } from '../dataLoader/data-loader';
import './CpuDashboard.css';
import { cpuUsage } from 'process';

/**
 * Maximum number of data points to store on frontend side.
 */
const MAX_DATA_POINTS = 50;
/**
 * Start CPU data context value.
 */
const defaultCpuDataContextState: CPUDataContextState = {
  cpuLoadData: new Queue<CPULoadDataPoint>(MAX_DATA_POINTS),
}
/**
 * Context guarding the cpu data queue state.
 */
export const CPULoadData = createContext<CPUDataContextState>(defaultCpuDataContextState);

/**
 * Main component that updates every 10s the CPULoadData context with the cpu load data
 * and provides it as context to the dashboard elements.
 */
const CpuDashboard = () => {

  let dataLoader: CPUDataLoader;
  const [cpuLoadData, setCpuLoadData] = useState<CPUDataContextState>(defaultCpuDataContextState);

  useEffect(() => {
    dataLoader = new CPUDataLoader(MAX_DATA_POINTS);
    const loadDataInterval = setInterval(() => {
      loadCPULoadData();
    }, 500);
    
    return () => clearInterval(loadDataInterval);
  }, [])
  
  useEffect(() => {
    console.log('UPDATED', cpuLoadData);
  }, [cpuLoadData])

  /**
   * Load data to dataQueue and update context state
   */
  const loadCPULoadData = async () => {
    await dataLoader.enqueueCPULoadStatistic();
    setCpuLoadData(
      {...cpuLoadData ,
      cpuLoadData :dataLoader.dataHistory
    });
  }

  return (
    <div className="cpu-dashboard-container">
      <CPULoadData.Provider 
        value={cpuLoadData} >
        <CpuLoadStatus />
        <CpuLoadHistory />
      </CPULoadData.Provider >
    </div>
  );
}

export default CpuDashboard;
