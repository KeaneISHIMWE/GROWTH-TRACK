import React, { useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Monthly',
      period: 'December 2025',
      generatedDate: '2025-12-01',
      status: 'Generated'
    },
    {
      id: 2,
      type: 'Weekly',
      period: 'Week 50 (Dec 8-14)',
      generatedDate: '2025-12-08',
      status: 'Generated'
    },
    {
      id: 3,
      type: 'Monthly',
      period: 'November 2025',
      generatedDate: '2025-11-01',
      status: 'Generated'
    }
  ]);

  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [reportType, setReportType] = useState('weekly');

  // Handle report generation
  const handleGenerateReport = (e) => {
    e.preventDefault();
    // In a real application, this would call the backend API to generate a report
    alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generation started!`);
    setShowGenerateForm(false);
    setReportType('weekly');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports</h1>
          <button 
            onClick={() => setShowGenerateForm(!showGenerateForm)}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            {showGenerateForm ? 'Cancel' : 'Generate Report'}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Generate Report Form */}
        {showGenerateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Generate New Report</h2>
            <form onSubmit={handleGenerateReport}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekly">Weekly Report</option>
                    <option value="monthly">Monthly Report</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Generated Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.generatedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Preview */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Report Preview</h2>
          <div className="border rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">GrowthTrack Business Report</h3>
              <p className="text-gray-600">December 2025</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-gray-600">New Leads</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-600">32%</p>
                <p className="text-gray-600">Conversion Rate</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600">$42,500</p>
                <p className="text-gray-600">MRR</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">8</p>
                <p className="text-gray-600">Deals Closed</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Revenue Trend</h4>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Revenue Trend Chart (Line Chart)</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Pipeline Distribution</h4>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Pipeline Distribution Chart (Bar Chart)</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Top Activities</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>John Smith converted to client</li>
                <li>Sarah Johnson moved to Negotiation stage</li>
                <li>Michael Brown scheduled demo</li>
                <li>Emily Davis contacted</li>
                <li>Robert Wilson proposal sent</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;