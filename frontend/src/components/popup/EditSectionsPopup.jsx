import React, { useEffect, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://thinhvuongtaichinh.net/backend').replace(/\/$/, '');

const EditSectionsPopup = ({ open, onClose }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 2500);
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/sections/get_sections.php`, { credentials: 'include', cache: 'no-store' });
      const data = await res.json();
      setItems(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      setError('Không thể tải danh sách.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (open) fetchItems(); }, [open]);

  const persist = async (next, successMsg = 'Đã lưu thay đổi') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/sections/update_sections.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ sections: next })
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || 'Lưu thất bại');
      }
      setItems(next);
      showNotice(successMsg);
    } catch (e) {
      setError(e.message || 'Không thể lưu thay đổi.');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    const value = newItem.trim();
    if (!value) { setError('Vui lòng nhập nội dung.'); return; }
    await persist([ ...items, value ], 'Đã thêm mục');
    setNewItem('');
  };

  const updateItem = async (index, name) => {
    const value = (name || '').trim();
    if (!value) { setError('Tên không được để trống.'); return; }
    const copy = items.slice();
    copy[index] = value;
    await persist(copy, 'Đã cập nhật mục');
  };

  const deleteItem = async (index) => {
    if (!confirm('Xóa mục này?')) return;
    const copy = items.filter((_, i) => i !== index);
    await persist(copy, 'Đã xóa mục');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Chỉnh sửa danh sách dịch vụ/khóa học</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {notice && (
          <div className="mb-3 px-3 py-2 rounded bg-green-50 text-green-700 text-sm border border-green-200">{notice}</div>
        )}
        {error && (
          <div className="mb-3 px-3 py-2 rounded bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>
        )}

        <div className="flex gap-2 mb-4">
          <input value={newItem} onChange={(e)=>setNewItem(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Thêm mục mới" />
          <button onClick={addItem} disabled={loading} className={`px-3 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>{loading ? 'Đang lưu...' : 'Thêm'}</button>
        </div>

        <div className="max-h-72 overflow-y-auto divide-y border rounded">
          {items.map((name, idx) => (
            <Row key={idx} index={idx} name={name} onSave={updateItem} onDelete={deleteItem} loading={loading} />
          ))}
          {items.length === 0 && <div className="p-4 text-sm text-gray-500">Chưa có mục nào</div>}
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 border rounded">Đóng</button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ index, name, onSave, onDelete, loading }) => {
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-center gap-2 p-2">
      <input
        className={`flex-1 border rounded px-2 py-1 ${editing ? '' : 'bg-gray-50'}`}
        value={value}
        onChange={(e)=>{ setValue(e.target.value); setEditing(true); }}
      />
      <button disabled={loading} onClick={()=>onSave(index, value)} className={`px-2 py-1 text-white rounded text-sm ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>Lưu</button>
      <button disabled={loading} onClick={()=>onDelete(index)} className={`px-2 py-1 text-white rounded text-sm ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}>Xóa</button>
    </div>
  );
};

export default EditSectionsPopup;
