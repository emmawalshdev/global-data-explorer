import React from 'react';

const DataSelector = ({selectedDataset, datasets, onChange}) => {
  const selectId = "dataset-select";  
  
  console.log(selectedDataset.name);
  return (
      <div className="text-left w-full max-w-xs">
       <label 
         htmlFor={selectId}
         className="text-sm font-bold text-gray-700 mb-1">
          Choose a dataset:
      </label>
        <select 
          id={selectId}
          value={selectedDataset.code}
          className="rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
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
      </div>
    )
}

export default DataSelector;