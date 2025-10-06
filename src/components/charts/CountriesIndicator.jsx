import React, { useMemo } from "react";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useCountriesIndicator from "../../hooks/useCountriesIndicator";

const CountriesIndicator = ({ countries, datasetCode = "SP.POP.TOTL" }) => {
  const stableCountries = useMemo(() => countries || ["US", "CN", "IN"], [countries]);
  const { data, loading, error } = useCountriesIndicator(stableCountries, datasetCode);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data available</div>;

  return (
<ResponsiveContainer width="100%" height={400}>
  <LineChart
    data={data.map(item => ({
      year: item.year,
      ...Object.fromEntries(
        Object.entries(item).map(([k, v]) => [k, isNaN(v) ? v : Number(v)])
      )
    }))}
    margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
  >
    <XAxis dataKey="year" />
    <YAxis type="number" domain={["auto", "auto"]} tickFormatter={(v) => v.toLocaleString()} />
    <Tooltip />
    <Legend />
    {stableCountries.map(code => (
      <Line
        key={code}
        type="monotone"
        dataKey={code}
        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        dot={false}
      />
    ))}
  </LineChart>
</ResponsiveContainer>

  );
};

export default CountriesIndicator;
