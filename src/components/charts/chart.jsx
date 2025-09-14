import React, {useState, useEffect} from "react";

const Chart = ( {selectedCountryCode} ) => {
    
    // chart types
    // 1 barchart
    
    // data types
    // 1 GPD

    const [loading, setLoading] = useState(true);

    async function getData() {
        const url = `https://api.worldbank.org/v2/country/${selectedCountryCode}/indicator/EG.ELC.RNEW.ZS?format=json`;
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Response status:
                ${response.status}`)
            }
    
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    getData();

    if (loading) return <div>Loading..</div>
    return (
        <div>Chart</div>

    )
}

export default Chart;