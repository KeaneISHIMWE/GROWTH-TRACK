const reports = [
  { id: 'r1', period: 'month', generatedAt: '2025-12-01', path: 'reports/2025-12.pdf' },
  { id: 'r2', period: 'week', generatedAt: '2025-12-08', path: 'reports/2025-w50.pdf' },
];

const ReportsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-600">Generated PDFs stored for auditing.</p>
        </div>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm">Generate report</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{r.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800 capitalize">{r.period}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{r.generatedAt}</td>
                <td className="px-4 py-2 text-sm text-blue-600 underline cursor-pointer">Download</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;

