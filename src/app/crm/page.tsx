"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  ArrowUpDown,
  ExternalLink
} from "lucide-react";

const initialClients = [
  {
    id: "1",
    name: "Golden Dragon Chinese",
    status: "New",
    rating: 4.8,
    category: "Restaurant",
    phone: "(555) 123-4567",
    addedDate: "Mar 08, 2026",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: "2",
    name: "Blue Ribbon Auto Repair",
    status: "Contacted",
    rating: 4.5,
    category: "Automotive",
    phone: "(555) 987-6543",
    addedDate: "Mar 07, 2026",
    color: "bg-amber-50 text-amber-600 border-amber-100"
  },
  {
    id: "3",
    name: "Petals & Blooms Florist",
    status: "Meeting",
    rating: 4.9,
    category: "Retail",
    phone: "(555) 456-7890",
    addedDate: "Mar 06, 2026",
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    id: "4",
    name: "Sunset Cafe",
    status: "Won",
    rating: 4.7,
    category: "Restaurant",
    phone: "(555) 111-2222",
    addedDate: "Mar 01, 2026",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  }
];

export default function CRM() {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Client CRM</h1>
          <p className="text-slate-500">Manage your leads and active projects in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Filter size={18} /> Filters
          </button>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Add New Lead
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search clients, categories..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
              Name <ArrowUpDown size={14} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
              Date Added <ArrowUpDown size={14} />
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{client.name}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        Added on {client.addedDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${client.color}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">{client.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all">
                        <Phone size={16} />
                      </button>
                      <button className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all">
                        <Calendar size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                        Details <ExternalLink size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg">No clients found</h3>
            <p className="text-slate-500">Try adjusting your search term or add a new lead.</p>
          </div>
        )}
      </div>
    </div>
  );
}
