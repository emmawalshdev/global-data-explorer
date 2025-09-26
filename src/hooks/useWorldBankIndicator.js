import React, {useState, useEffect} from "react";

const useWorldBankIndicator = (selectedCountryCode, selectedDataset) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [countryName, setCountryName] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData([]);

        if(!selectedCountryCode ) return;

        let selectedDatasetCode = selectedDataset.code

        const controller = new AbortController();

        async function getData() {
            const url = `https://api.worldbank.org/v2/country/${selectedCountryCode}/indicator/${selectedDatasetCode}?format=json`;
            try {
                const response = await fetch(url, { signal: controller.signal });
                if(!response.ok){
                    throw new Error(`Response status:
                    ${response.status}`)
                }
        
                const result = await response.json();
                const raw = result[1] || [];

                if(raw.length === 0) {
                    setData([]);
                    setCountryName(selectedCountryCode);
                    setError(true);
                    return;
                }
                setError(null);
                let countryName = raw[0]?.country?.value;
                setCountryName(countryName);

                const formated = raw.filter(item => item.value !== null && item.date).map(item => ({ year: item.date, value: Number(item.value)})).sort((a,b) => Number(a.year) - Number(b.year));
                setData(formated);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
                setData([]);
                setCountryName("");
            } finally {
                setLoading(false);
            }
        }
        getData();
        return() => controller.abort(); //cleanup upon unmount
    }, [selectedCountryCode, selectedDataset]);
        return { data, loading, countryName, error };

}

export default useWorldBankIndicator;