import { useState } from "react";
import Calculator from "./Calculator";
import GrowthChart from "./GrowthChart";

export default function CalculatorWrapper() {
  const [data, setData] = useState(null);

  return (
    <>
      <Calculator onResult={setData} />
      {data?.crecimiento && <GrowthChart data={data.crecimiento} />}
    </>
  );
}
