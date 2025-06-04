import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ثبت‌نام
app.post('/register', async (req, res) => {
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
    res.status(201).json({ message: 'Kayıt başarılı!', user: { id: user.id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// ورود
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'E-posta ve şifre zorunludur.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Lütfen önce kayıt olun.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Şifre yanlış.' });
    }
    res.json({ message: 'Giriş başarılı!', user: { id: user.id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// ویرایش پروفایل کاربر
app.put('/profile', async (req, res) => {
  const { email, name, phone, avatar } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'E-posta zorunludur.' });
  }
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { name, phone, avatar },
    });
    res.json({ message: 'Profil güncellendi!', user });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// گرفتن همه کاربران
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, avatar: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت کاربران', error: err.message });
  }
});

// --- Menu Items (Urunler) API ---
// Get all menu items (with optional category filter)
app.get('/urunler', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : undefined;
    const urunler = await prisma.urun.findMany({ where });
    res.json(urunler);
  } catch (err) {
    res.status(500).json({ message: 'Ürünler alınamadı', error: err.message });
  }
});
// Create new menu item
app.post('/urunler', async (req, res) => {
  const { name, price, category, image } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
  }
  try {
    const urun = await prisma.urun.create({ data: { name, price: parseFloat(price), category, image } });
    res.status(201).json({ message: 'Ürün eklendi!', urun });
  } catch (err) {
    res.status(500).json({ message: 'Ürün eklenemedi', error: err.message });
  }
});
// Update menu item
app.put('/urunler/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image } = req.body;
  try {
    const urun = await prisma.urun.update({
      where: { id: Number(id) },
      data: { name, price: parseFloat(price), category, image },
    });
    res.json({ message: 'Ürün güncellendi!', urun });
  } catch (err) {
    res.status(500).json({ message: 'Ürün güncellenemedi', error: err.message });
  }
});
// Delete menu item
app.delete('/urunler/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.urun.delete({ where: { id: Number(id) } });
    res.json({ message: 'Ürün silindi!' });
  } catch (err) {
    res.status(500).json({ message: 'Ürün silinemedi', error: err.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Auth API running on http://localhost:${PORT}`);
});
