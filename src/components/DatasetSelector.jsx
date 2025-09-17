import React from 'react';

const DataSelector = ({selectedDataset, datasets, onChange}) => {
    return (
        <select
          value={selectedDataset}
          onChange={(e) => onChange(e.target.value)}
          >
            {datasets.map((dataset) => (
                <option key={dataset.code} value={dataset.code}>
                    {dataset.name}
                </option>
            ))}
          </select>
    )
}

export default DataSelector;