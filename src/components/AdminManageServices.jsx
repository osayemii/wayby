import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './AdminManage.css';

const AdminManageServices = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: '',
    features: '',
    image: null,
    works: []
  });

  const [newWork, setNewWork] = useState({ title: '', description: '', image: null });

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const data = await getDocs(collection(db, 'services'));
    const servicesList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setServices(servicesList);
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

  const handleSelectService = (service) => {
    setSelectedServiceId(service.id);
    setFormData({
      name: service.name,
      icon: service.icon,
      description: service.description,
      features: service.features.join(', '),
      image: service.image,
      works: service.works || []
    });
  };

  const handleImageChange = (e, isGallery = false) => {
    const file = e.target.files[0];
    if (!file) return;

    if (isGallery && file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 90) {
          alert("Video is too long! Maximum allowed duration is 1 minute and 30 seconds (90s).");
          e.target.value = ''; // Clear input
          return;
        }
        setNewWork({ ...newWork, image: file });
      };
      video.src = URL.createObjectURL(file);
    } else {
      if (isGallery) {
        setNewWork({ ...newWork, image: file });
      } else {
        setFormData({ ...formData, image: file });
      }
    }
  };

  const addWorkToGallery = async () => {
    if (!newWork.title || !newWork.image) {
      alert("Please provide a title and image for the work gallery.");
      return;
    }
    
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(newWork.image);
      
      const workEntry = {
        id: Date.now(),
        title: newWork.title,
        description: newWork.description,
      };

      if (newWork.image instanceof File && newWork.image.type.startsWith('video/')) {
        workEntry.videoUrl = imageUrl;
        workEntry.image = ''; // No cover
      } else {
        workEntry.image = imageUrl;
        workEntry.videoUrl = '';
      }
      
      const updatedWorks = [...formData.works, workEntry];
      setFormData({ ...formData, works: updatedWorks });
      
      // AUTO-SAVE if editing an existing service
      if (selectedServiceId) {
        await updateDoc(doc(db, 'services', selectedServiceId), {
          works: updatedWorks
        });
        console.log("Gallery auto-saved to database");
      }
      
      setNewWork({ title: '', description: '', image: null });
    } catch (error) {
      console.error(error);
      alert("Gallery upload failed");
    }
    setLoading(false);
  };

  const removeWork = async (id) => {
    const updatedWorks = formData.works.filter(w => w.id !== id);
    setFormData({ ...formData, works: updatedWorks });
    
    if (selectedServiceId) {
      setLoading(true);
      try {
        await updateDoc(doc(db, 'services', selectedServiceId), {
          works: updatedWorks
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.description || !formData.features || !formData.image) {
      alert("Please complete all fields and upload a main cover image.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.image;
      if (formData.image instanceof File) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      const serviceData = {
        name: formData.name,
        icon: formData.icon || '🔧',
        description: formData.description,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
        image: imageUrl,
        works: formData.works,
        updatedAt: new Date()
      };

      if (selectedServiceId) {
        await updateDoc(doc(db, 'services', selectedServiceId), serviceData);
        alert("Service updated successfully!");
      } else {
        await addDoc(collection(db, 'services'), serviceData);
        alert("New service published!");
      }

      // CLEAR FORM
      setSelectedServiceId(null);
      setFormData({ name: '', icon: '', description: '', features: '', image: null, works: [] });
      
      // Reset file inputs manually
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = "");

      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Error saving service.");
    }
    setLoading(false);
  };

  const handleAddNew = () => {
    setSelectedServiceId(null);
    setFormData({ name: '', icon: '', description: '', features: '', image: null, works: [] });
  };

  const handleDelete = async () => {
    if (selectedServiceId && window.confirm('Delete this service permanently?')) {
      await deleteDoc(doc(db, 'services', selectedServiceId));
      setSelectedServiceId(null);
      fetchServices();
    }
  };

  return (
    <div className="manage-container">
      <div className="manage-header">
        <h2>Service Management</h2>
        <button onClick={handleAddNew} className="btn-add">
          {selectedServiceId ? '+ Create New Service' : 'Currently Creating...'}
        </button>
      </div>

      <div className="category-toggle">
        {services.map(service => (
          <button 
            key={service.id} 
            className={`toggle-btn ${selectedServiceId === service.id ? 'active' : ''}`}
            onClick={() => handleSelectService(service)}
          >
            {service.icon} {service.name}
          </button>
        ))}
        {services.length === 0 && <p>No services found. Click "+ Create New" to start.</p>}
      </div>

      <form className="manage-form" onSubmit={handleSubmit}>
        <h3>{selectedServiceId ? `Editing: ${formData.name}` : 'New Service Specification'}</h3>
        <div className="form-grid">
          <div className="input-group">
            <label>Service Name</label>
            <input type="text" placeholder="e.g. Plumbing Services" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Icon Emoji</label>
            <input type="text" placeholder="e.g. 🔧" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} required />
          </div>
          <div className="input-group" style={{gridColumn: 'span 2'}}>
            <label>Summary Description</label>
            <textarea placeholder="Describe the service..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          </div>
          <div className="input-group" style={{gridColumn: 'span 2'}}>
            <label>Core Features (Comma separated)</label>
            <input type="text" placeholder="Wiring, Repairs, Installation..." value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} required />
          </div>
          <div className="input-group" style={{gridColumn: 'span 2'}}>
            <label>Main Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
          </div>

          <div className="gallery-builder" style={{gridColumn: 'span 2', background: '#fcfcfc', padding: '25px', borderRadius: '20px', border: '1px dashed #ddd', marginTop: '20px'}}>
            <h4 style={{marginBottom: '15px'}}>Service Work Gallery</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px'}}>
              <div className="input-group"><label>Work Title</label><input type="text" value={newWork.title} onChange={(e) => setNewWork({...newWork, title: e.target.value})} /></div>
              <div className="input-group"><label>Details</label><input type="text" value={newWork.description} onChange={(e) => setNewWork({...newWork, description: e.target.value})} /></div>
              <div className="input-group"><label>Work Photo/Video (Max 1:30)</label><input type="file" accept="image/*,video/*" onChange={(e) => handleImageChange(e, true)} /></div>
            </div>
            <button type="button" onClick={addWorkToGallery} className="btn-add" style={{background: '#34495e', width: 'auto'}}>+ Add to Gallery</button>
            
            <div className="gallery-preview" style={{display: 'flex', gap: '15px', marginTop: '25px', flexWrap: 'wrap'}}>
              {formData.works.map(work => (
                <div key={work.id} style={{position: 'relative', width: '120px', textAlign: 'center'}}>
                  <img src={work.image} style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}} />
                  <p style={{fontSize: '0.7rem', marginTop: '5px', fontWeight: '600'}}>{work.title}</p>
                  <button type="button" onClick={() => removeWork(work.id)} style={{position: 'absolute', top: '-8px', right: '-8px', background: '#e74c3c', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', width: '24px', height: '24px', fontWeight: 'bold'}}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Saving Changes...' : (selectedServiceId ? 'Update Service' : 'Publish New Service')}
          </button>
          {selectedServiceId && (
            <button type="button" onClick={handleDelete} className="btn-delete" style={{padding: '16px 30px', borderRadius: '12px'}}>
              Delete Service
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminManageServices;
