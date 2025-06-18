import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

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
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Ürün listesi
router.get('/api/urunler', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Kullanıcı listesi
router.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Sipariş listesi
router.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { user: true, items: true } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Sipariş oluştur
router.post('/api/submit-order', async (req, res) => {
  const { userId, items } = req.body;
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Sipariş bilgileri eksik.' });
  }
  try {
    const order = await prisma.order.create({
      data: {
        userId,
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
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

export default router; 