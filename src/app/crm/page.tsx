"use client";

import { useEffect, useState } from "react";
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
import { dataService, type Lead } from "@/utils/dataService";

export default function CRM() {
  const [clients, setClients] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      const data = await dataService.getLeads();
      setClients(data);
    };
    fetchLeads();
  }, []);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-background min-h-screen text-foreground transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Client CRM</h1>
          <p className="text-slate-500">Manage your leads and active projects in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-card border border-border px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-border/50 transition-all flex items-center gap-2">
            <Filter size={18} /> Filters
          </button>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
            Add New Lead
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden backdrop-blur-sm transition-colors">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search clients, categories..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
              Name <ArrowUpDown size={14} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
              Date Added <ArrowUpDown size={14} />
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 text-slate-500">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-border/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{client.name}</span>
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
                    <span className="text-sm text-slate-500 font-medium">{client.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-background border border-border rounded-lg text-slate-500 hover:text-foreground transition-all">
                        <Phone size={16} />
                      </button>
                      <button className="p-2 bg-background border border-border rounded-lg text-slate-500 hover:text-foreground transition-all">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 bg-background border border-border rounded-lg text-slate-500 hover:text-foreground transition-all">
                        <Calendar size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-500 font-semibold text-sm hover:underline flex items-center gap-1">
                        Details <ExternalLink size={14} />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-foreground">
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
            <div className="bg-border/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
              <Users size={32} className="text-slate-500" />
            </div>
            <h3 className="text-foreground font-bold text-lg">No clients found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search term or add a new lead.</p>
          </div>
        )}
      </div>
    </div>
  );
}
