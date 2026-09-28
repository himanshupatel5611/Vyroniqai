import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase.ts';
import { WebsiteRequest, Testimonial } from '../types/index.ts';
import { INITIAL_REQUESTS, TESTIMONIALS_DATA } from '../data/mockData.ts';
import { storageService } from './storage.ts';

const REQUESTS_COLLECTION = 'websiteRequests';
const TESTIMONIALS_COLLECTION = 'testimonials';

export const firestoreService = {
  /**
   * Save a new website request to Firestore with offline/local fallback
   */
  async saveWebsiteRequest(
    requestData: Omit<WebsiteRequest, 'id' | 'createdAt' | 'status' | 'internalNotes'>,
    userId?: string
  ): Promise<WebsiteRequest> {
    const id = `VYR-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRequest: WebsiteRequest = {
      ...requestData,
      id,
      userId: userId || auth.currentUser?.uid || undefined,
      createdAt: new Date().toISOString(),
      status: 'new',
      internalNotes: ['Customer inquiry received online through VYRONIQ.AI builder form.']
    };

    // Save locally first for instant offline readiness
    try {
      const local = storageService.getRequests();
      const updated = [fullRequest, ...local.filter(r => r.id !== id)];
      localStorage.setItem('vyroniq_orders_clean_v3', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save fallback note', e);
    }

    // Persist in Firestore
    try {
      const ref = doc(db, REQUESTS_COLLECTION, id);
      await setDoc(ref, fullRequest);
    } catch (error) {
      console.warn('Firestore sync will complete once online:', error);
      // We don't crash user UX if client is offline
    }

    return fullRequest;
  },

  /**
   * Fetch website requests from Firestore (Admin views all, client views own)
   */
  async getWebsiteRequests(isAdmin: boolean = false, userUid?: string): Promise<WebsiteRequest[]> {
    try {
      const colRef = collection(db, REQUESTS_COLLECTION);
      let q;
      if (isAdmin) {
        q = query(colRef);
      } else if (userUid) {
        q = query(colRef, where('userId', '==', userUid));
      } else {
        return storageService.getRequests();
      }

      const snap = await getDocs(q);
      if (snap.empty) {
        return storageService.getRequests();
      }

      const list: WebsiteRequest[] = [];
      snap.forEach(d => {
        list.push(d.data() as WebsiteRequest);
      });
      // Sort newest first
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return list;
    } catch (error) {
      console.warn('Reading from local storage fallback due to Firestore permissions or network:', error);
      return storageService.getRequests();
    }
  },

  /**
   * Update request status in Firestore
   */
  async updateStatus(id: string, newStatus: WebsiteRequest['status']): Promise<void> {
    storageService.updateStatus(id, newStatus);
    try {
      const ref = doc(db, REQUESTS_COLLECTION, id);
      await updateDoc(ref, { status: newStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${REQUESTS_COLLECTION}/${id}`);
    }
  },

  /**
   * Add internal note to a request in Firestore
   */
  async addNote(id: string, noteText: string, currentNotes: string[] = []): Promise<string[]> {
    const updatedNotes = [...currentNotes, `${new Date().toLocaleDateString('en-GB')}: ${noteText}`];
    storageService.addInternalNote(id, noteText);
    try {
      const ref = doc(db, REQUESTS_COLLECTION, id);
      await updateDoc(ref, { internalNotes: updatedNotes });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${REQUESTS_COLLECTION}/${id}`);
    }
    return updatedNotes;
  },

  /**
   * Delete request from Firestore
   */
  async deleteRequest(id: string): Promise<void> {
    storageService.deleteRequest(id);
    try {
      const ref = doc(db, REQUESTS_COLLECTION, id);
      await deleteDoc(ref);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${REQUESTS_COLLECTION}/${id}`);
    }
  },

  /**
   * Clear all customer requests from both local storage and Firestore
   */
  async clearAllOrders(): Promise<void> {
    storageService.clearAllOrders();
    try {
      const colRef = collection(db, REQUESTS_COLLECTION);
      const snap = await getDocs(colRef);
      const promises = snap.docs.map(d => deleteDoc(d.ref));
      await Promise.all(promises);
    } catch (error) {
      console.warn('Firestore clearAllOrders warning:', error);
    }
  },

  /**
   * Fetch testimonials from Firestore or seed with initial verified testimonials
   */
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const colRef = collection(db, TESTIMONIALS_COLLECTION);
      const snap = await getDocs(colRef);
      if (snap.empty) {
        // Return default testimonials
        return TESTIMONIALS_DATA;
      }
      const list: Testimonial[] = [];
      snap.forEach(d => {
        list.push(d.data() as Testimonial);
      });
      // Combine with initial list if fewer, ensuring rich variety
      const ids = new Set(list.map(t => t.id));
      const combined = [...list, ...TESTIMONIALS_DATA.filter(t => !ids.has(t.id))];
      return combined;
    } catch (error) {
      console.warn('Falling back to local testimonials:', error);
      return TESTIMONIALS_DATA;
    }
  },

  /**
   * Add a client feedback testimonial to Firestore
   */
  async addTestimonial(testimonialData: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
    const id = `rev-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id,
      verified: true,
      createdAt: new Date().toISOString()
    };

    try {
      const ref = doc(db, TESTIMONIALS_COLLECTION, id);
      await setDoc(ref, newTestimonial);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${TESTIMONIALS_COLLECTION}/${id}`);
    }

    return newTestimonial;
  }
};
