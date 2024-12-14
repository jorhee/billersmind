import React, { useState } from 'react';



const HospiceCalculatorPage = () => {
  const [year, setYear] = useState('');
  const [isHospiceDoSubmitQualityData, setIsHospiceDoSubmitQualityData] = useState(false);
  const [cbsa, setCbsa] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!year || !cbsa || isHospiceDoSubmitQualityData === undefined) {
      setError('Please provide all required inputs: year, cbsa, and isHospiceDoSubmitQualityData.');
      return;
    }

    const requestData = {
      year,
      isHospiceDoSubmitQualityData,
      cbsa
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/hospiceCalculator/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching data.');
    }
  };

  return (
  <div className="max-w-lg w-full mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
      Hospice Rate Search
    </h2>
    <h3 className="text-2xl font-bold-20 mb-6 text-center text-red-900">
      California and Nevada State Only
    </h3>

    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Year Input */}
      <div>
        <label className="block text-gray-700 font-medium text-lg mt-2">Year</label>
        <input
          type="text"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="text-dark w-full mt-2 p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* CBSA Input */}
      <div>
        <label className="block text-gray-700 font-medium text-lg mt-2">
          CBSA (5-character)
        </label>
        <input
          type="text"
          placeholder="Enter CBSA"
          maxLength="5"
          value={cbsa}
          onChange={(e) => setCbsa(e.target.value)}
          className="text-dark w-full mt-2 p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={isHospiceDoSubmitQualityData}
          onChange={(e) => setIsHospiceDoSubmitQualityData(e.target.checked)}
          className="w-5 h-5 bg-blue-500 rounded"
        />
        <span className="ml-2 text-gray-700 font-medium text-lg mt-2">
          Is Hospice Do Submit Quality Data
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all"
      >
        🔍 Search
      </button>
    </form>

    {/* Results Section */}
    {results.length > 0 && (
      <div className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Results</h3>

        {results.map((entry, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300 text-lg mt-2"
          >
            <p className="text-gray-900 font-medium">
              <strong>CBSA:</strong> {entry.cbsa}
            </p>
            <p className="text-gray-900">
              <strong>Year:</strong> {entry.year}
            </p>
            <p className="text-gray-900">
              <strong>Is Hospice Do Submit Quality Data:</strong>{" "}
              {entry.isHospiceDoSubmitQualityData ? "✅ Yes" : "❌ No"}
            </p>
            <p className="text-gray-900">
              <strong>RHC High Rate:</strong> {entry.rhcHighRate}
            </p>
            <p className="text-gray-900">
              <strong>RHC Low Rate:</strong> {entry.rhcLowRate}
            </p>
            <p className="text-gray-900">
              <strong>CHC Rate:</strong> {entry.chcRate}
            </p>
            <p className="text-gray-900">
              <strong>IRC Rate:</strong> {entry.ircRate}
            </p>
            <p className="text-gray-900">
              <strong>GIP Rate:</strong> {entry.gipRate}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

};


export default HospiceCalculatorPage;
