import express from 'express';
import prisma from '../config/database.js'; // Import prisma instance
import cors from 'cors';
import multer from 'multer';
import path from 'path';

console.log("auth.js betiği başlatılıyor...");

const app = express();
// const prisma = new PrismaClient(); // Removed as prisma is imported from database.js

process.on('uncaughtException', (err) => {
  console.error('Yakalanmayan Hata:', err);
  // process.exit(1); // Temporarily commented out for debugging
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('İşlenmeyen Reddedilme:', promise, 'neden:', reason);
  // process.exit(1); // Temporarily commented out for debugging
});

// 'exit' olayı için bir dinleyici ekle
process.on('exit', (code) => {
  console.log(`auth.js betiği şu kodla çıkıyor: ${code}`);
});

app.use(cors({
  origin: '*', // Temporarily set to '*' for debugging. Remember to revert to specific origins in production.
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Multer config for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'uploads', 'avatars'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

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
    console.error("Kayıt sırasında hata:", err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

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
    console.error("Giriş sırasında hata:", err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

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
    console.error("Profil güncellenirken hata:", err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, avatar: true }
    });
    res.json(users);
  } catch (err) {
    console.error("Kullanıcılar getirilirken hata:", err);
    res.status(500).json({ message: 'Kullanıcılar getirilirken hata', error: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, avatar, isAdmin } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name,
        phone: phone,
        avatar: avatar,
        isAdmin: isAdmin,
      },
    });
    res.json({ message: 'Kullanıcı başarıyla güncellendi!', user });
  } catch (err) {
    console.error('Kullanıcı güncellenirken hata:', err);
    res.status(500).json({ message: 'Kullanıcı güncellenemedi', error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: 'Kullanıcı başarıyla silindi!' });
  } catch (err) {
    console.error('Kullanıcı silinirken hata:', err);
    res.status(500).json({ message: 'Kullanıcı silinemedi', error: err.message });
  }
});

app.get('/urunler', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : undefined;
    const products = await prisma.product.findMany({ where });
    res.json(products);
  } catch (err) {
    console.error("Ürünler getirilirken hata:", err);
    res.status(500).json({ message: 'Ürünler alınamadı', error: err.message });
  }
});

app.post('/urunler', async (req, res) => {
  const { name, price, category, image } = req.body;

  if (!name || !category || price === undefined || price === null) {
    return res.status(400).json({ message: 'Geçersiz ürün verileri: Ad, kategori ve fiyat gereklidir.' });
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return res.status(400).json({ message: 'Geçersiz fiyat değeri. Fiyat bir sayı olmalıdır.' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parsedPrice,
        category,
        image: image || null,
      }
    });
    res.status(201).json({ message: 'Ürün başarıyla eklendi!', product });
  } catch (err) {
    console.error("Ürün oluşturulurken hata:", err);
    res.status(500).json({ message: 'Ürün eklenemedi', error: err.message });
  }
});

app.put('/urunler/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image } = req.body;

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (category !== undefined) updateData.category = category;
  if (image !== undefined) updateData.image = image || null;

  if (price !== undefined) {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'Geçersiz fiyat değeri. Fiyat bir sayı olmalıdır.' });
    }
    updateData.price = parsedPrice;
  }

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.json({ message: 'Ürün güncellendi!', product });
  } catch (err) {
    console.error("Ürün güncellenirken hata:", err);
    res.status(500).json({ message: 'Ürün güncellenemedi', error: err.message });
  }
});

app.delete('/urunler/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: 'Ürün silindi!' });
  } catch (err) {
    console.error("Ürün silinirken hata:", err);
    res.status(500).json({ message: 'Ürün silinemedi', error: err.message });
  }
});

// Tüm siparişleri getiren yeni API endpoint'i
app.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true }
        },
        address: {
          select: { street: true, city: true, state: true, country: true, phoneNumber: true }
        },
        items: {
          include: {
            product: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      userId: order.userId,
      addressId: order.addressId,
      total: order.totalAmount,
      createdAt: order.createdAt,
      status: order.status,
      user: order.user,
      phoneNumber: order.address.phoneNumber,
      addressDetails: {
        street: order.address.street,
        city: order.address.city,
        state: order.address.state,
        country: order.address.country,
      },
      items: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error("Siparişler getirilirken hata:", err);
    res.status(500).json({ message: 'Siparişler alınamadı', error: err.message });
  }
});

