import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, updateUser, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Tüm hook'lar (useState, useEffect, vs.) her zaman component fonksiyonunun en başında olmalı.
  // React'ın kuralı: Hook'lar koşullu (if, return, vs.) blokların içinde çağrılmaz!
  // Böylece her render'da hook sırası değişmez ve hata alınmaz.

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
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
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' veya 'error'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  // Kullanıcı yoksa, giriş yapmadınız mesajı göster (hook'lardan sonra!)
  // Bu sayede hook kuralları bozulmaz.
  if (!user) return <div style={{textAlign:'center',marginTop:40}}>Giriş yapmadınız.</div>;

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000); // Hide message after 3 seconds
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phone, avatar }),
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data.user);
        showMessage('Profil başarıyla güncellendi!', 'success');
      } else {
        showMessage(data.message || 'Bir hata oluştu!', 'error');
      }
    } catch (err) {
      showMessage('Sunucuya bağlanılamadı!', 'error');
    }
  };

  // Resim yükleme fonksiyonu
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

  // Kullanıcılar sekmesi aktif olduğunda kullanıcıları getir
  useEffect(() => {
    if (isAdmin()) {
      fetch(`/api/users`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Kullanıcılar getirilirken hata:', err));
    }
  }, [isAdmin]);

  // Menü öğeleri sekmesi aktif olduğunda menü öğelerini getir
  useEffect(() => {
    if (isAdmin()) {
      fetch(`/api/urunler`)
        .then(res => res.json())
        .then(data => setUrunler(data))
        .catch(err => console.error('Menü öğeleri getirilirken hata:', err));
    }
  }, [isAdmin]);

  // Siparişleri getir
  useEffect(() => {
    if (isAdmin()) {
      fetch(`/api/orders`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error('Siparişler getirilirken hata:', err));
    }
  }, [isAdmin]);

  // Sipariş durumunu güncelle
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage('Sipariş durumu başarıyla güncellendi!', 'success');
        // Sipariş listesini güncelleyelim
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        showMessage(data.message || 'Sipariş durumu güncellenemedi!', 'error');
      }
    } catch (err) {
      console.error('Sipariş durumu güncellenirken hata:', err);
      showMessage('Sunucuya bağlanılamadı!', 'error');
    }
  };

  // Düzenle düğmesi
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

  // Düzenleme formu değişikliği
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Düzenleme sırasında avatar yükleme
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

  // Düzenlemeyi kaydet
  const handleEditSave = async (e) => {
    e.preventDefault();

    // Göndermeden önce telefon ve avatar değerlerini temizle
    const cleanedPhone = editForm.phone ? String(editForm.phone).replace(/[\\"]/g, '') : '';
    const cleanedAvatar = editForm.avatar ? String(editForm.avatar).replace(/[\\"]/g, '') : '';

    const dataToSend = {
      ...editForm,
      phone: cleanedPhone,
      avatar: cleanedAvatar,
    };

    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage('Kullanıcı başarıyla güncellendi!', 'success');
        setEditingUser(null);
        // Güncellemeden sonra kullanıcı listesini yenile
        fetch(`/api/users`)
          .then(res => res.json())
          .then(data => setUsers(data))
          .catch(err => console.error('Güncelleme sonrası kullanıcılar getirilirken hata:', err));
      } else {
        showMessage(data.message || 'Kullanıcı güncellenemedi!', 'error');
      }
    } catch (err) {
      console.error('Kullanıcı güncellenirken hata:', err);
      showMessage('Sunucuya bağlanılamadı!', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    setConfirmMessage('Bu kullanıcıyı silmek istediğinizden emin misiniz?');
    setConfirmAction(() => async () => {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          showMessage('Kullanıcı başarıyla silindi!', 'success');
          // Başarılı silme sonrası kullanıcı listesini yenile
          fetch(`/api/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Silme sonrası kullanıcılar getirilirken hata:', err));
          // Modalı kapat
          setEditingUser(null);
        } else {
          showMessage(data.message || 'Kullanıcı silinemedi!', 'error');
        }
      } catch (err) {
        console.error('Kullanıcı silinirken hata:', err);
        showMessage('Sunucuya bağlanılamadı!', 'error');
      }
      setShowConfirmModal(false); // Close modal after action
    });
    setShowConfirmModal(true);
  };

  return (
    <div style={{maxWidth:600,margin:"40px auto",padding:24,borderRadius:12,boxShadow:"0 2px 12px #eee",background:"#fff",textAlign:'center'}}>
      {message && (
        <div
          style={{
            padding: '12px 20px',
            marginBottom: '20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: messageType === 'success' ? '#155724' : '#721c24',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            borderColor: messageType === 'success' ? '#c3e6cb' : '#f5c6cb',
            border: '1px solid',
            textAlign: 'center',
          }}
        >
          {message}
        </div>
      )}
      {/* Yönetici Sekmeleri */}
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
            >Ürünler</button>
            <button
              onClick={()=>setActiveTab('orders')}
              style={{
                padding:'12px 32px',
                borderRadius:24,
                border:'none',
                fontWeight:600,
                fontSize:18,
                background: activeTab==='orders' ? '#f7882f' : '#f3f4f6',
                color: activeTab==='orders' ? '#fff' : '#222',
                cursor:'pointer',
                transition:'all 0.2s',
                outline:'none',
              }}
            >Tüm Siparişler</button>
          </>
        )}
      </div>
      {/* Sekme İçeriği */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave}>
          {/* Profil fotoğrafı */}
          <div style={{marginBottom:18, position:'relative'}}>
            <img src={avatar || "https://ui-avatars.com/api/?name="+encodeURIComponent(name)} alt="avatar" style={{width:90,height:90,borderRadius:16,objectFit:'cover',marginBottom:8}} />
            <label htmlFor="avatar-upload" style={{
              display:'block',
              background:'#fff',
              color:'#f7882f',
              border:'1.5px solid #f7882f',
              borderRadius:8,
              padding:'6px 32px',
              fontWeight:700,
              fontSize:16,
              cursor:'pointer',
              marginTop:10,
              boxShadow:'0 2px 8px rgba(0,0,0,0.06)'
            }}>Resmi Değiştir</label>
            <input id="avatar-upload" type="file" accept="image/*" style={{display:'none'}} onChange={handleAvatarUpload} />
          </div>
          <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>Ad Soyad</label>
          <input type="text" placeholder="Adınız Soyadınız" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd'}} />
          <label style={{display:'block',textAlign:'left',marginBottom:4,fontWeight:600,color:'#f7882f'}}>E-posta</label>
          <input type="email" value={email} disabled style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ddd',background:'#e5e7eb'}} />
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
          {/* Yeni menü öğesi için modal */}
          {showNewMenuModal && (
            <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.13)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{background:'#fff',padding:36,borderRadius:18,minWidth:420,maxWidth:600,boxShadow:'0 4px 32px #bbb',position:'relative',display:'flex',gap:32}}>
                <button onClick={()=>setShowNewMenuModal(false)} style={{position:'absolute',top:12,right:16,fontSize:22,background:'none',border:'none',cursor:'pointer',color:'#888'}}>×</button>
                {/* Resim yükleme */}
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
                    const res = await fetch(`/api/urunler`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newMenu),
                    });
                    if (res.ok) {
                      setShowNewMenuModal(false);
                      setNewMenu({ image: '', name: '', price: '', category: '' });
                      // Başarı mesajı (isteğe bağlı)
                      showMessage('Ürün başarıyla eklendi!', 'success');
                      // Kategori sayfasına yönlendir
                      let cat = newMenu.category;
                      if (cat === 'Oyuncaklar') navigate('/store/oyuncaklar');
                      else if (cat === 'Sağlık ve Veteriner Ürünleri') navigate('/store/saglik');
                      else if (cat === 'Mama ve Besin Ürünleri') navigate('/store/mama');
                      else if (cat === 'Kafesler ve Barınaklar') navigate('/store/kafesler');
                    } else {
                      const data = await res.json();
                      showMessage(data.message || 'Bir hata oluştu!', 'error');
                    }
                  } catch (err) {
                    showMessage('Sunucuya bağlanılamadı!', 'error');
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
          {/* Mevcut menü öğelerini göster */}
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
                      category: item.category || '',
                    });
                  }}
                  style={{ padding: '6px 18px', border: '1.5px solid #bbb', borderRadius: 8, background: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
                >
                  Düzenle
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
      {/* Menü Öğesi Düzenle Modalı */}
      {showEditMenuModal && editingMenuItem && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.13)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:36,borderRadius:18,minWidth:420,maxWidth:600,boxShadow:'0 4px 32px #bbb',position:'relative',display:'flex',gap:32}}>
            <button onClick={()=>setShowEditMenuModal(false)} style={{position:'absolute',top:12,right:16,fontSize:22,background:'none',border:'none',cursor:'pointer',color:'#888'}}>×</button>
            {/* Resim yükleme */}
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
                const res = await fetch(`/api/urunler/${editingMenuItem.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editMenuForm),
                });
                if (res.ok) {
                  showMessage('Ürün başarıyla güncellendi!', 'success');
                  setShowEditMenuModal(false);
                  setEditingMenuItem(null);
                  // Güncellemeden sonra menü öğeleri listesini yenile
                  fetch(`/api/urunler`)
                    .then(res => res.json())
                    .then(data => setUrunler(data))
                    .catch(err => console.error('Güncelleme sonrası menü öğeleri getirilirken hata:', err));
                } else {
                  const data = await res.json();
                  showMessage(data.message || 'Bir hata oluştu!', 'error');
                }
              } catch (err) {
                showMessage('Sunucuya bağlanılamadı!', 'error');
              }
            }}>
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
              <button type="submit" style={{marginTop:18,padding:'14px 0',background:'#f7882f',color:'#fff',border:'none',borderRadius:14,fontWeight:700,fontSize:20,cursor:'pointer',width:'100%'}}>Kaydet</button>
              <button
                type="button"
                onClick={async () => {
                  setConfirmMessage('Bu öğeyi silmek istediğinizden emin misiniz?');
                  setConfirmAction(() => async () => {
                    try {
                      const res = await fetch(`/api/urunler/${editingMenuItem.id}`, {
                        method: 'DELETE',
                      });
                      if (res.ok) {
                        showMessage('Ürün başarıyla silindi!', 'success');
                        setShowEditMenuModal(false);
                        setEditingMenuItem(null);
                        // Silme sonrası menü öğeleri listesini yenile
                        fetch(`/api/urunler`)
                          .then(res => res.json())
                          .then(data => setUrunler(data))
                          .catch(err => console.error('Silme sonrası menü öğeleri getirilirken hata:', err));
                      } else {
                        const data = await res.json();
                        showMessage(data.message || 'Bir hata oluştu!', 'error');
                      }
                    } catch (err) {
                      showMessage('Sunucuya bağlanılamadı!', 'error');
                    }
                    setShowConfirmModal(false); // Close modal after action
                  });
                  setShowConfirmModal(true);
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
          {/* Düzenleme Modalı */}
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
      {isAdmin() && activeTab === 'orders' && (
        <div style={{marginTop: 24}}>
          <h2 style={{marginBottom: 24, color: '#333', fontSize: '24px', fontWeight: 'bold'}}>Tüm Siparişler</h2>
          <div style={{
            display: 'grid',
            gap: 16,
            maxHeight: '600px',
            overflowY: 'auto',
            padding: '0 16px'
          }}>
            {orders.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                background: '#f8f9fa',
                borderRadius: '12px',
                color: '#666'
              }}>
                Henüz sipariş bulunmamaktadır.
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} style={{
                  background: '#f8f9fa',
                  borderRadius: 12,
                  padding: 20,
                  textAlign: 'left',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                    <h3 style={{margin: 0, color: '#333', fontSize: '18px'}}>Sipariş No: #{order.id}</h3>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: 20,
                      background: order.status === 'COMPLETED' ? '#4CAF50' : order.status === 'PENDING' ? '#FFA726' : '#607D8B',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}>
                      {order.status === 'COMPLETED' ? 'Tamamlandı' : order.status === 'PENDING' ? 'Beklemede' : 'İşlemde'}
                    </span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    marginBottom: '16px',
                    padding: '12px',
                    background: '#fff',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <strong style={{color: '#666'}}>Müşteri Adı:</strong>
                      <div>{order.user?.name || 'Belirtilmemiş'}</div>
                    </div>
                    <div>
                      <strong style={{color: '#666'}}>E-posta:</strong>
                      <div>{order.user?.email || 'Belirtilmemiş'}</div>
                    </div>
                    <div>
                      <strong style={{color: '#666'}}>Telefon:</strong>
                      <div>{order.user?.phone || 'Belirtilmemiş'}</div>
                    </div>
                    <div>
                      <strong style={{color: '#666'}}>Sipariş Tarihi:</strong>
                      <div>{new Date(order.createdAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</div>
                    </div>
                  </div>
                  <div style={{marginTop: 16}}>
                    <strong style={{color: '#333', fontSize: '16px'}}>Sipariş Detayları:</strong>
                    <div style={{
                      marginTop: 8,
                      padding: 16,
                      background: '#fff',
                      borderRadius: 8,
                      border: '1px solid #eee'
                    }}>
                      {order.items?.map((item, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '12px 0',
                          borderBottom: index !== order.items.length - 1 ? '1px solid #eee' : 'none',
                          fontSize: '14px'
                        }}>
                          <span style={{flex: 2}}>{item.name}</span>
                          <span style={{flex: 1, textAlign: 'center'}}>{item.quantity} adet</span>
                          <span style={{flex: 1, textAlign: 'right'}}>{typeof item.price === 'number' ? item.price.toLocaleString('tr-TR') : '0'} ₺</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    marginTop: 16,
                    padding: 16,
                    background: '#fff',
                    borderRadius: 8,
                    textAlign: 'right',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#f7882f',
                    border: '1px solid #eee'
                  }}>
                    Toplam Tutar: {typeof order.totalAmount === 'number' ? order.totalAmount.toLocaleString('tr-TR') : '0'} ₺
                  </div>
                  <div style={{
                    marginTop: 16,
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, 'COMPLETED')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#4CAF50',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Tamamlandı Olarak İşaretle
                    </button>
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, 'PROCESSING')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#FFA726',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      İşleme Al
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',zIndex:1001,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:30,borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.2)',maxWidth:400,textAlign:'center'}}>
            <p style={{fontSize:18,marginBottom:25}}>{confirmMessage}</p>
            <div style={{display:'flex',justifyContent:'center',gap:15}}>
              <button
                onClick={() => {
                  if (confirmAction) confirmAction();
                }}
                style={{padding:'10px 25px',background:'#e53e3e',color:'#fff',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}
              >
                Evet
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{padding:'10px 25px',background:'#ccc',color:'#333',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer'}}
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 