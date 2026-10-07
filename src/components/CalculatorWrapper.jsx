import { useState } from "react";
import { MotionConfig } from "framer-motion";
import Calculator from "./Calculator";
import GrowthChart from "./GrowthChart";

export default function CalculatorWrapper({ initialBank = 'Nu' }) {
  const [data, setData] = useState(null);

  return (
    <MotionConfig reducedMotion="user">
      <Calculator onResult={setData} initialBank={initialBank} />
      {data?.crecimiento && <GrowthChart data={data.crecimiento} />}
    </MotionConfig>
  );
}
