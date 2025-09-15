import React, {useState, useEffect} from "react";
import useWorldBankIndicator from "../../hooks/useWorldBankIndicator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Chart = ( {selectedCountryCode} ) => {
    
    // chart types
    // 1 barchart
    
    // data types
    // 1 GPD

    const { data, loading } = useWorldBankIndicator(selectedCountryCode);

    if (loading) return <div>Loading..</div>
    if (!data) return <div>No data available for this country</div>
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Renewable Electricity (%)" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Chart;