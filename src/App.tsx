import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ApiResponse {
  success?: boolean;
  error?: string;
  data?: any;
}

function App() {
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const API_URL = 'http://localhost:3000/api';

  const generateApiKey = async () => {
    try {
      const response = await fetch(`${API_URL}/generate-key`, {
        method: 'POST',
      });
      const result = await response.json();
      setApiKey(result.apiKey);
      setMessage({ type: 'success', text: 'API key generated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to generate API key' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setMessage({ type: 'error', text: 'Please generate an API key first' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to create record');
      
      const result = await response.json();
      setData([...data, result]);
      setMessage({ type: 'success', text: 'Record created successfully!' });
      setFormData({ name: '', description: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create record' });
    }
  };

  const fetchData = async () => {
    if (!apiKey) {
      setMessage({ type: 'error', text: 'Please generate an API key first' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/data`, {
        headers: {
          'x-api-key': apiKey,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch records');
      
      const result = await response.json();
      setData(result);
      setMessage({ type: 'success', text: 'Records fetched successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch records' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Testing Interface</h1>
        
        {/* API Key Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">API Key Management</h2>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={apiKey}
              readOnly
              className="flex-1 p-2 border rounded"
              placeholder="Your API key will appear here"
            />
            <button
              onClick={generateApiKey}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Generate Key
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg mb-8 flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Create Record Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Record</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create Record
            </button>
          </form>
        </div>

        {/* Data Display */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Records</h2>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Fetch Records
            </button>
          </div>
          <div className="space-y-4">
            {data.map((record) => (
              <div key={record.id} className="p-4 border rounded">
                <h3 className="font-medium">{record.name}</h3>
                <p className="text-gray-600">{record.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(record.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;