import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // فیلدهای جدید برای ویرایش
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [activeTab, setActiveTab] = useState('profile');
  const isAdmin = user?.email === 'faisal@gmail.com';
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', avatar: '', isAdmin: false });
  const [showNewMenuModal, setShowNewMenuModal] = useState(false);
  const [urunler, setUrunler] = useState([]);
  const [newMenu, setNewMenu] = useState({ image: '', name: '', price: '', category: '' });

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
    if (activeTab === 'users' && isAdmin) {
      fetch('http://localhost:3002/users')
        .then(res => res.json())
        .then(data => setUsers(data));
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
      isAdmin: !!user.isAdmin
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
    // You can implement PUT /users/:id here if you want to save changes to backend
    alert('User updated (demo, not saved to backend): ' + JSON.stringify(editForm, null, 2));
    setEditingUser(null);
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
        >Profile</button>
        {isAdmin && (
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
            >Menu Items</button>
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
            >Users</button>
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
            }}>Edit</label>
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
      {activeTab === 'menu' && isAdmin && (
        <div style={{marginTop:32}}>
          <h3>Menu Items</h3>
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
            <span style={{marginRight:16}}>Create new menu item</span>
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
                    {newMenu.image ? <img src={newMenu.image} alt="item" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : 'No image'}
                  </div>
                  <label htmlFor="menu-image-upload" style={{border:'1.5px solid #f7882f',color:'#f7882f',borderRadius:10,padding:'8px 38px',fontWeight:600,fontSize:18,background:'#fff',cursor:'pointer',transition:'background 0.2s, color 0.2s',textAlign:'center'}}>Edit</label>
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
                  <label style={{fontWeight:600,marginBottom:2}}>Item name</label>
                  <input type="text" value={newMenu.name} onChange={e=>setNewMenu(m=>({...m,name:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required />
                  <label style={{fontWeight:600,marginBottom:2}}>Base price</label>
                  <input type="number" value={newMenu.price} onChange={e=>setNewMenu(m=>({...m,price:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required />
                  <label style={{fontWeight:600,marginBottom:2}}>Kategori</label>
                  <select value={newMenu.category} onChange={e=>setNewMenu(m=>({...m,category:e.target.value}))} style={{padding:12,borderRadius:12,border:'1.5px solid #e0e0e0',background:'#f6f7f9',fontSize:18,marginBottom:2}} required>
                    <option value="">Bir kategori seçin</option>
                    <option value="Oyuncaklar">Oyuncaklar</option>
                    <option value="Sağlık ve Veteriner Ürünleri">Sağlık ve Veteriner Ürünleri</option>
                    <option value="Mama ve Besin Ürünleri">Mama ve Besin Ürünleri</option>
                    <option value="Kafesler ve Barınaklar">Kafesler ve Barınaklar</option>
                  </select>
                  <button type="submit" style={{marginTop:18,padding:'14px 0',background:'#f7882f',color:'#fff',border:'none',borderRadius:14,fontWeight:700,fontSize:20,cursor:'pointer',width:'100%'}}>Save</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 'users' && isAdmin && (
        <div style={{marginTop:32}}>
          <h3>Users</h3>
          <div style={{maxWidth:700,margin:'32px auto'}}>
            {Array.isArray(users) ? (
              users.map(u => (
                <div key={u.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f6f7f9',marginBottom:16,padding:18,borderRadius:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:24}}>
                    <img src={u.avatar || 'https://ui-avatars.com/api/?name='+encodeURIComponent(u.name)} alt="avatar" style={{width:48,height:48,borderRadius:12,objectFit:'cover',background:'#fff'}} />
                    <div>
                      <div style={{fontWeight:600,fontSize:20}}>{u.name}</div>
                      <div style={{color:'#444',fontSize:17}}>{u.email}</div>
                    </div>
                  </div>
                  <button onClick={()=>handleEditUser(u)} style={{padding:'8px 22px',border:'1.5px solid #bbb',borderRadius:8,background:'#fff',fontWeight:600,fontSize:16,cursor:'pointer'}}>Edit</button>
                </div>
              ))
            ) : (
              <div style={{color:'#f00',textAlign:'center'}}>مشکلی در دریافت کاربران وجود دارد.</div>
            )}
          </div>
          {/* Edit Modal */}
          {editingUser && (
            <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.18)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{background:'#fff',padding:36,borderRadius:18,minWidth:340,maxWidth:400,boxShadow:'0 4px 32px #bbb',position:'relative'}}>
                <button onClick={()=>setEditingUser(null)} style={{position:'absolute',top:12,right:16,fontSize:22,background:'none',border:'none',cursor:'pointer',color:'#888'}}>×</button>
                <h2 style={{color:'#f7882f',marginBottom:18}}>Profile</h2>
                <form onSubmit={handleEditSave}>
                  <div style={{marginBottom:18, position:'relative',textAlign:'center'}}>
                    <img src={editForm.avatar || 'https://ui-avatars.com/api/?name='+encodeURIComponent(editForm.name)} alt="avatar" style={{width:90,height:90,borderRadius:16,objectFit:'cover',marginBottom:8}} />
                    <label htmlFor="edit-avatar-upload" style={{
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
                    }}>Edit</label>
                    <input id="edit-avatar-upload" type="file" accept="image/*" onChange={handleEditAvatarUpload} style={{display:'none'}} />
                  </div>
                  <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>First and last name</label>
                  <input type="text" name="name" placeholder="Name" value={editForm.name} onChange={handleEditFormChange} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd'}} required />
                  <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Email</label>
                  <input type="email" name="email" value={editForm.email} disabled style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd',background:'#e5e7eb'}} />
                  <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Phone</label>
                  <input type="text" name="phone" placeholder="Phone" value={editForm.phone} onChange={handleEditFormChange} style={{width:'100%',marginBottom:16,padding:10,borderRadius:8,border:'1px solid #ddd'}} />
                  <div style={{display:'flex',alignItems:'center',margin:'16px 0'}}>
                    <input type="checkbox" name="isAdmin" checked={editForm.isAdmin} onChange={handleEditFormChange} id="isAdminCheck" style={{width:22,height:22,accentColor:'#f7882f',marginRight:8}} />
                    <label htmlFor="isAdminCheck" style={{fontWeight:700,color:'#f7882f',fontSize:18}}>Admin</label>
                  </div>
                  <button type="submit" style={{padding:'10px 32px',background:'#f7882f',color:'#fff',border:'none',borderRadius:8,fontWeight:700,fontSize:16,cursor:'pointer',width:'100%'}}>Save</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 