
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for purchase history
const purchaseData = [
  { name: 'E-commerce', items: 5 },
  { name: 'Dashboard', items: 3 },
  { name: 'Portfolio', items: 8 },
  { name: 'Mobile App', items: 2 },
  { name: 'SaaS', items: 4 },
  { name: 'Landing Page', items: 6 },
];


const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-base-200 p-8 rounded-lg shadow-2xl space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-white mb-2">My Account</h1>
        <p className="text-lg text-gray-400">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-base-300 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Account Details</h2>
            <div className="space-y-3">
                <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-lg text-white">{user?.name}</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg text-white">{user?.email}</p>
                </div>
            </div>
            <button 
                onClick={logout} 
                className="mt-6 w-full bg-error hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Logout
            </button>
        </div>
        <div className="md:col-span-2 bg-base-300 p-6 rounded-lg">
             <h2 className="text-2xl font-bold text-white mb-4">Purchase History</h2>
             <p className="text-gray-400 mb-6">Here's a summary of your purchased items by category.</p>
             <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={purchaseData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                        <XAxis dataKey="name" stroke="#a0aec0" />
                        <YAxis stroke="#a0aec0" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                            labelStyle={{ color: '#ffffff' }}
                        />
                        <Legend wrapperStyle={{ color: '#a0aec0' }} />
                        <Bar dataKey="items" fill="#3b82f6" name="Items Purchased" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
