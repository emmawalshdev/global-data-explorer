import React from 'react';

const DataSelector = ({selectedDataset, datasets, onChange}) => {
    return (
        <select
          value={selectedDataset}
          onChange={(e) => {
            const dataset = datasets.find(d => d.code === e.target.value);
            onChange(dataset);
        }
          }
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