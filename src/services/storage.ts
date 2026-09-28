import { WebsiteRequest } from '../types/index.ts';

// Clean storage key ensuring no past demo client orders exist
const STORAGE_KEY = 'vyroniq_orders_clean_v3';

export const storageService = {
  getRequests(): WebsiteRequest[] {
    try {
      // Clear legacy storage keys containing past demo client orders
      localStorage.removeItem('vyroniq_website_requests_v1');
      localStorage.removeItem('vyroniq_website_requests_v2');
      
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  clearAllOrders(): WebsiteRequest[] {
    try {
      localStorage.removeItem('vyroniq_website_requests_v1');
      localStorage.removeItem('vyroniq_website_requests_v2');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.warn('Clear storage error:', e);
    }
    return [];
  },

  saveRequest(newRequest: Omit<WebsiteRequest, 'id' | 'createdAt' | 'status' | 'internalNotes'>): WebsiteRequest {
    const requests = this.getRequests();
    const id = `VYR-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRequest: WebsiteRequest = {
      ...newRequest,
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
      internalNotes: ['Customer inquiry received online through VYRONIQ.AI builder form.']
    };

    const updated = [fullRequest, ...requests];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed, using memory state', e);
    }
    return fullRequest;
  },

  updateStatus(id: string, newStatus: WebsiteRequest['status']): WebsiteRequest[] {
    const requests = this.getRequests();
    const updated = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage update failed', e);
    }
    return updated;
  },

  addInternalNote(id: string, noteText: string): WebsiteRequest[] {
    const requests = this.getRequests();
    const updated = requests.map(r => {
      if (r.id === id) {
        return {
          ...r,
          internalNotes: [...(r.internalNotes || []), `${new Date().toLocaleDateString('en-GB')}: ${noteText}`]
        };
      }
      return r;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage note append failed', e);
    }
    return updated;
  },

  deleteRequest(id: string): WebsiteRequest[] {
    const requests = this.getRequests();
    const updated = requests.filter(r => r.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage delete failed', e);
    }
    return updated;
  },

  resetToDefault(): WebsiteRequest[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.warn(e);
    }
    return [];
  },

  exportAsCSV(requests: WebsiteRequest[]): void {
    const headers = ['Request ID', 'Date', 'Status', 'Business Name', 'Category', 'Phone', 'WhatsApp', 'Email', 'Location', 'Style', 'Plan'];
    const rows = requests.map(r => [
      r.id,
      new Date(r.createdAt).toLocaleDateString(),
      r.status,
      `"${r.businessName.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      r.phone,
      r.whatsapp,
      r.email,
      `"${r.location.replace(/"/g, '""')}"`,
      `"${r.websiteStyle}"`,
      r.selectedPlan
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vyroniq_customer_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportAsJSON(requests: WebsiteRequest[]): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(requests, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vyroniq_customer_requests_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);
  }
};
