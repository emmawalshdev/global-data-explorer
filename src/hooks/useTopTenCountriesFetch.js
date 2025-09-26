import React, { useEffect, useState } from "react";

const useTopTenCountriesFetch  = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [countryName, setCountryName] = useState([]);
    const [error, setError] = useState(null);

    const selectedDatasetCode = "NY.GDP.MKTP.KD.ZG";

    useEffect(() => {

        setLoading(true);
        setData([]);

        const controller = new AbortController();

        async function getData(){
            const url = `https://api.worldbank.org/v2/country/all/indicator/${selectedDatasetCode}?format=json`;
    
            try {
                const response = await fetch(url);
    
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`)
                }
    
                const result = await response.json();
                const raw = result[1] || [];
    
                if(raw.length === 0) {
                    setData([]);
                    setError(true);
                    return;
                }

                setError(null);
                const formated = raw
                    .filter(
                        item => item.value !== null && item.date
                    ).map(
                        item => ({ year: item.date, value: Number(item.value)})
                    ).sort((a,b) => Number(a.year) - Number(b.year));
                    setData(formated)
                    console.log(formated);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        }

        getData();
        return() => controller.abort(); //cleanup
    }, [selectedDatasetCode]);
    // }, [selectedDataset]
    return data;

}

export default useTopTenCountriesFetch;