import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Dashboard({ data }) {
  if (!data || !data.reviews) return null;

  const { product, reviews } = data;

  // Calculate Sentiment Distribution
  const sentimentCounts = { Positive: 0, Negative: 0, Neutral: 0 };
  reviews.forEach(r => {
    if (r.sentiment_label) {
      sentimentCounts[r.sentiment_label]++;
    }
  });

  const pieData = [
    { name: 'Positive', value: sentimentCounts.Positive },
    { name: 'Negative', value: sentimentCounts.Negative },
    { name: 'Neutral', value: sentimentCounts.Neutral }
  ];

  const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

  // Calculate Average Rating
  const avgRating = (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b pb-6">
        <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
            {reviews.length} Reviews Analyzed
          </span>
          <span className="flex items-center gap-1 text-amber-500 font-bold">
            ★ {avgRating} Avg Rating
          </span>
        </div>
        <p className="text-gray-500 mt-4 text-sm">{product.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 bg-gray-50 rounded-xl p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Sentiment Distribution</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-80 bg-gray-50 rounded-xl p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Sentiment Breakdown</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
