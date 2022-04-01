import * as d3 from "d3";
import { useEffect, useRef } from "react";
import App from "../App";

export default function BarChart() {
  // get Qlik data by using engima.js by calling the App method;
  const chart = App();
  const barData = chart.data;
  const barLabel = chart.label;

  // define graph dimensions
  const margin = { top: 50, bottom: 100, left: 250, right: 60 };
  const height = 1000;
  const width = 1500;

  const svgRef = useRef();

  useEffect(() => {
    const measure = barData.map((d) => d[1].qNum);
    const yDomain = barData.map((d) => d[0].qText);
    const xDomain = [0, d3.max(measure)];

    const xScale = d3.scaleLinear().domain(xDomain).range([margin.left, width]);

    const yScale = d3
      .scaleBand()
      .domain(yDomain)
      .range([0, height])
      .padding(0.2);

    //Define Axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(10)
      .tickFormat((d) => `${d / 100000}M`)
      .tickSize(5);

    const yAxis = d3.axisLeft(yScale).tickSize(0);

    d3.select(svgRef.current)
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", `translate(0, ${height + margin.top - 0})`)
      .selectAll("text")
      .attr("y", 10)
      .attr("x", 2)
      .attr("dy", ".5em");

    d3.select(svgRef.current)
      .select(".yAxis")
      .call(yAxis)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define bars
    const bars = d3.select(svgRef.current).selectAll("rect").data(barData);

    // Adding bars
    bars
      .enter()
      .append("rect")
      .attr("x", xScale(0))
      .attr("y", (d, i) => yScale(d[0].qText))
      .attr("width", (d) => xScale(d[1].qNum) - margin.left)
      .attr("height", yScale.bandwidth())
      .attr("transform", `translate(0, ${margin.top} )`)
      .attr("fill", "royalblue");

    // Label for xAxis
    d3.select(svgRef.current)
      .select(".xLabel")
      .attr("x", width / 2)
      .attr("y", height + margin.top + margin.bottom / 2 + 20)
      .text(barLabel.xLabel);

    // Label for yAxis
    d3.select(svgRef.current)
      .select(".yLabel")
      .attr("y", margin.top + height / 2)
      .attr("x", margin.left / 2 - 10)
      .text(barLabel.yLabel)
      .attr("text-anchor", "middle");
  }, [
    barData,
    height,
    width,
    margin.left,
    margin.top,
    margin.bottom,
    barLabel,
  ]);
  return (
    <svg
      ref={svgRef}
      width={width + margin.right}
      height={height + margin.bottom}
    >
      <g className="xAxis" />
      <g className="yAxis" />
      <text className="xLabel" />
      <text className="yLabel" />
    </svg>
  );
}
