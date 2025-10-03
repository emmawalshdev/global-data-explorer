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
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {stableCountries.map(code => (
          <Line key={code} type="monotone" dataKey={code} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CountriesIndicator;
