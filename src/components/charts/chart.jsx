import React, {useState, useEffect} from "react";
import useWorldBankIndicator from "../../hooks/useWorldBankIndicator";

const Chart = ( {selectedCountryCode} ) => {
    
    // chart types
    // 1 barchart
    
    // data types
    // 1 GPD

    const { data, loading } = useWorldBankIndicator(selectedCountryCode);


    if (loading) return <div>Loading..</div>
    return (
        <div>Chart</div>
    )
}

export default Chart;