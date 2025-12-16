import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '../components/Card';

const DashboardPage = () => {
  const revenueData = useMemo(
    () => [
      { month: 'Jan', value: 12000 },
      { month: 'Feb', value: 15000 },
      { month: 'Mar', value: 18000 },
      { month: 'Apr', value: 21000 },
      { month: 'May', value: 24000 },
    ],
    [],
  );

  const pipelineData = useMemo(
    () => [
      { stage: 'Prospect', value: 10 },
      { stage: 'Negotiation', value: 6 },
      { stage: 'Closed Won', value: 4 },
      { stage: 'Closed Lost', value: 2 },
    ],
    [],
  );

  const kpis = [
    { label: 'New leads (30d)', value: 24 },
    { label: 'Conversion rate', value: '18%' },
    { label: 'MRR', value: '$21.4k' },
    { label: 'Tasks due today', value: 5 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} title={kpi.label}>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Revenue trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Pipeline">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

