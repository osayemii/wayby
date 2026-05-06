import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import './AdminManage.css';

const AdminManageCategories = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('BedRoom');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    definition: '',
    price: '',
    soldOut: false,
    videoUrl: '',
    image: null,
    videoFile: null
  });

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const categories = [
    'BedRoom', 'LivingRoom', 'KitchenAndDinning', 'Wardrobe', 
    'Office', 'Door', 'TVstands', 'TableAndShelf', 'Videos'
  ];

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    setLoading(true);
    const q = query(collection(db, 'products'), where('category', '==', selectedCategory));
    const data = await getDocs(q);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });
    const result = await response.json();
    return result.secure_url;
  };

  const handleImageChange = (e, field = 'image') => {
    const file = e.target.files[0];
    if (!file) return;

    if (field === 'videoFile') {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 90) {
          alert("Video is too long! Maximum allowed duration is 1 minute and 30 seconds (90s).");
          e.target.value = '';
          return;
        }
        setFormData({ ...formData, videoFile: file });
      };
      video.src = URL.createObjectURL(file);
    } else {
      setFormData({ ...formData, [field]: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.definition) {
      alert("Please fill in the title and description.");
      return;
    }

    if (selectedCategory !== 'Videos' && !formData.price) {
      alert("Please provide a price.");
      return;
    }

    if (selectedCategory === 'Videos' && !formData.videoUrl && !formData.videoFile && !editingId) {
      alert("Please provide either a Video URL or upload a Video File.");
      return;
    }

    if (!formData.image && !editingId) {
      alert("Please upload a cover image.");
      return;
    }

    setLoading(true);
    try {
      let mediaUrl = formData.image;
      if (formData.image instanceof File) {
        mediaUrl = await uploadToCloudinary(formData.image);
      }

      let videoFileUrl = formData.videoFile;
      if (formData.videoFile instanceof File) {
        videoFileUrl = await uploadToCloudinary(formData.videoFile);
      }

      const itemData = {
        name: formData.name,
        definition: formData.definition,
        category: selectedCategory,
        updatedAt: new Date()
      };

      if (selectedCategory === 'Videos') {
        itemData.videoUrl = formData.videoUrl || (typeof videoFileUrl === 'string' ? videoFileUrl : '');
        itemData.image = typeof mediaUrl === 'string' ? mediaUrl : '';
      } else {
        itemData.price = Number(formData.price);
        itemData.soldOut = formData.soldOut;
        itemData.image = typeof mediaUrl === 'string' ? mediaUrl : '';
      }

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), itemData);
        alert("Item updated successfully!");
      } else {
        await addDoc(collection(db, 'products'), itemData);
        alert("New entry published!");
      }

      // CLEAR ALL FIELDS
      setFormData({ name: '', definition: '', price: '', soldOut: false, videoUrl: '', image: null, videoFile: null });
      setEditingId(null);
      
      // Reset file inputs manually
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = "");
      
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Error saving item.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      definition: item.definition,
      price: item.price || '',
      soldOut: item.soldOut || false,
      videoUrl: item.videoUrl || '',
      image: item.image || null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item permanently?')) {
      await deleteDoc(doc(db, 'products', id));
      fetchItems();
    }
  };


  const [listSearch, setListSearch] = useState('');
  const [listSort, setListSort] = useState('recent');

  const filteredItems = useMemo(() => {
    let list = [...items];
    if (listSearch) {
      const term = listSearch.toLowerCase();
      list = list.filter(i => 
        i.name.toLowerCase().includes(term) || 
        i.definition.toLowerCase().includes(term)
      );
    }
    if (listSort === 'aToZ') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (listSort === 'zToA') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (listSort === 'recent') {
      list.sort((a, b) => {
        const timeA = a.updatedAt?.seconds || 0;
        const timeB = b.updatedAt?.seconds || 0;
        if (timeA === timeB) return 0;
        return timeB - timeA;
      });
    }
    return list;
  }, [items, listSearch, listSort]);

  const cleanDuplicates = async () => {
    setLoading(true);
    try {
      const data = await getDocs(collection(db, 'products'));
      const seen = new Set();
      const duplicates = [];
      
      data.docs.forEach(doc => {
        const name = doc.data().name;
        const category = doc.data().category;
        const key = `${name}-${category}`; // Unique by name AND category
        if (seen.has(key)) {
          duplicates.push(doc.id);
        } else {
          seen.add(key);
        }
      });

      for (const id of duplicates) {
        await deleteDoc(doc(db, 'products', id));
      }
      
      alert(`Cleaned up ${duplicates.length} duplicate entries!`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="manage-container">
      <div className="manage-header">
        <h2>Content Management</h2>
        <div style={{display: 'flex', gap: '10px'}}>
          <button onClick={cleanDuplicates} className="btn-add" style={{background: '#f39c12'}}>Clean Duplicates</button>
          <button onClick={() => {setEditingId(null); setFormData({name: '', definition: '', price: '', soldOut: false, videoUrl: '', image: null})}} className="btn-add">
            {editingId ? 'Cancel Edit' : '+ Create New'}
          </button>
        </div>
      </div>

      <div className="category-toggle">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`toggle-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="manage-content">
        <form className="manage-form" onSubmit={handleSubmit}>
          {/* Form fields remain exactly the same */}
          <h3>{editingId ? 'Edit Item' : 'New ' + selectedCategory + ' Entry'}</h3>
          <div className="form-grid">
            <div className="input-group">
              <label>Title / Name</label>
              <input 
                type="text" 
                placeholder="Enter title" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {selectedCategory !== 'Videos' ? (
              <div className="input-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
            ) : ""}

            <div className="input-group" style={{gridColumn: 'span 2'}}>
              <label>Description</label>
              <textarea 
                placeholder="Provide a detailed description..." 
                value={formData.definition}
                onChange={(e) => setFormData({...formData, definition: e.target.value})}
                required
              />
            </div>

            {selectedCategory !== 'Videos' && (
              <div className="checkbox-group" style={{display: 'flex', alignItems: 'center', gap: '10px', gridColumn: 'span 2'}}>
                <input 
                  type="checkbox" 
                  checked={formData.soldOut}
                  onChange={(e) => setFormData({...formData, soldOut: e.target.checked})}
                  style={{width: 'auto'}}
                />
                <label style={{fontSize: '0.9rem', fontWeight: '600'}}>Mark as Sold Out</label>
              </div>
            )}

            {selectedCategory === 'Videos' && (
              <div className="input-group" style={{gridColumn: 'span 2'}}>
                <label>Video File (Upload - Max 1:30 min)</label>
                <input 
                  type="file" 
                  onChange={(e) => handleImageChange(e, 'videoFile')} 
                  accept="video/*" 
                />
              </div>
            )}

            <div className="input-group" style={{gridColumn: 'span 2'}}>
              <label>{selectedCategory === 'Videos' ? 'Cover Image' : 'Product Image'}</label>
              <input 
                type="file" 
                onChange={(e) => handleImageChange(e, 'image')} 
                accept="image/*" 
                required={!editingId}
              />
            </div>
          </div>
          
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Processing...' : (editingId ? 'Save Changes' : 'Publish Entry')}
          </button>
        </form>

        <div className="list-controls" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: 'white', padding: '15px 25px', borderRadius: '15px', boxShadow: 'var(--shadow)'}}>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center', flex: 1}}>
            <span style={{fontWeight: '700', color: 'var(--admin-primary)', background: '#f8f4f0', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem'}}>
              {filteredItems.length} {selectedCategory} Items
            </span>
            <input 
              type="text" 
              placeholder={`Search in ${selectedCategory}...`}
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}
              style={{maxWidth: '300px', padding: '8px 15px', borderRadius: '10px', border: '1px solid #eee', outline: 'none'}}
            />
          </div>
          <select 
            value={listSort}
            onChange={(e) => setListSort(e.target.value)}
            style={{padding: '8px 15px', borderRadius: '10px', border: '1px solid #eee', width: 'auto', outline: 'none', cursor: 'pointer'}}
          >
            <option value="recent">Recently Added</option>
            <option value="aToZ">A to Z</option>
            <option value="zToA">Z to A</option>
          </select>
        </div>

        <div className="items-list">
          {filteredItems.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-image-wrapper">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="item-thumb" />
                ) : selectedCategory === 'Videos' && item.videoUrl ? (
                   <div className="video-placeholder" style={{height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
                     ▶ Video Entry
                   </div>
                ) : (
                  <img src='https://via.placeholder.com/300' alt="No Preview" className="item-thumb" />
                )}
                {item.soldOut && <span className="item-badge" style={{background: '#e74c3c', color: 'white'}}>SOLD OUT</span>}
              </div>
              <div className="item-content">
                <h4>{item.name}</h4>
                <p>{item.definition}</p>
                {selectedCategory !== 'Videos' && <strong style={{color: '#8B7355'}}>${item.price}</strong>}
              </div>
              <div className="item-footer">
                <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && !loading && (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px', background: 'white', borderRadius: '20px'}}>
              <p style={{color: '#636e72'}}>No entries found in this category. Start by creating one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManageCategories;
