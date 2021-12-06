import { Queue } from "../../../dataStructures/queue";

export interface CPULoadDataPoint {
    /**
     * Average cpu load at the timestamp
     */
    cpuLoad: number,
    /**
     * Date of average measured cpu load 
     */
    timestamp: Date,
}

export type CPUDataContextState = {
    cpuLoadData: Queue<CPULoadDataPoint>;
}