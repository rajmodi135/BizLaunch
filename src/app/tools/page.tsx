"use client";

import { useState } from "react";
import { 
  Zap, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  FileText,
  Download,
  Share2
} from "lucide-react";

const auditPoints = [
  { name: "Google Maps Presence", weight: 20 },
  { name: "Website Availability", weight: 30 },
  { name: "Mobile Responsiveness", weight: 15 },
  { name: "Page Speed", weight: 15 },
  { name: "SEO Basics", weight: 10 },
  { name: "Social Links", weight: 10 },
];

export default function AuditTools() {
  const [url, setUrl] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setReport({
        score: 42,
        businessName: "Golden Dragon Chinese",
        issues: [
          { title: "No Website Found", severity: "critical", description: "This business is missing a website, losing ~30% of potential customers." },
          { title: "Unclaimed Maps Profile", severity: "high", description: "The Google Maps profile hasn't been verified by the owner." },
          { title: "Limited Social Media", severity: "medium", description: "Only a basic Facebook page with no recent posts." },
        ],
        opportunities: [
          { title: "Online Ordering", impact: "High", description: "Add online ordering to increase revenue by 15-20%." },
          { title: "SEO Strategy", impact: "Medium", description: "Target 'best chinese food near me' keywords." },
        ]
      });
      setIsAuditing(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Digital Audit Tool</h1>
        <p className="text-slate-500">Generate a professional audit report for any prospect in seconds.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
        <form onSubmit={runAudit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Business Name or URL"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg font-medium"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            disabled={isAuditing}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 disabled:bg-blue-400"
          >
            {isAuditing ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                <Zap size={24} /> Run Audit
              </>
            )}
          </button>
        </form>
      </div>

      {report && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeDasharray="100, 100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-orange-500"
                    strokeDasharray={`${report.score}, 100`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="text-3xl font-black text-slate-900">{report.score}</span>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Score</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{report.businessName}</h3>
              <p className="text-sm text-slate-500 font-medium">Critical Issues Found</p>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-slate-900">Key Audit Points</h3>
                <span className="text-sm font-medium text-slate-400 italic">Simulated data</span>
              </div>
              <div className="space-y-4">
                {auditPoints.map((point) => (
                  <div key={point.name} className="flex items-center justify-between group">
                    <span className="text-slate-600 font-medium">{point.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${point.weight > 15 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${point.weight * 5}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-400 w-8 text-right">{point.weight * 5}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <XCircle className="text-red-500" /> Critical Issues
              </h3>
              {report.issues.map((issue: any, idx: number) => (
                <div key={idx} className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-red-900">{issue.title}</h4>
                      <p className="text-sm text-red-700/80 leading-relaxed mt-1">{issue.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" /> Opportunities
              </h3>
              {report.opportunities.map((opp: any, idx: number) => (
                <div key={idx} className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <Zap className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-emerald-900">{opp.title}</h4>
                        <span className="text-[10px] uppercase tracking-wider font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                          {opp.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-emerald-700/80 leading-relaxed mt-1">{opp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <Download size={18} /> Download PDF Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all">
              <Share2 size={18} /> Share Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-all">
              <FileText size={18} /> Create Proposal
            </button>
          </div>
        </div>
      )}

      {!report && !isAuditing && (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="bg-white w-20 h-20 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 transform -rotate-6">
            <FileText size={40} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No active audit</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Enter a business name or URL above to generate a professional digital audit and identify growth opportunities.</p>
        </div>
      )}
    </div>
  );
}
