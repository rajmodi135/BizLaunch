"use client";

import { useState } from "react";
import { 
  FileText, 
  Search, 
  Plus, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Download,
  MoreVertical,
  Calendar
} from "lucide-react";

const proposals: any[] = [];

export default function Proposals() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProposals = proposals.filter(p => 
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Proposals</h1>
          <p className="text-slate-500">Track and manage your project quotes and contracts.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
          <Plus size={18} /> New Proposal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Total Sent</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">12</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Last 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Accepted</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">8</p>
          <p className="text-xs text-slate-500 font-medium mt-1">66% Conversion rate</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Pending</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">4</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Awaiting response</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search proposals..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{proposal.client}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-slate-500 font-medium">{proposal.type}</span>
                    <span className="text-slate-200">•</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Calendar size={14} /> {proposal.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-bold text-slate-900">{proposal.value}</p>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black border mt-1 inline-block ${proposal.color}`}>
                    {proposal.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <Download size={20} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <MoreVertical size={20} />
                  </button>
                  <button className="ml-4 bg-slate-50 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-all">
                    View <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-slate-900 font-bold text-lg">No proposals found</h3>
            <p className="text-slate-500">Try adjusting your search or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
