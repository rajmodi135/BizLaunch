"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Star, 
  Globe, 
  Phone, 
  Plus,
  Loader2,
  Filter,
  CheckCircle2,
  Settings
} from "lucide-react";

const mockResults = [
  {
    id: "1",
    name: "Golden Dragon Chinese",
    rating: 4.8,
    reviews: 124,
    address: "123 Main St, Springfield",
    phone: "(555) 123-4567",
    website: null,
    category: "Restaurant"
  },
  {
    id: "2",
    name: "Blue Ribbon Auto Repair",
    rating: 4.5,
    reviews: 89,
    address: "456 Oak Ave, Springfield",
    phone: "(555) 987-6543",
    website: null,
    category: "Automotive"
  },
  {
    id: "3",
    name: "Petals & Blooms Florist",
    rating: 4.9,
    reviews: 56,
    address: "789 Pine Rd, Springfield",
    phone: "(555) 456-7890",
    website: null,
    category: "Retail"
  },
  {
    id: "4",
    name: "Springfield Dental Clinic",
    rating: 4.7,
    reviews: 210,
    address: "101 Elm St, Springfield",
    phone: "(555) 222-3333",
    website: "https://springfielddental.com",
    category: "Medical"
  }
];

export default function ProspectFinder() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(4.0);
  const [onlyNoWebsite, setOnlyNoWebsite] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("google_maps_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("google_maps_api_key", key);
    setShowApiSetup(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !location) return;

    setIsSearching(true);
    try {
      const url = new URL("/api/prospects", window.location.origin);
      url.searchParams.append("query", query);
      url.searchParams.append("location", location);
      if (apiKey) url.searchParams.append("apiKey", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        setIsSimulated(data.isSimulated);
      } else if (data.error) {
        console.error("Search Error:", data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to search. Check console for details.");
    } finally {
      setIsSearching(false);
    }
  };

  const filteredResults = results.filter(biz => {
    const bizRating = parseFloat(biz.rating) || 0;
    const matchesRating = bizRating >= minRating;
    const matchesWebsite = onlyNoWebsite ? !biz.website : true;
    return matchesRating && matchesWebsite;
  });

  const addToCRM = (id: string) => {
    setAddedIds(prev => [...prev, id]);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto relative">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">Prospect Finder</h1>
          <p className="text-slate-500">Search Google Maps for high-rated businesses without a website.</p>
        </div>
        <button 
          onClick={() => setShowApiSetup(true)}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            apiKey ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
          }`}
        >
          <Settings size={18} />
          {apiKey ? "API Key Connected" : "Connect API Key"}
        </button>
      </div>

      {showApiSetup && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Setup API Key</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your Google Maps API Key to start fetching real-time data.</p>
            
            <input
              type="password"
              placeholder="Paste your API key here"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />

            <div className="flex gap-3">
              <button 
                onClick={() => setShowApiSetup(false)}
                className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => saveApiKey(apiKey)}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Save Key
              </button>
            </div>
            
            <p className="mt-6 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
              Key is stored locally in your browser
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Business category (e.g. Restaurants, Plumbers)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Location (e.g. Springfield)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : "Find Prospects"}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-600">Min Rating:</span>
              <div className="flex gap-1">
                {[3, 3.5, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      minRating === r ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100"
                    }`}
                  >
                    {r}+ ⭐
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative inline-flex items-center">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={onlyNoWebsite}
                  onChange={(e) => setOnlyNoWebsite(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Only missing website</span>
            </label>
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-900">{filteredResults.length} Results Found</h2>
              {isSimulated && (
                <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-100">
                  Mock Data (Missing API Key)
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResults.map((biz) => (
              <div key={biz.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                      {biz.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{biz.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg font-bold">
                    <Star size={16} fill="currentColor" />
                    {biz.rating}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-slate-500 text-sm">
                    <MapPin size={18} className="shrink-0" />
                    <span>{biz.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <Phone size={18} className="shrink-0" />
                    <span>{biz.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-500 text-sm font-medium">
                    <Globe size={18} className="shrink-0" />
                    <span>No website detected</span>
                  </div>
                </div>

                <button 
                  onClick={() => addToCRM(biz.id)}
                  disabled={addedIds.includes(biz.id)}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    addedIds.includes(biz.id) 
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {addedIds.includes(biz.id) ? (
                    <>
                      <CheckCircle2 size={18} /> Added to CRM
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Add to CRM
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isSearching && results.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to search?</h3>
          <p className="text-slate-500 max-w-xs mx-auto">Enter a category and location to find businesses that need your help building a website.</p>
        </div>
      )}
    </div>
  );
}
