import { useContext, useEffect, useRef } from 'react';
import { CPULoadData } from '../../cpuDashboard/CpuDashboard';
import * as d3 from 'd3';
import './CpuLoadChart.css';
import { CPULoadDataPoint } from '../../dataLoader/data-types';
import { anyTypeAnnotation } from '@babel/types';
import cpuLoad from '../../../../server/cpuLoad';

/**
 * SVG Plot container viewbox dimmensions
 */
const VIEWBOX_HEIGHT = 500;
const VIEWBOX_WIDTH = 500;

function CpuLoadChart() {

  const {cpuLoadData} = useContext(CPULoadData);
  const svgReference = useRef<SVGSVGElement>(null);

  useEffect(() => {
  }, [cpuLoadData])

  const targetSVG = d3.select(svgReference.current);

    const yMinValue = d3.min(cpuLoadData.queue, (d) => d.cpuLoad) as any,
        yMaxValue = d3.max(cpuLoadData.queue, (d) => d.cpuLoad) as any;

    // Set scaling
    const getX = d3
      .scaleTime()
      .domain(d3.extent(cpuLoadData.queue, (e: CPULoadDataPoint): Date => new Date(e.timestamp)) as [Date, Date])
      .range([0, VIEWBOX_WIDTH]);

    const getY = d3
      .scaleLinear()
      .domain([yMinValue - 1, yMaxValue + 2])
      .range([VIEWBOX_HEIGHT, 0]);

    // Getters for axis values
    const getXAxis = (svgReference: SVGSVGElement) => {
      const xAxis = d3.axisBottom(getX);
      d3.select(svgReference).call(xAxis.tickFormat(d3.timeFormat('%I:%M') as any));
    };

    const getYAxis = (svgReference: SVGSVGElement) => {
        const yAxis = d3.axisLeft(getY).tickSize(-VIEWBOX_WIDTH).tickPadding(7);
        d3.select(svgReference).call(yAxis);
    };

    const linePath = d3
        .line<CPULoadDataPoint>()
        .x((d) => {
          console.log('X', d, getX(new Date(d.timestamp)))
          return getX(new Date(d.timestamp))
        })
        .y((d) => {
          console.log('Y', getY(d.cpuLoad))
          return getY(d.cpuLoad)})
        .curve(d3.curveMonotoneX)(cpuLoadData.queue);

    const areaPath = d3
        .area<CPULoadDataPoint>()
        .x((d) => getX(new Date(d.timestamp)))
        .y0((d) => getY(d.cpuLoad))
        .y1(() => getY(yMinValue - 1))
        .curve(d3.curveMonotoneX)(cpuLoadData.queue);

    // const handleMouseMove = (e) => {
    //   const bisect = d3.bisector((d) => d.date).left,
    //       x0 = getX.invert(d3.pointer(e, this)[0]),
    //       index = bisect(data, x0, 1);
    //   setActiveIndex(index);
    // };
  
    // const handleMouseLeave = () => {
    //     setActiveIndex(null);
    // };


  return (
    <div className="cpu-load-chart">
      <h1>CPU Load Chart</h1>
      <p>{cpuLoadData.toArray().length > 0 ? cpuLoadData.toArray()[cpuLoadData.toArray().length - 1].cpuLoad : 'no'}</p>
      <svg
        className='load-chart-svg' 
        ref={svgReference} 
        viewBox={`0 0 ${VIEWBOX_HEIGHT} ${VIEWBOX_WIDTH}`}
      >
        <g className="axis" ref={getYAxis} />
              <g
                  className="axis xAxis"
                  ref={getXAxis}
                  transform={`translate(0,${VIEWBOX_HEIGHT})`}
              />
              <path fill={'blue'} d={areaPath as any} opacity={0.3} />
              <path strokeWidth={3} fill="none" stroke={'green'} d={linePath as any} />
            <text
                transform={"rotate(-90)"}
                x={0 - VIEWBOX_HEIGHT / 2} y={0} dy="1em">
                {"CPU Load"}
            </text>
            <text
                x={VIEWBOX_WIDTH / 2} y={0} textAnchor="middle" >
                {"CPU Load"}
            </text>
      </svg>
    </div>

  );
}

export default CpuLoadChart;
