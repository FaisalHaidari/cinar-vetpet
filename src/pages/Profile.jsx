import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, updateUser, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // فیلدهای جدید برای ویرایش
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [activeTab, setActiveTab] = useState('profile');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', avatar: '', role: 'USER' });
  const [showNewMenuModal, setShowNewMenuModal] = useState(false);
  const [urunler, setUrunler] = useState([]);
  const [newMenu, setNewMenu] = useState({ image: '', name: '', price: '', category: '' });
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [showEditMenuModal, setShowEditMenuModal] = useState(false);
  const [editMenuForm, setEditMenuForm] = useState({ image: '', name: '', price: '', category: '' });

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (!user) return <div style={{textAlign:'center',marginTop:40}}>Giriş yapmadınız.</div>;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3002/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phone, avatar }),
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data.user);
        alert('Profil başarıyla güncellendi!');
      } else {
        alert(data.message || 'Bir hata oluştu!');
      }
    } catch (err) {
      alert('Sunucuya bağlanılamadı!');
    }
  };

  // تابع برای آپلود عکس
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch users when Users tab is active
  useEffect(() => {
    if (activeTab === 'users' && isAdmin()) {
      fetch('http://localhost:3002/users')
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, [activeTab, isAdmin]);

  // Fetch menu items when Menu Items tab is active
  useEffect(() => {
    if (activeTab === 'menu' && isAdmin()) {
      fetch('http://localhost:3002/urunler')
        .then(res => res.json())
        .then(data => setUrunler(data))
        .catch(err => console.error('Error fetching menu items:', err));
    }
  }, [activeTab, isAdmin]);

  // Handle edit button
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
      role: user.role || 'USER'
    });
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle avatar upload in edit
  const handleEditAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditForm(f => ({ ...f, avatar: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save edit
  const handleEditSave = async (e) => {
    e.preventDefault();

    // Clean up phone and avatar values before sending
    const cleanedPhone = editForm.phone ? String(editForm.phone).replace(/[\\"]/g, '') : '';
    const cleanedAvatar = editForm.avatar ? String(editForm.avatar).replace(/[\\"]/g, '') : '';

    const dataToSend = {
      ...editForm,
      phone: cleanedPhone,
      avatar: cleanedAvatar,
    };

    try {
      const res = await fetch(`http://localhost:3002/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        alert('User updated successfully!');
        setEditingUser(null);
        // Refresh the users list after update
        fetch('http://localhost:3002/users')
          .then(res => res.json())
          .then(data => setUsers(data))
          .catch(err => console.error('Error fetching users after update:', err));
      } else {
        alert(data.message || 'Failed to update user!');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to connect to server.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`http://localhost:3002/users/${userId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          alert('User deleted successfully!');
          // Refresh user list after successful deletion
          fetch('http://localhost:3002/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users after deletion:', err));
          // Close modal
          setEditingUser(null);
        } else {
          alert(data.message || 'Failed to delete user!');
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to connect to server.');
      }
    }
  };

  return (
    <div style={{maxWidth:600,margin:"40px auto",padding:24,borderRadius:12,boxShadow:"0 2px 12px #eee",background:"#fff",textAlign:'center'}}>
      {/* Admin Tabs */}
      <div style={{display:'flex',justifyContent:'center',gap:16,marginBottom:32}}>
        <button
          onClick={()=>setActiveTab('profile')}
          style={{
            padding:'12px 32px',
            borderRadius:24,
            border:'none',
            fontWeight:600,
            fontSize:18,
            background: activeTab==='profile' ? '#f7882f' : '#f3f4f6',
            color: activeTab==='profile' ? '#fff' : '#222',
            cursor:'pointer',
            transition:'all 0.2s',
            outline:'none',
          }}
        >Profil</button>
        {isAdmin() && (
          <>
            <button
              onClick={()=>setActiveTab('menu')}
              style={{
                padding:'12px 32px',
                borderRadius:24,
                border:'none',
                fontWeight:600,
                fontSize:18,
                background: activeTab==='menu' ? '#f7882f' : '#f3f4f6',
                color: activeTab==='menu' ? '#fff' : '#222',
                cursor:'pointer',
                transition:'all 0.2s',
                outline:'none',
              }}
            >Ürün Yönetimi</button>
            <button
              onClick={()=>setActiveTab('users')}
              style={{
                padding:'12px 32px',
                borderRadius:24,
                border:'none',
                fontWeight:600,
                fontSize:18,
                background: activeTab==='users' ? '#f7882f' : '#f3f4f6',
                color: activeTab==='users' ? '#fff' : '#222',
                cursor:'pointer',
                transition:'all 0.2s',
                outline:'none',
              }}
            >Kullanıcılar</button>
          </>
        )}
      </div>
      {/* Tab Content */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave}>
          {/* عکس پروفایل */}
          <div style={{marginBottom:18, position:'relative'}}>
            <img src={avatar || "https://ui-avatars.com/api/?name="+encodeURIComponent(name)} alt="avatar" style={{width:90,height:90,borderRadius:16,objectFit:'cover',marginBottom:8}} />
            <label htmlFor="avatar-upload" style={{
              display:'inline-block',
              background:'#fff',
              color:'#f7882f',
              border:'1.5px solid #f7882f',
              borderRadius:8,
              padding:'6px 32px',
              fontWeight:700,
              fontSize:16,
              cursor:'pointer',
              marginTop:-8,
              transition:'background 0.2s, color 0.2s',
              position:'absolute',
              left:'50%',
              transform:'translateX(-50%)',
              top:110
            }}>Düzenle</label>
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarUpload} style={{display:'none'}} />
          </div>
          <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Ad Soyad</label>
          <input type="text" placeholder="Ad Soyad" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd'}} required />
          <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>E-posta</label>
          <input type="email" placeholder="E-posta" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd'}} required />
          <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Telefon Numarası</label>
          <input type="text" placeholder="Telefon Numarası" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',marginBottom:16,padding:10,borderRadius:8,border:'1px solid #ddd'}} />
          <button type="submit" style={{padding:'10px 32px',background:'#f7882f',color:'#fff',border:'none',borderRadius:8,fontWeight:700,fontSize:16,cursor:'pointer',width:'100%'}}>Kaydet</button>
        </form>
      )}
      {activeTab === 'menu' && isAdmin() && (
        <div style={{marginTop:32}}>
          <h3>Ürün Yönetimi</h3>
          <button
            style={{
              display:'flex',alignItems:'center',justifyContent:'center',
              width:'100%',maxWidth:420,margin:'32px auto 0 auto',
              background:'#fff',
              border:'1.5px solid #e0e0e0',
              borderRadius:16,
              fontSize:24,
              fontWeight:500,
              color:'#42516e',
              padding:'22px 0',
              boxShadow:'0 2px 12px #f6f7f9',
              cursor:'pointer',
              transition:'box-shadow 0.2s',
              outline:'none',
            }}
            onClick={()=>setShowNewMenuModal(true)}
          >
            <span style={{marginRight:16}}>Yeni Ürün Ekle</span>
            <span style={{fontSize:32,marginTop:2}}>&#8250;</span>
          </button>
          {/* Modal for new menu item */}
          {showNewMenuModal && (
            <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.13)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{background:'#fff',padding:36,borderRadius:18,minWidth:420,maxWidth:600,boxShadow:'0 4px 32px #bbb',position:'relative',display:'flex',gap:32}}>
                <button onClick={()=>setShowNewMenuModal(false)} style={{position:'absolute',top:12,right:16,fontSize:22,background:'none',border:'none',cursor:'pointer',color:'#888'}}>×</button>
                {/* Image upload */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
                  <div style={{width:200,height:200,background:'#e5e7eb',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',color:'#a0aec0',fontSize:22,marginBottom:8,overflow:'hidden'}}>
                    {newMenu.image ? <img src={newMenu.image} alt="item" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : 'Resim Yok'}
                  </div>
                  <label htmlFor="menu-image-upload" style={{border:'1.5px solid #f7882f',color:'#f7882f',borderRadius:10,padding:'8px 38px',fontWeight:600,fontSize:18,background:'#fff',cursor:'pointer',transition:'background 0.2s, color 0.2s',textAlign:'center'}}>Düzenle</label>
                  <input id="menu-image-upload" type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                    const file = e.target.files[0];
                    if(file){
                      const reader = new FileReader();
                      reader.onload = ev => setNewMenu(m=>({...m,image:ev.target.result}));
                      reader.readAsDataURL(file);
                    }
                  }} />
                </div>
                {/* Form */}
                <form style={{flex:1,display:'flex',flexDirection:'column',gap:18,justifyContent:'center'}} onSubmit={async e=>{
                  e.preventDefault();
                  try {
                    const res = await fetch('http://localhost:3002/urunler', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newMenu),
                    });
                    if (res.ok) {
                      setShowNewMenuModal(false);
                      setNewMenu({ image: '', name: '', price: '', category: '' });
                      // Success message (optional)
                      alert('Ürün başarıyla eklendi!');
                      // Redirect to category page
                      let cat = newMenu.category;
                      if (cat === 'Oyuncaklar') navigate('/store/oyuncaklar');
                      else if (cat === 'Sağlık ve Veteriner Ürünleri') navigate('/store/saglik');
                      else if (cat === 'Mama ve Besin Ürünleri') navigate('/store/mama');
                      else if (cat === 'Kafesler ve Barınaklar') navigate('/store/kafesler');
                    } else {
                      const data = await res.json();
                      alert(data.message || 'Bir hata oluştu!');
                    }
                  } catch (err) {
                    alert('Sunucuya bağlanılamadı!');
                  }
                }}>
                  <label style={{fontWeight:600,marginBottom:2}}>Ürün Adı</label>
                  <input type="text" value={newMenu.name} onChange={e=>setNewMenu(m=>({...m,name:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required />
                  <label style={{fontWeight:600,marginBottom:2}}>Taban Fiyat</label>
                  <input type="number" value={newMenu.price} onChange={e=>setNewMenu(m=>({...m,price:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required />
                  <label style={{fontWeight:600,marginBottom:2}}>Kategori</label>
                  <select value={newMenu.category} onChange={e=>setNewMenu(m=>({...m,category:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required>
                    <option value="">Bir kategori seçin</option>
                    <option value="Oyuncaklar">Oyuncaklar</option>
                    <option value="Sağlık ve Veteriner Ürünleri">Sağlık ve Veteriner Ürünleri</option>
                    <option value="Mama ve Besin Ürünleri">Mama ve Besin Ürünleri</option>
                    <option value="Kafesler ve Barınaklar">Kafesler ve Barınaklar</option>
                  </select>
                  <button type="submit" style={{marginTop:18,padding:'14px 0',background:'#f7882f',color:'#fff',border:'none',borderRadius:14,fontWeight:700,fontSize:20,cursor:'pointer',width:'100%'}}>Kaydet</button>
                </form>
              </div>
            </div>
          )}
          {/* Display existing menu items */}
          <div style={{ maxWidth: 420, margin: '32px auto' }}>
            <h4 style={{ textAlign: 'left', marginBottom: 16, color: '#f7882f' }}>Ürün Düzenle:</h4>
            {Array.isArray(urunler) && urunler.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f6f7f9', marginBottom: 12, padding: '12px 18px', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', background: '#fff' }} />}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 18 }}>{item.name}</div>
                    <div style={{ color: '#555', fontSize: 15 }}>{item.price} TL</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditingMenuItem(item);
                    setShowEditMenuModal(true);
                    setEditMenuForm({
                      image: item.image || '',
                      name: item.name || '',
                      price: item.price || '',
                      category: item.category || ''
                    });
                  }}
                  style={{ padding: '6px 18px', border: '1.5px solid #bbb', borderRadius: 8, background: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
            ))}
            {Array.isArray(urunler) && urunler.length === 0 && (
              <div style={{ textAlign: 'center', color: '#777', marginTop: 24 }}>Ürün bulunamadı.</div>
            )}
             {!Array.isArray(urunler) && (
              <div style={{color:'#f00',textAlign:'center',marginTop:24}}>Ürünler yüklenirken hata oluştu.</div>
            )}
          </div>
        </div>
      )}
      {/* Edit Menu Item Modal */}
      {showEditMenuModal && editingMenuItem && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.13)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:36,borderRadius:18,minWidth:420,maxWidth:600,boxShadow:'0 4px 32px #bbb',position:'relative',display:'flex',gap:32}}>
            <button onClick={()=>setShowEditMenuModal(false)} style={{position:'absolute',top:12,right:16,fontSize:22,background:'none',border:'none',cursor:'pointer',color:'#888'}}>×</button>
            {/* Image upload */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
              <div style={{width:200,height:200,background:'#e5e7eb',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',color:'#a0aec0',fontSize:22,marginBottom:8,overflow:'hidden'}}>
                {editMenuForm.image ? <img src={editMenuForm.image} alt="item" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : 'Resim Yok'}
              </div>
              <label htmlFor="edit-menu-image-upload" style={{border:'1.5px solid #f7882f',color:'#f7882f',borderRadius:10,padding:'8px 38px',fontWeight:600,fontSize:18,background:'#fff',cursor:'pointer',transition:'background 0.2s, color 0.2s',textAlign:'center'}}>Düzenle</label>
              <input id="edit-menu-image-upload" type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                const file = e.target.files[0];
                if(file){
                  const reader = new FileReader();
                  reader.onload = ev => setEditMenuForm(m=>({...m,image:ev.target.result}));
                  reader.readAsDataURL(file);
                }
              }} />
            </div>
            {/* Form */}
            <form style={{flex:1,display:'flex',flexDirection:'column',gap:18,justifyContent:'center'}} onSubmit={async e => {
              e.preventDefault();
              try {
                const res = await fetch(`http://localhost:3002/urunler/${editingMenuItem.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editMenuForm),
                });
                if (res.ok) {
                  alert('Ürün başarıyla güncellendi!');
                  setShowEditMenuModal(false);
                  setEditingMenuItem(null);
                  // Refresh the menu items list after update
                  fetch('http://localhost:3002/urunler')
                    .then(res => res.json())
                    .then(data => setUrunler(data))
                    .catch(err => console.error('Error fetching menu items after update:', err));
                } else {
                  const data = await res.json();
                  alert(data.message || 'Bir hata oluştu!');
                }
              } catch (err) {
                alert('Sunucuya bağlanılamadı!');
              }
            }}>
              <h3 style={{marginBottom:8, color: '#f7882f'}}>Ürün Düzenle</h3>
              <label style={{fontWeight:600,marginBottom:2}}>Ürün Adı</label>
              <input type="text" value={editMenuForm.name} onChange={e=>setEditMenuForm(m=>({...m,name:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required />
              <label style={{fontWeight:600,marginBottom:2}}>Taban Fiyat</label>
              <input type="number" value={editMenuForm.price} onChange={e=>setEditMenuForm(m=>({...m,price:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required />
              <label style={{fontWeight:600,marginBottom:2}}>Kategori</label>
              <select value={editMenuForm.category} onChange={e=>setEditMenuForm(m=>({...m,category:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required>
                <option value="">Bir kategori seçin</option>
                <option value="Oyuncaklar">Oyuncaklar</option>
                <option value="Sağlık ve Veteriner Ürünleri">Sağlık ve Veteriner Ürünleri</option>
                <option value="Mama ve Besin Ürünleri">Mama ve Besin Ürünleri</option>
                <option value="Kafesler ve Barınaklar">Kafesler ve Barınaklar</option>
              </select>
              <button type="submit" style={{marginTop:18,padding:'14px 0',background:'#f7882f',color:'#fff',border:'none',borderRadius:14,fontWeight:700,fontSize:20,cursor:'pointer',width:'100%'}}>Değişiklikleri Kaydet</button>
              <button
                type="button"
                onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this item?')) {
                    try {
                      const res = await fetch(`http://localhost:3002/urunler/${editingMenuItem.id}`, {
                        method: 'DELETE',
                      });
                      if (res.ok) {
                        alert('Ürün başarıyla silindi!');
                        setShowEditMenuModal(false);
                        setEditingMenuItem(null);
                        // Refresh the menu items list after deletion
                        fetch('http://localhost:3002/urunler')
                          .then(res => res.json())
                          .then(data => setUrunler(data))
                          .catch(err => console.error('Error fetching menu items after deletion:', err));
                      } else {
                        const data = await res.json();
                        alert(data.message || 'Bir hata oluştu!');
                      }
                    } catch (err) {
                      alert('Sunucuya bağlanılamadı!');
                    }
                  }
                }}
                style={{marginTop:12,padding:'10px 0',background:'#e53e3e',color:'#fff',border:'none',borderRadius:14,fontWeight:700,fontSize:18,cursor:'pointer',width:'100%'}}
              >
                Ürünü Sil
              </button>
            </form>
          </div>
        </div>
      )}
      {activeTab === 'users' && isAdmin() && (
        <div style={{marginTop:32}}>
          <h3>Kullanıcılar</h3>
          <div style={{maxWidth:700,margin:'32px auto'}}>
            {Array.isArray(users) ? (
              users.map(u => (
                <div key={u.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f6f7f9',marginBottom:16,padding:18,borderRadius:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:24}}>
                    <img src={u.avatar || 'https://ui-avatars.com/api/?name='+encodeURIComponent(u.name)} alt="avatar" style={{width:48,height:48,borderRadius:12,objectFit:'cover',background:'#fff'}} />
                    <div>
                      <div style={{fontWeight:600,fontSize:20}}>{u.name} {u.role === 'ADMIN' && <span style={{fontSize:14, fontWeight:400, color:'#f97316'}}>(Yönetici)</span>}</div>
                      <div style={{color:'#444',fontSize:17}}>{u.email}</div>
                    </div>
                  </div>
                  <button onClick={()=>handleEditUser(u)} style={{padding:'8px 22px',border:'1.5px solid #bbb',borderRadius:8,background:'#fff',fontWeight:600,fontSize:16,cursor:'pointer'}}>Düzenle</button>
                </div>
              ))
            ) : (
              <div style={{color:'#f00',textAlign:'center'}}>Kullanıcılar yüklenirken bir sorun oluştu.</div>
            )}
          </div>
          {/* Edit Modal */}
          {editingUser && (
            <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{background:'#fff',padding:32,borderRadius:16,maxWidth:500,width:'100%',margin:24}}>
                <h3 style={{marginBottom:24}}>Kullanıcı Düzenle</h3>
                <form onSubmit={handleEditSave}>
                  <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Adı Soyadı</label>
                  <input type="text" name="name" placeholder="Adı Soyadı" value={editForm.name} onChange={handleEditFormChange} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd'}} required />
                  <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>E-posta</label>
                  <input type="email" name="email" value={editForm.email} disabled style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd',background:'#e5e7eb'}} />
                  <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Telefon</label>
                  <input type="text" name="phone" placeholder="Telefon" value={editForm.phone} onChange={handleEditFormChange} style={{width:'100%',marginBottom:16,padding:10,borderRadius:8,border:'1px solid #ddd'}} />
                  <div style={{display:'flex',alignItems:'center',margin:'16px 0'}}>
                    <select name="role" value={editForm.role} onChange={handleEditFormChange} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #ddd'}}>
                      <option value="USER">Kullanıcı</option>
                      <option value="ADMIN">Yönetici</option>
                    </select>
                  </div>
                  <button type="submit" style={{padding:'10px 32px',background:'#f7882f',color:'#fff',border:'none',borderRadius:8,fontWeight:700,fontSize:16,cursor:'pointer',width:'100%'}}>Kaydet</button>
                </form>
                <button
                  type="button"
                  onClick={() => handleDeleteUser(editingUser.id)}
                  style={{marginTop:12,padding:'10px 32px',background:'#e53e3e',color:'#fff',border:'none',borderRadius:8,fontWeight:700,fontSize:16,cursor:'pointer',width:'100%'}}
                >
                  Kullanıcıyı Sil
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 