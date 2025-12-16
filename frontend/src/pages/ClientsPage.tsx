const clients = [
  { id: 'c1', name: 'Acme Corp', value: '$48k', renewal: '2026-01-10', owner: 'Alice' },
  { id: 'c2', name: 'Globex', value: '$30k', renewal: '2025-08-01', owner: 'Bob' },
];

const ClientsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-600">Closed accounts, contract value, and renewals.</p>
        </div>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm">Add client</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Renewal</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{c.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{c.value}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{c.renewal}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{c.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsPage;

