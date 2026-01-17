
import { AppData, SecurityLog } from '../types';
import { INITIAL_DATA } from '../constants';
import { security } from './security';

const DB_KEY = 'dede_portfolio_db';

export const storage = {
  getData: (): AppData => {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(data);
  },

  saveData: (data: AppData) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  addLog: (action: string, status: 'success' | 'warning' | 'danger') => {
    const data = storage.getData();
    const newLog: SecurityLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date().toLocaleString(),
      status
    };
    data.logs.unshift(newLog);
    if (data.logs.length > 50) data.logs.pop(); // Keep last 50
    storage.saveData(data);
  },

  updateProfile: (profile: any) => {
    const data = storage.getData();
    // Sanitize values
    const sanitized = {
      ...profile,
      name: security.sanitize(profile.name),
      about: security.sanitize(profile.about)
    };
    data.profile = { ...data.profile, ...sanitized };
    storage.addLog('Update Profil User', 'success');
    storage.saveData(data);
  },

  addItem: <T extends { id: string }>(key: keyof AppData, item: T) => {
    const data = storage.getData();
    // Basic sanitization for common fields
    const sanitizedItem = { ...item };
    if ('name' in sanitizedItem && typeof sanitizedItem.name === 'string') {
        (sanitizedItem as any).name = security.sanitize(sanitizedItem.name);
    }
    if ('title' in sanitizedItem && typeof sanitizedItem.title === 'string') {
        (sanitizedItem as any).title = security.sanitize(sanitizedItem.title);
    }
    
    (data[key] as any[]).push(sanitizedItem);
    storage.addLog(`Tambah Data ke ${key}`, 'success');
    storage.saveData(data);
  },

  updateItem: <T extends { id: string }>(key: keyof AppData, item: T) => {
    const data = storage.getData();
    const index = (data[key] as any[]).findIndex((i: any) => i.id === item.id);
    if (index !== -1) {
      (data[key] as any[])[index] = item;
      storage.addLog(`Update Data di ${key} (ID: ${item.id})`, 'success');
      storage.saveData(data);
    }
  },

  deleteItem: (key: keyof AppData, id: string) => {
    const data = storage.getData();
    (data as any)[key] = (data[key] as any[]).filter((i: any) => i.id !== id);
    storage.addLog(`Hapus Data dari ${key} (ID: ${id})`, 'danger');
    storage.saveData(data);
  }
};
