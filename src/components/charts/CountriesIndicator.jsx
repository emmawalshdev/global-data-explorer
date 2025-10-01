import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useCountriesIndicator from "../../hooks/useCountriesIndicator";

const CountriesLineChart = ({ countries = ["US", "CN", "IN"], datasetCode }) => {
  const { data, loading, error } = useCountriesIndicator(countries, datasetCode);

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
        {countries.map(code => (
          <Line key={code} type="monotone" dataKey={code} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CountriesLineChart;
