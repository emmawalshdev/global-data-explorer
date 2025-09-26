import React from "react";
import useTopTenCountriesFetch from "../../hooks/useTopTenCountriesFetch";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TopTenCountries = ( {selectedDataset} ) => {

    const { data, loading, error } = useTopTenCountriesFetch();

    // if(!selectedDataset) {return (
    //     <div className="h-100 flex item-center justify-center border p-3">
    //         No 
    //     </div>
    // )}

    let selectedDatasetName = selectedDataset.name;

    if (error || loading || data) {
        let message = "";

        if(error){ message = "Error retrieving top ten country data result";}
        else if (loading) {message = "Loading..";}
        else if (!data) {message = "No data availale for this country"}

        return (
            <div className="h-32 flex items-center justify-center border">
                {message}
            </div>
        )
    }
    return (
        <div style={{ width: '100%', height: '500px' }}>
        <h2>Top Ten Countries:</h2>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name={`Top Ten Countries - ${selectedDatasetName}`} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    </div>
    )
}

export default TopTenCountries;