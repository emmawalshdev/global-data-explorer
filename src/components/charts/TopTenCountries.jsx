import React from "react";
import useTopTenCountriesFetch from "../../hooks/useTopTenCountriesFetch";

const TopTenCountries = () => {

    const {data} = useTopTenCountriesFetch();

    return (
        <div>Top 10 Countries - {data}</div>
    )
}

export default TopTenCountries;