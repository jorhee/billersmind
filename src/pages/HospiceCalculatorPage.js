import React, { useState } from 'react';
import { Notyf } from 'notyf';
import '../css/notyf.css';

const HospiceCalculatorPage = () => {

  const notyf = new Notyf({
      position: {
        x: 'center', // Horizontal axis: center
        y: 'center', // Vertical axis: center
      },
      duration: 2000, // Optional: Notification duration in milliseconds
    });
  const [year, setYear] = useState('');
  const [isHospiceDoSubmitQualityData, setIsHospiceDoSubmitQualityData] = useState(false);
  const [zip, setZip] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!year || !zip || isHospiceDoSubmitQualityData === undefined) {
      setError('Please provide all required inputs: year, cbsa, and isHospiceDoSubmitQualityData.');
      return;
    }

    const requestData = {
      year,
      isHospiceDoSubmitQualityData,
      zip
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/hospiceCalculator/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const data = await response.json(); 

      if (!response.ok) {
        throw new Error(data.message);
      }

      notyf.success(`Hospice rate found`);
      setResults(data);
    } catch (error) {
      notyf.error(error.message);
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
        <label className="block text-gray-700 font-medium text-lg mt-2">Fiscal Year Starts From Octo to Sept</label>
        <input
          type="text"
          placeholder="Enter Fiscal Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="text-dark w-full mt-2 p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Zip Input */}
      <div>
        <label className="block text-gray-700 font-medium text-lg mt-2">
          Zip Code (5-character)
        </label>
        <input
          type="text"
          placeholder="Enter Zipcode"
          maxLength="5"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
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
          Is Hospice Do Submit Quality Data ?
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
    {results.length > 0 ? (
      <div className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Results with 2% sequestration deduction</h3>

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
            <p className="text-gray-900 mb-2">
              <strong>Is Hospice Do Submit Quality Data:</strong>{" "}
              {entry.isHospiceDoSubmitQualityData ? "✅ Yes" : "❌ No"}
            </p>
            <p className="text-green-900 mb-2">
              <strong className="text-gray-900">RHC High Rate /day:</strong> ${(entry.rhcHighRate * 0.98)}
            </p>
            <p className="text-green-900 mb-2">
              <strong className="text-gray-900">RHC Low Rate /day:</strong> ${(entry.rhcLowRate * 0.98)}
            </p>
            <p className="text-green-900 mb-2">
              <strong className="text-gray-900">CHC Rate /hour:</strong> ${(entry.chcRate * 0.98)}
            </p>
            <p className="text-green-900 mb-2">
              <strong className="text-gray-900">IRC Rate /day:</strong> ${(entry.ircRate * 0.98)}
            </p>
            <p className="text-green-900 mb-2">
              <strong className="text-gray-900">GIP Rate /day:</strong> ${(entry.gipRate * 0.98)}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className="mt-6 text-center">
        <p className="text-xl text-gray-700 font-medium">
          ❌ No results found for the given criteria. Please refine your search and try again.
        </p>
      </div>
    )}
  </div>
);

};


export default HospiceCalculatorPage;
