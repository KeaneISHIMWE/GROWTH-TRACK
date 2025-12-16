const deals = [
  { id: 'd1', name: 'Acme Expansion', stage: 'prospect', amount: '$20k', prob: '40%' },
  { id: 'd2', name: 'Globex Renewal', stage: 'negotiation', amount: '$30k', prob: '65%' },
  { id: 'd3', name: 'Initech New', stage: 'closed_won', amount: '$15k', prob: '100%' },
];

const DealsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Deals</h1>
          <p className="text-sm text-gray-600">Pipeline view with stage transitions.</p>
        </div>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm">New deal</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deals.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{d.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800 capitalize">{d.stage.replace('_', ' ')}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{d.amount}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{d.prob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsPage;

