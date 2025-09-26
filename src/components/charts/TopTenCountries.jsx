import React from "react";
import useTopTenCountriesFetch from "../../hooks/useTopTenCountriesFetch";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const TopTenCountries = ( {selectedDataset} ) => {

    const { data, loading, error } = useTopTenCountriesFetch();

    // if(!selectedDataset) {return (
    //     <div className="h-100 flex item-center justify-center border p-3">
    //         No 
    //     </div>
    // )}

    console.log(data);
    let selectedDatasetName = selectedDataset.name;

    if (error || loading || !data) {
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
        <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4caf50" />
        </BarChart>
    </div>
    )
}

export default TopTenCountries;