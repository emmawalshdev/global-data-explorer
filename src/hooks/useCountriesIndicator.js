import { useState, useEffect } from "react";

const useCountriesIndicator = (countryCodes, datasetCode) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    console.log('test2', countryCodes, datasetCode);

    if (!countryCodes.length || !datasetCode) return;

    console.log('fin data',countryCodes);

    const controller = new AbortController();
    setLoading(true);
    setData([]);

    async function fetchData() {
      try {
        // Fetch all countries
        const responses = await Promise.all(
          countryCodes.map(code =>
            fetch(`https://api.worldbank.org/v2/country/${code}/indicator/${datasetCode}?format=json`, { signal: controller.signal })
          )
        );

        const jsonData = await Promise.all(responses.map(res => res.json()));

        // Transform data: each year has values for all countries
        const formatted = {};
        jsonData.forEach((result, idx) => {
          const countryData = result[1] || [];
          countryData.forEach(item => {
            if (!item.value) return;
            if (!formatted[item.date]) formatted[item.date] = { year: item.date };
            formatted[item.date][countryCodes[idx]] = Number(item.value);
          });
        });

        // Convert object to array sorted by year
        const finalData = Object.values(formatted).sort((a, b) => a.year - b.year);

        console.log('fin data',finalData);
        
        setData(finalData);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [countryCodes, datasetCode]);

  return { data, loading, error };
};

export default useCountriesIndicator;
