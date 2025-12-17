import React, { useState, useEffect } from 'react';

const Pipeline = () => {
  // Pipeline stages with their colors
  const stages = [
    { id: 'new', name: 'New Lead', color: 'bg-blue-400' },
    { id: 'contacted', name: 'Contacted', color: 'bg-yellow-400' },
    { id: 'demo', name: 'Meeting/Demo', color: 'bg-orange-500' },
    { id: 'interested', name: 'Interested', color: 'bg-green-400' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-700' },
    { id: 'won', name: 'Closed - Won', color: 'bg-green-600' },
    { id: 'lost', name: 'Closed - Lost', color: 'bg-red-500' }
  ];

  const [deals, setDeals] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be fetched from the backend API
    setDeals([
      {
        id: 1,
        title: 'Website Redesign Project',
        company: 'Acme Corp',
        value: 15000,
        stage: 'contacted',
        probability: 30
      },
      {
        id: 2,
        title: 'Mobile App Development',
        company: 'Globex Inc',
        value: 25000,
        stage: 'demo',
        probability: 60
      },
      {
        id: 3,
        title: 'Cloud Migration',
        company: 'Wayne Enterprises',
        value: 50000,
        stage: 'negotiation',
        probability: 80
      },
      {
        id: 4,
        title: 'SEO Optimization',
        company: 'Stark Industries',
        value: 8000,
        stage: 'new',
        probability: 10
      },
      {
        id: 5,
        title: 'CRM Implementation',
        company: 'Daily Planet',
        value: 35000,
        stage: 'interested',
        probability: 70
      }
    ]);
  }, []);

  // Group deals by stage
  const dealsByStage = stages.map(stage => ({
    ...stage,
    deals: deals.filter(deal => deal.stage === stage.id)
  }));

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sales Pipeline</h1>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Add Deal
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Pipeline Value</h3>
            <p className="text-2xl font-bold">{formatCurrency(133000)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Win Probability</h3>
            <p className="text-2xl font-bold">62%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Deals in Pipeline</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Avg. Deal Size</h3>
            <p className="text-2xl font-bold">{formatCurrency(26600)}</p>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {dealsByStage.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-72">
              <div className={`${stage.color} text-white p-3 rounded-t-lg`}>
                <h2 className="font-semibold">{stage.name}</h2>
                <p className="text-sm opacity-90">{stage.deals.length} deals</p>
              </div>
              <div className="bg-gray-100 min-h-[500px] rounded-b-lg p-3">
                {stage.deals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-lg shadow mb-3 p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <h3 className="font-semibold">{deal.title}</h3>
                    <p className="text-sm text-gray-600">{deal.company}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">{formatCurrency(deal.value)}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        {deal.probability}%
                      </span>
                    </div>
                  </div>
                ))}
                
                {stage.deals.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No deals in this stage</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pipeline;