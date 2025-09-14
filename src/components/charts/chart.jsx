import React, {useState, useEffect} from "react";

const Chart = ( {selectedCountryCode} ) => {
    
    // chart types
    // 1 barchart
    
    // data types
    // 1 GPD

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(data)
    })

    useEffect(() => {
        if(!selectedCountryCode) return;
        const controller = new AbortController();

        async function getData() {
            const url = `https://api.worldbank.org/v2/country/${selectedCountryCode}/indicator/EG.ELC.RNEW.ZS?format=json`;
            
            try {
                const response = await fetch(url, { signal: controller.signal });
                if(!response.ok){
                    throw new Error(`Response status:
                    ${response.status}`)
                }
        
                const result = await response.json();
    
                const raw = result[1] || [];
                const formated = raw.filter(item => item.value !== null && item.date).map(item => ({ year: item.date, value: Number(item.value)})).sort((a,b) => Number(a.year) - Number(b.year));
                setData(formated);
            } catch (error) {
                console.error(error.message);
            }
        }
        getData();
        return() => controller.abort(); //cleanup upon unmount

    }, [selectedCountryCode]);


    if (loading) return <div>Loading..</div>
    return (
        <div>Chart</div>

    )
}

export default Chart;