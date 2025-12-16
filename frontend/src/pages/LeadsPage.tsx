import Card from '../components/Card';

const columns = ['new', 'working', 'qualified', 'won', 'lost'] as const;

const mockLeads = [
  { id: '1', name: 'Acme Corp', owner: 'Alice', status: 'new', next: '2025-12-18' },
  { id: '2', name: 'Globex', owner: 'Bob', status: 'working', next: '2025-12-16' },
  { id: '3', name: 'Initech', owner: 'Alice', status: 'qualified', next: '2025-12-20' },
  { id: '4', name: 'Won Co', owner: 'Chris', status: 'won', next: '-' },
];

const LeadsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-600">Kanban-style pipeline with quick filters.</p>
        </div>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm">New lead</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {columns.map((col) => (
          <div key={col} className="space-y-2">
            <div className="text-xs font-semibold uppercase text-gray-600">{col}</div>
            <div className="space-y-2">
              {mockLeads
                .filter((l) => l.status === col)
                .map((lead) => (
                  <Card key={lead.id} title={lead.name}>
                    <div className="text-sm text-gray-700">Owner: {lead.owner}</div>
                    <div className="text-xs text-gray-500">Next follow-up: {lead.next}</div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsPage;

