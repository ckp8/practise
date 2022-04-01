import React, { useState, useEffect } from "react";
import BarChart from "./engine/barchart";
import { openSession } from "./engine/engine";
export default function App() {
  // defining states
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const Test = async () => {
    // console.log(await openSession());
    const session = await openSession();
    const bar = await session.getObject("XNTGgf");
    const layout = await bar.getLayout();
    console.log(layout);
    const properties = await bar.getProperties();
    console.log(properties);
    const transientObject = await session.createSessionObject(properties);
    const callback = async () => await transientObject.getLayout();
    transientObject.on("changed", callback);
    console.log(callback);
    const layoutObject = await transientObject.getLayout();
    const data = layoutObject.qHyperCube.qDataPages[0].qMatrix;
    console.log(data);
    const xLabel = layoutObject.qHyperCube.qDimensionInfo[0].qFallbackTitle;
    const yLabel = layoutObject.qHyperCube.qMeasureInfo[0].qFallbackTitle;
    return {
      data,
      labels: { xLabel, yLabel },
    };
  }
  useEffect(() => {
    Test().then((response) => {
      setData(response.data);
      setLabel(response.labels);
    });
  }, []);
  Test();
  return <div className="App">{(data, label)}
  <BarChart/></div>;
}

