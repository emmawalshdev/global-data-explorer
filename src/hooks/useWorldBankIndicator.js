import React, {useState, useEffect} from "react";

const useWorldBankIndicator = (selectedCountryCode, selectedDataset) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [countryName, setCountryName] = useState([]);

    useEffect(() => {
        setLoading(true);
        setData([]);

        if(!selectedCountryCode) return;

        const controller = new AbortController();

        async function getData() {
            const url = `https://api.worldbank.org/v2/country/${selectedCountryCode}/indicator/${selectedDataset}?format=json`;
            console.log(url);
            try {
                const response = await fetch(url, { signal: controller.signal });
                if(!response.ok){
                    throw new Error(`Response status:
                    ${response.status}`)
                }
        
                const result = await response.json();
                const raw = result[1] || [];

                let countryName = raw[0]?.country?.value;
                setCountryName(countryName);

                const formated = raw.filter(item => item.value !== null && item.date).map(item => ({ year: item.date, value: Number(item.value)})).sort((a,b) => Number(a.year) - Number(b.year));
                setData(formated);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getData();
        return() => controller.abort(); //cleanup upon unmount

    }, [selectedCountryCode, selectedDataset]);
        return { data, loading, countryName };

}

export default useWorldBankIndicator;