import React, { useState, useMemo, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import '../categories/style.css';
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from './SearchAndSort';
import SkeletonLoader from './SkeletonLoader';

const DynamicCategory = ({ categoryName, initialProducts = [], placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('recent');
    const [selectedImage, setSelectedImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isMigrating, setIsMigrating] = useState(false);

    const getEmbedUrl = (url) => {
        if (!url) return '';
        let videoId = '';
        
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('embed/')[1].split('?')[0];
        }

        if (videoId) {
            return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        }
        return url;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log(`Checking database for category: ${categoryName}`);
                const q = query(collection(db, 'products'), where('category', '==', categoryName));
                const data = await getDocs(q);
                let productsList = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                
                if (productsList.length === 0 && initialProducts && initialProducts.length > 0) {
                    setIsMigrating(true);
                    console.log(`🚀 Starting migration for ${categoryName}...`);
                    
                    for (const product of initialProducts) {
                        const prodData = {
                            ...product,
                            category: categoryName,
                            updatedAt: new Date() // Use current time as fallback
                        };
                        
                        // If the product has a hardcoded date, use it
                        if (product.date instanceof Date) {
                            prodData.updatedAt = product.date;
                        }
                        
                        delete prodData.id;
                        delete prodData.date; // Clean up old field
                        
                        await addDoc(collection(db, 'products'), prodData);
                        console.log(`✅ Migrated: ${product.name}`);
                    }
                    
                    const newData = await getDocs(q);
                    productsList = newData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    console.log(`🏁 Migration complete for ${categoryName}!`);
                }
                
                setProducts(productsList);
            } catch (error) {
                console.error(`❌ Error in ${categoryName}:`, error);
            } finally {
                setLoading(false);
                setIsMigrating(false);
            }
        };
        fetchProducts();
    }, [categoryName]);

    const displayed = useMemo(() => {
        let list = [...products];
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            list = list.filter(p =>
                p.name.toLowerCase().includes(term) ||
                (p.definition && p.definition.toLowerCase().includes(term))
            );
        }
        if (sortKey === 'aToZ') {
            list.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortKey === 'zToA') {
            list.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortKey === 'newArrivals') {
            list.sort((a, b) => {
                const timeA = a.updatedAt?.seconds || a.updatedAt?.getTime?.() || 0;
                const timeB = b.updatedAt?.seconds || b.updatedAt?.getTime?.() || 0;
                return timeB - timeA;
            });
        }
        return list;
    }, [searchTerm, sortKey, products]);

    useEffect(() => {
        const blockScroll = !!selectedImage;
        document.body.style.overflow = blockScroll ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto' };
    }, [selectedImage]);

    if (isMigrating) {
        return (
            <div className="text-center p-5" style={{marginTop: '100px'}}>
                <div className="spinner" style={{marginBottom: '20px'}}></div>
                <h2>Setting up {categoryName}...</h2>
                <p>We are moving your products to the database for the first time. Please wait a moment.</p>
            </div>
        );
    }

    return (
        <div id='section'>
            <SearchAndSort 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortKey={sortKey}
                setSortKey={setSortKey}
                placeholder={placeholder}
            />

            {loading ? (
                <SkeletonLoader count={8} />
            ) : (
                <div className="product-list">
                    {displayed.length > 0 ? (
                        displayed.map(product => (
                            <div onClick={() => setSelectedImage(product)} key={product.id} className="product-card">
                                <div className="product-image">
                                    {categoryName === 'Videos' ? (
                                        product.image ? (
                                            <div style={{position: 'relative', height: '450px'}}>
                                                <img src={product.image} alt={product.name} loading='lazy' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                                <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '3rem', cursor: 'pointer'}}>
                                                    ▶
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="video-placeholder-ui" style={{height: '450px', background: '#2d3436', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem', cursor: 'pointer'}}>
                                                ▶
                                            </div>
                                        )
                                    ) : (
                                        <img src={product.image} alt={product.name} loading='lazy'/>
                                    )}
                                    {product.soldOut && (
                                        <div className="product-overlay">
                                            <button className="btn btn-primary">Sold Out</button>
                                        </div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="product-description">{product.definition}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <img src={sadImage} alt="No products found" className="sad-icon" />
                            <h2 className="conditionH2">
                                Ohh no... we couldn’t find any product.
                            </h2>
                        </div>
                    )}
                </div>
            )}

            {selectedImage && (
                <div className="modal" onClick={() => setSelectedImage(null)}>
                    <span className="close">&times;</span>
                    {categoryName === 'Videos' ? (
                        <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '1000px', width: '95%', margin: 'auto', background: 'transparent', boxShadow: 'none'}}>
                            <div className="video-responsive-container" style={{position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '15px', background: '#000', boxShadow: '0 10px 50px rgba(0,0,0,0.5)'}}>
                                {(selectedImage.videoUrl?.includes('youtube.com') || selectedImage.videoUrl?.includes('youtu.be') || selectedImage.image?.includes('youtube.com') || selectedImage.image?.includes('youtu.be')) ? (
                                    <iframe 
                                        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                                        src={getEmbedUrl(selectedImage.videoUrl || selectedImage.image)} 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video 
                                        src={selectedImage.videoUrl || selectedImage.image} 
                                        controls 
                                        autoPlay 
                                        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain'}} 
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <img src={selectedImage.image || selectedImage} alt="Full View" className='modal-image' />
                    )}
                </div>
            )}
        </div>
    );
};

export default DynamicCategory;
