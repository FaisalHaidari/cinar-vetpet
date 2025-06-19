import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import prisma from '../config/database.js';

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Test endpoint
router.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Kayıt
router.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Bu e-posta zaten kayıtlı.' });
    }
    const user = await prisma.user.create({ data: { name, email, password } });
    res.status(201).json({ user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Giriş
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'E-posta ve şifre zorunludur.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'E-posta veya şifre yanlış.' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Ürün listesi
router.get('/api/urunler', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Ürün ekle
router.post('/api/urunler', async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Ürün adı, fiyat ve kategori zorunludur.' });
  }
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        stock: stock ? parseInt(stock) : 0,
      }
    });
    res.status(201).json(product);
  } catch (err) {
    console.error('Ürün ekleme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Ürün silme endpointi - admin panelinden ürün silmek için
router.delete('/api/urunler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Önce ilgili OrderItem'ları sil
    await prisma.orderItem.deleteMany({ where: { productId: parseInt(id) } });
    // Sonra ürünü sil
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Ürün silindi.' });
  } catch (err) {
    console.error('Ürün silme hatası:', err);
    res.status(500).json({ message: 'Ürün silinemedi.', error: err.message });
  }
});

// Kullanıcı listesi (detaylı)
router.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        addresses: true,
        orders: true
      }
    });
    res.json(users);
  } catch (err) {
    console.error('Users error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Geliştirilmiş tum siparisler (tüm detaylarla)
router.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        address: true,
        items: { include: { product: true } }
      }
    });
    res.json(orders);
  } catch (err) {
    console.error('Orders error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// ===== CART ENDPOINTS =====

// Get user's cart items
router.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: parseInt(userId) },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Add item to cart
router.post('/api/cart/add', async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ message: 'Kullanıcı ID ve ürün ID gerekli.' });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: parseInt(userId),
          productId: parseInt(productId)
        }
      }
    });

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true }
      });
      res.json(updatedItem);
    } else {
      // Add new item
      const newItem = await prisma.cartItem.create({
        data: {
          userId: parseInt(userId),
          productId: parseInt(productId),
          quantity: quantity
        },
        include: { product: true }
      });
      res.status(201).json(newItem);
    }
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Update cart item quantity
router.put('/api/cart/update', async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    
    if (!cartItemId || quantity === undefined) {
      return res.status(400).json({ message: 'Cart item ID ve miktar gerekli.' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await prisma.cartItem.delete({ where: { id: parseInt(cartItemId) } });
      res.json({ message: 'Ürün sepetten kaldırıldı.' });
    } else {
      const updatedItem = await prisma.cartItem.update({
        where: { id: parseInt(cartItemId) },
        data: { quantity: parseInt(quantity) },
        include: { product: true }
      });
      res.json(updatedItem);
    }
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Remove item from cart
router.delete('/api/cart/remove/:cartItemId', async (req, res) => {
  try {
    const { cartItemId } = req.params;
    await prisma.cartItem.delete({ where: { id: parseInt(cartItemId) } });
    res.json({ message: 'Ürün sepetten kaldırıldı.' });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Clear user's cart
router.delete('/api/cart/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await prisma.cartItem.deleteMany({ where: { userId: parseInt(userId) } });
    res.json({ message: 'Sepet temizlendi.' });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// ===== PAYMENT ENDPOINTS =====

// Process payment and create order
router.post('/api/payment/process', async (req, res) => {
  try {
    const { userId, addressId, paymentMethod, items } = req.body;
    
    if (!userId || !addressId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Sipariş bilgileri eksik.' });
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        addressId: parseInt(addressId),
        totalAmount: totalAmount,
        status: 'PENDING',
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { 
        items: { include: { product: true } },
        user: true,
        address: true
      }
    });

    // Clear user's cart after successful order
    await prisma.cartItem.deleteMany({ where: { userId: parseInt(userId) } });

    res.status(201).json({ 
      message: 'Sipariş başarıyla oluşturuldu.',
      order: order,
      paymentStatus: 'success'
    });
  } catch (err) {
    console.error('Payment process error:', err);
    res.status(500).json({ message: 'Ödeme işlemi başarısız.', error: err.message });
  }
});

// Get order by ID
router.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: { 
        items: { include: { product: true } },
        user: true,
        address: true
      }
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı.' });
    }
    
    res.json(order);
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Update order status
router.put('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Geçersiz sipariş durumu.' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: status },
      include: { 
        items: { include: { product: true } },
        user: true,
        address: true
      }
    });
    
    res.json(updatedOrder);
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// ===== ADDRESS ENDPOINTS =====

// Get user addresses
router.get('/api/addresses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await prisma.address.findMany({
      where: { userId: parseInt(userId) }
    });
    res.json(addresses);
  } catch (err) {
    console.error('Get addresses error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Add new address
router.post('/api/addresses', async (req, res) => {
  try {
    const { userId, street, buildingNo, floor, apartmentNo, city, state, postalCode, zipCode, country, phoneNumber, isDefault = false } = req.body;
    
    if (!userId || !street || !city) {
      return res.status(400).json({ message: 'Temel adres bilgileri gerekli.' });
    }

    // If this is default address, unset other default addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: parseInt(userId), isDefault: true },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: parseInt(userId),
        street,
        buildingNo,
        floor,
        apartmentNo,
        city,
        state,
        postalCode,
        zipCode,
        country,
        phoneNumber,
        isDefault
      }
    });
    
    res.status(201).json(address);
  } catch (err) {
    console.error('Add address error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Update address
router.put('/api/addresses/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const { street, buildingNo, floor, apartmentNo, city, state, postalCode, zipCode, country, phoneNumber, isDefault } = req.body;
    
    const address = await prisma.address.update({
      where: { id: parseInt(addressId) },
      data: {
        street,
        buildingNo,
        floor,
        apartmentNo,
        city,
        state,
        postalCode,
        zipCode,
        country,
        phoneNumber,
        isDefault
      }
    });
    
    res.json(address);
  } catch (err) {
    console.error('Update address error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Delete address
router.delete('/api/addresses/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    await prisma.address.delete({ where: { id: parseInt(addressId) } });
    res.json({ message: 'Adres silindi.' });
  } catch (err) {
    console.error('Delete address error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Fixed submit-order endpoint (for backward compatibility)
router.post('/api/submit-order', async (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Sipariş bilgileri eksik.' });
  }
  try {
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        addressId: 1, // Default address ID
        totalAmount: totalAmount,
        status: 'PENDING',
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true }
    });
    res.status(201).json({ order });
  } catch (err) {
    console.error('Submit order error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Profil endpointi
router.get('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        addresses: true,
        orders: {
          include: {
            items: { include: { product: true } },
            address: true
          }
        }
      }
    });
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Profil güncelleme endpointi
router.put('/api/profile', async (req, res) => {
  try {
    const { email, name, phone, avatar } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'E-posta zorunludur.' });
    }
    const user = await prisma.user.update({
      where: { email },
      data: {
        name,
        phone,
        avatar
      }
    });
    res.json({ user });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Profil güncellenemedi.', error: err.message });
  }
});

// Kullanıcı güncelle (admin için)
router.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, avatar, role } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, phone, avatar, role }
    });
    res.json({ user });
  } catch (err) {
    console.error('User update error:', err);
    res.status(500).json({ message: 'Kullanıcı güncellenemedi.', error: err.message });
  }
});

// Kullanıcı sil (admin için)
router.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Kullanıcı silindi.' });
  } catch (err) {
    console.error('User delete error:', err);
    res.status(500).json({ message: 'Kullanıcı silinemedi.', error: err.message });
  }
});

// Use router
app.use(router);

export default router; 