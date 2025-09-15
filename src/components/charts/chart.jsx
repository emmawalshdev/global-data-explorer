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
        
        <div>Chart</div>
    )
}

export default Chart;