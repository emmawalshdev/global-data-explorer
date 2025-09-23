import React, {useState, useEffect} from "react";
import useWorldBankIndicator from "../../hooks/useWorldBankIndicator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Chart = ( {selectedCountryCode, selectedDataset} ) => {
    
    const { data, loading, countryName, error } = useWorldBankIndicator(selectedCountryCode, selectedDataset);

    let selectedDatasetName = selectedDataset.name;

    if(!selectedCountryCode) {
        return  (
            <div className="h-100 flex items-center justify-center border p-3">
              No country selected, please click on the map to search the database.
        </div>
        )

    } else if(error || loading || !data) {
        let message = "";

        if (error){ message = "Error retrieving data available for this country";}
        else if (loading) {message = "Loading.." }
        else if (!data) {message = "No data available for this country"}

        return (
            <div className="h-32 flex items-center justify-center border">
                {message}
            </div>
        )
    }

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <h2>Dataset: {selectedDatasetName}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name={`${countryName} - ${selectedDatasetName}`} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>

    )
}

export default Chart;