import React, { useState } from 'react';
import { WebsiteRequest } from '../types/index.ts';
import { storageService } from '../services/storage.ts';
import { firestoreService } from '../services/firestoreService.ts';
import { useAuth } from '../contexts/AuthContext.tsx';
import { VYRONIQ_LOGO_IMAGE } from '../data/mockData.ts';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  RotateCcw, 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Check, 
  Trash2, 
  ExternalLink,
  Plus,
  Eye,
  X,
  FileSpreadsheet,
  LogIn,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  requests: WebsiteRequest[];
  onUpdateRequest: (updated: WebsiteRequest[]) => void;
  onReturnToSite: () => void;
  onOpenBuildModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  requests,
  onUpdateRequest,
  onReturnToSite,
  onOpenBuildModal
}) => {
  const { currentUser, isAdmin, signInWithGoogle, logOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [newNote, setNewNote] = useState('');

  // Strict access guard: only vyroniqai640@gmail.com can view or manage customer orders
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#07080e] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0b0d18] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white font-display">Owner Access Only</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              This request management portal is strictly reserved for the owner of VYRONIQ.AI. Please sign in with your verified administrator account (<span className="text-purple-300 font-mono">vyroniqai640@gmail.com</span>).
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => signInWithGoogle().catch(() => {})}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:brightness-110 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In as Admin</span>
            </button>
            <button
              onClick={onReturnToSite}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-medium cursor-pointer transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Metrics
  const totalCount = requests.length;
  const newCount = requests.filter(r => r.status === 'new').length;
  const inProgressCount = requests.filter(r => r.status === 'in_review' || r.status === 'in_development').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  // Filtered requests
  const filtered = requests.filter(r => {
    const matchesSearch = 
      r.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: WebsiteRequest['status']) => {
    const updated = storageService.updateStatus(id, newStatus);
    onUpdateRequest(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
    await firestoreService.updateStatus(id, newStatus).catch(err => console.warn('Firestore update:', err));
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newNote.trim()) return;
    const updated = storageService.addInternalNote(selectedRequest.id, newNote.trim());
    onUpdateRequest(updated);
    const updatedReq = updated.find(r => r.id === selectedRequest.id);
    if (updatedReq) setSelectedRequest(updatedReq);
    const text = newNote.trim();
    setNewNote('');
    await firestoreService.addNote(selectedRequest.id, text, selectedRequest.internalNotes).catch(err => console.warn('Firestore note:', err));
  };

  const handleDeleteRequest = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer request?')) {
      const updated = storageService.deleteRequest(id);
      onUpdateRequest(updated);
      setSelectedRequest(null);
      await firestoreService.deleteRequest(id).catch(err => console.warn('Firestore delete:', err));
    }
  };

  const handleClearAllOrders = async () => {
    if (window.confirm('Are you sure you want to permanently clear all customer orders? This will clear all past client order data.')) {
      const cleared = storageService.clearAllOrders();
      onUpdateRequest(cleared);
      setSelectedRequest(null);
      try {
        await firestoreService.clearAllOrders();
      } catch (err) {
        console.warn('Firestore clear error:', err);
      }
    }
  };

  const getStatusBadge = (status: WebsiteRequest['status']) => {
    switch (status) {
      case 'new':
        return <span className="text-emerald-400 font-medium">New Request</span>;
      case 'in_review':
        return <span className="text-blue-400 font-medium">In Review</span>;
      case 'in_development':
        return <span className="text-purple-400 font-medium">In Development</span>;
      case 'completed':
        return <span className="text-teal-400 font-medium">Live / Completed</span>;
      case 'archived':
        return <span className="text-slate-500 font-medium">Archived</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-slate-100 pb-20">
      
      {/* Admin Top Header */}
      <div className="sticky top-0 z-30 bg-[#090b14]/95 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToSite}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-white/15 p-0.5 shadow-sm shrink-0">
                <img 
                  src={VYRONIQ_LOGO_IMAGE} 
                  alt="VYRONIQ Logo" 
                  className="w-full h-full object-cover rounded-[6px]"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                  <span>VYRONIQ.AI</span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                    Request Manager
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs">
                {currentUser.photoURL && (
                  <img src={currentUser.photoURL} alt="" className="w-5 h-5 rounded-full" />
                )}
                <span className="text-slate-300 truncate max-w-[140px]">{currentUser.email}</span>
                {isAdmin ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Admin
                  </span>
                ) : (
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
                    Client
                  </span>
                )}
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle().catch(() => {})}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Login</span>
              </button>
            )}

            {requests.length > 0 && (
              <button
                onClick={handleClearAllOrders}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Permanently remove all client orders"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All Orders</span>
              </button>
            )}

            <button
              onClick={() => storageService.exportAsCSV(requests)}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-lg flex items-center gap-1.5 cursor-pointer"
              title="Download spreadsheet CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => storageService.exportAsJSON(requests)}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-lg flex items-center gap-1.5 cursor-pointer"
              title="Download raw JSON"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={onOpenBuildModal}
              className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#0b0d18] border border-white/10">
            <span className="text-xs text-slate-400 font-medium">Total Customer Inquiries</span>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{totalCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">All registered website briefs</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0d18] border border-emerald-500/20">
            <span className="text-xs text-emerald-400 font-medium">New / Unprocessed</span>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{newCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Awaiting initial WhatsApp call</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0d18] border border-purple-500/20">
            <span className="text-xs text-purple-400 font-medium">In Development / Review</span>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{inProgressCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">48h prototyping in progress</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0d18] border border-blue-500/20">
            <span className="text-xs text-blue-400 font-medium">Live / Delivered</span>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{completedCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Active recurring subscriptions</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0b0d18] border border-white/10 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by business name, phone, email, category..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Status Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {['all', 'new', 'in_review', 'in_development', 'completed', 'archived'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize cursor-pointer ${
                  statusFilter === status
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white bg-white/[0.02]'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table / Cards */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0b0d18] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-white">
              {requests.length === 0 ? 'All past client orders cleared' : 'No customer requests match your filter'}
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {requests.length === 0 
                ? 'Your order inbox is clean. When small business owners submit the "Build My Website" multi-step questionnaire, their requests will appear here in real time.'
                : 'Try adjusting your search keywords or clear the status filter.'}
            </p>
            {requests.length === 0 ? (
              <button
                onClick={onOpenBuildModal}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:brightness-110 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Test Customer Entry</span>
              </button>
            ) : (
              <button
                onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                className="px-4 py-2 text-xs text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-950/20 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#0b0d18] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#0d0f1e] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Request ID</th>
                    <th className="py-3.5 px-4">Business</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Plan</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {filtered.map(req => (
                    <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-purple-300 whitespace-nowrap">
                        {req.id}
                      </td>
                      <td className="py-4 px-4 font-semibold text-white whitespace-nowrap">
                        {req.businessName}
                        <div className="text-[11px] font-normal text-slate-400">{req.location}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {req.category}
                      </td>
                      <td className="py-4 px-4 font-mono font-medium">
                        {req.selectedPlan === 'monthly' ? (
                          <span className="text-slate-200">₹699/mo</span>
                        ) : (
                          <span className="text-emerald-400">₹6,999/yr</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${req.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-slate-300 font-mono text-[11px]">{req.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 rounded-lg transition-colors cursor-pointer"
                        >
                          View Brief
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer options */}
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
          <div>
            Data is securely persisted in local storage with automatic backup capability.
          </div>
          <button
            onClick={handleClearAllOrders}
            className="flex items-center gap-1.5 text-rose-400/80 hover:text-rose-300 transition-colors cursor-pointer"
            title="Permanently remove all orders"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear All Customer Orders</span>
          </button>
        </div>

      </main>

      {/* Request Inspection Modal / Drawer */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-[#0d0f1e] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-purple-400">{selectedRequest.id}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400">
                    Received {new Date(selectedRequest.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedRequest.businessName}</h2>
                <p className="text-xs text-slate-400">{selectedRequest.location}</p>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/[0.04]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Lifecycle Status:</span>
                <select
                  value={selectedRequest.status}
                  onChange={e => handleStatusChange(selectedRequest.id, e.target.value as WebsiteRequest['status'])}
                  className="px-3 py-1.5 text-xs bg-[#131627] border border-purple-500/40 rounded-lg text-white font-medium focus:outline-none"
                >
                  <option value="new">New Request</option>
                  <option value="in_review">In Review</option>
                  <option value="in_development">In Development (48h)</option>
                  <option value="completed">Completed / Live</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedRequest.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${selectedRequest.businessName}! This is the VYRONIQ.AI engineering team regarding your website request (${selectedRequest.id}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Client</span>
                </a>

                <a
                  href={`mailto:${selectedRequest.email}?subject=${encodeURIComponent(`VYRONIQ.AI Website Prototype: ${selectedRequest.businessName}`)}`}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 rounded-lg flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Specification Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px]">Business Profile</div>
                <div><strong className="text-slate-400">Category:</strong> {selectedRequest.category}</div>
                <div><strong className="text-slate-400">Phone:</strong> {selectedRequest.phone}</div>
                <div><strong className="text-slate-400">WhatsApp:</strong> {selectedRequest.whatsapp}</div>
                <div><strong className="text-slate-400">Email:</strong> {selectedRequest.email}</div>
                <div><strong className="text-slate-400">Plan:</strong> {selectedRequest.selectedPlan === 'monthly' ? 'Monthly (₹699/mo)' : 'Yearly (₹6,999/yr)'}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px]">Design Preferences</div>
                <div><strong className="text-slate-400">Style:</strong> {selectedRequest.websiteStyle}</div>
                <div className="flex items-center gap-1.5 pt-1">
                  <strong className="text-slate-400">Colors:</strong>
                  {selectedRequest.preferredColors?.map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: c }} />
                  ))}
                </div>
                {selectedRequest.socialLinks && (
                  <div className="pt-1">
                    <strong className="text-slate-400">Socials:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedRequest.socialLinks.instagram && (
                        <a href={selectedRequest.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-purple-400 underline">Instagram</a>
                      )}
                      {selectedRequest.socialLinks.googleMaps && (
                        <a href={selectedRequest.socialLinks.googleMaps} target="_blank" rel="noreferrer" className="text-blue-400 underline">Maps</a>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* About & Services */}
            <div className="space-y-3 mb-6 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-white mb-1">Products & Services Offered</div>
                <p className="text-slate-300 leading-relaxed">{selectedRequest.services}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-white mb-1">About the Business</div>
                <p className="text-slate-300 leading-relaxed">{selectedRequest.aboutBusiness}</p>
              </div>

              {selectedRequest.specialRequirements && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <div className="font-semibold text-purple-300 mb-1">Special Requirements & Custom Features</div>
                  <p className="text-slate-300 leading-relaxed">{selectedRequest.specialRequirements}</p>
                </div>
              )}
            </div>

            {/* Uploaded Assets Preview (if any) */}
            {(selectedRequest.logoUrl || (selectedRequest.photos && selectedRequest.photos.length > 0)) && (
              <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="font-semibold text-white text-xs mb-3">Uploaded Brand Assets</div>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedRequest.logoUrl && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 bg-black p-1">
                      <img src={selectedRequest.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  )}
                  {selectedRequest.photos?.map((photo, i) => (
                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 bg-black">
                      <img src={photo} alt={`Photo ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Work Notes */}
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Internal Engineering Notes</h3>
              
              <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
                {(!selectedRequest.internalNotes || selectedRequest.internalNotes.length === 0) ? (
                  <div className="text-xs text-slate-500 italic">No notes recorded yet.</div>
                ) : (
                  selectedRequest.internalNotes.map((note, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                      {note}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Add internal note (e.g. Staging link sent, client requested blue tweak)..."
                  className="flex-grow px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg"
                >
                  Add Note
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