// Sipariş durumunu güncelleyen yeni API endpoint'i
app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Durum belirtilmelidir.' });
  }

  console.log(`Received status: ${status}, Uppercased status: ${status.toUpperCase()}`); // Debug log

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status: status.toUpperCase() }, // Convert to uppercase to match enum members
    });
    res.json({ message: 'Sipariş durumu başarıyla güncellendi!', order: updatedOrder });
  } catch (err) {
    console.error("Sipariş durumu güncellenirken hata:", err);
    res.status(500).json({ message: 'Sipariş durumu güncellenemedi', error: err.message });
  }
});

console.log("Registering /submit-order route...");
app.post('/submit-order', async (req, res) => {
  const { userId, address, items } = req.body;

  console.log("Received order submission:", { userId, address, items });

  if (!userId || !address || !items || items.length === 0) {
    console.error("Missing order data in /api/submit-order:", { userId, address, items });
    return res.status(400).json({ message: 'Sipariş verileri eksik.' });
  }

  // Validate required address fields
  const requiredAddressFields = ['street', 'city', 'state', 'country'];
  for (const field of requiredAddressFields) {
    if (!address[field] || address[field].trim() === '') {
      return res.status(400).json({ message: `Adres bilgileri eksik: ${field} zorunludur.` });
    }
  }

  try {
    const parsedUserId = Number(userId);

    // Clean and validate phone number (remove non-numeric characters)
    const cleanPhoneNumber = address.phoneNumber ? address.phoneNumber.replace(/\D/g, '') : null;

    // Log each item's price and quantity for debugging
    items.forEach((item, index) => {
      console.log(`Debug Item ${index}: urunId=${item.urunId}, quantity=${item.quantity}, price=${item.price}, Type of price: ${typeof item.price}, Type of quantity: ${typeof item.quantity}`);
    });

    // Calculate total amount ensuring price and quantity are numbers
    const totalAmountCalculated = items.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number, default to 0 if invalid
      const itemQuantity = parseInt(item.quantity) || 0; // Ensure quantity is an integer, default to 0 if invalid
      console.log(`Debug Calculating item total for urunId ${item.urunId}: ${itemPrice} * ${itemQuantity} = ${itemPrice * itemQuantity}`);
      return sum + (itemPrice * itemQuantity);
    }, 0);

    console.log("Debug Calculated total amount:", totalAmountCalculated);

    const createdAddress = await prisma.address.create({
      data: {
        userId: parsedUserId,
        street: address.street,
        buildingNo: address.buildingNo,
        floor: address.floor,
        apartmentNo: address.apartmentNo,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        phoneNumber: cleanPhoneNumber, // Use the cleaned phone number
      },
    });

    const order = await prisma.order.create({
      data: {
        userId: parsedUserId,
        addressId: createdAddress.id,
        totalAmount: totalAmountCalculated, // Use the calculated total amount
        items: {
          create: items.map(item => {
            // Use a dummy product ID (e.g., 1) if urunId is undefined or null
            const productIdToUse = item.urunId !== undefined && item.urunId !== null ? item.urunId : 1; // Assuming product with ID 1 exists
            
            return {
              quantity: item.quantity,
              price: item.price,
              product: {
                connect: { id: productIdToUse } // Connect to the product
              }
            };
          }),
        },
      },
    });

    res.status(201).json({ message: 'Sipariş başarıyla oluşturuldu!', order });
  } catch (err) {
    console.error("Error creating order in /api/submit-order:", err);
    res.status(500).json({ message: 'Sipariş oluşturulamadı', error: err.message });
  }
});

// Avatar upload endpoint
app.post('/api/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'هیچ فایلی ارسال نشده است.' });
    }
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'userId الزامی است.' });
    }
    // مسیر نسبی برای ذخیره در دیتابیس
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    // بروزرسانی کاربر
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: { avatar: avatarPath },
    });
    res.json({ message: 'عکس پروفایل با موفقیت آپلود شد.', avatar: avatarPath, user });
  } catch (err) {
    console.error('خطا در آپلود عکس پروفایل:', err);
    res.status(500).json({ message: 'خطا در آپلود عکس پروفایل', error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

// Keep the process alive for debugging
setInterval(() => {
  // Do nothing, just keep the event loop busy
}, 10000); // Keep alive every 10 seconds

export default app;