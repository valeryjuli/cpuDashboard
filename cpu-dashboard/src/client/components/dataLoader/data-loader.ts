import { Queue } from "../../../dataStructures/queue";
import { CPULoadDataPoint } from "./data-types";

/**
 * Loads CPU average load data points to a dataHistory queue with a specified max length.
 */
export class CPUDataLoader {
    /**
     * Queue with history of last maxDataPoints cpu average load values.
     */
    readonly dataHistory: Queue<CPULoadDataPoint>;

    constructor (maxDataPoints: number) {
        this.dataHistory = new Queue(maxDataPoints);
    }

    /**
     * Enqueue on the data history the latest cpu load
     * @returns a cpu load data with average cpu load and timestamp
     */
    async enqueueCPULoadStatistic(): Promise<CPULoadDataPoint> {
        const request = new Request('http://localhost:5000/cpuLoad');
        return fetch(request)
            .then((response: any) => response.json())
            .then((cpuLoadData: CPULoadDataPoint) => {
                this.dataHistory.enqueue(cpuLoadData);
                return cpuLoadData
            })
    }
}