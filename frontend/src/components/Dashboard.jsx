import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    newLeads: 0,
    conversionRate: 0,
    mrr: 0,
    dealsClosed: 0,
    tasksDueToday: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be fetched from the backend API
    setDashboardData({
      newLeads: 24,
      conversionRate: 32,
      mrr: 42500,
      dealsClosed: 8,
      tasksDueToday: 5
    });
  }, []);

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
          <h1 className="text-2xl font-bold">GrowthTrack Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-200">Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-200">Leads</a></li>
              <li><a href="#" className="hover:text-blue-200">Clients</a></li>
              <li><a href="#" className="hover:text-blue-200">Reports</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium mb-1">New Leads</h3>
            <p className="text-2xl font-bold">{dashboardData.newLeads}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Conversion Rate</h3>
            <p className="text-2xl font-bold">{dashboardData.conversionRate}%</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium mb-1">MRR</h3>
            <p className="text-2xl font-bold">{formatCurrency(dashboardData.mrr)}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Deals Closed</h3>
            <p className="text-2xl font-bold">{dashboardData.dealsClosed}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Tasks Due Today</h3>
            <p className="text-2xl font-bold">{dashboardData.tasksDueToday}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">Revenue Trend Chart (Line Chart)</p>
            </div>
          </div>

          {/* Pipeline Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pipeline Distribution</h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">Pipeline Distribution Chart (Bar Chart)</p>
            </div>
          </div>

          {/* Lead Source Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Lead Sources</h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">Lead Source Distribution Chart (Pie Chart)</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="font-medium">John Smith</p>
                <p className="text-gray-600 text-sm">Converted to client</p>
                <p className="text-gray-400 text-xs">2 hours ago</p>
              </div>
              <div className="border-b pb-3">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-gray-600 text-sm">Moved to Negotiation stage</p>
                <p className="text-gray-400 text-xs">5 hours ago</p>
              </div>
              <div className="border-b pb-3">
                <p className="font-medium">Michael Brown</p>
                <p className="text-gray-600 text-sm">Scheduled demo</p>
                <p className="text-gray-400 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;