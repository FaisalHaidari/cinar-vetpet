import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany(); // پاک‌سازی کاربران قبلی
  await prisma.urun.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        name: 'Faisal Majid',
        email: 'faisal@gmail.com',
        password: '123456',
        phone: '05075056645',
        avatar: '',
      },
      {
        name: 'Faisal',
        email: 'faisalfaisal@gmail.com',
        password: '123456',
        phone: '09000000000',
        avatar: '',
      }
    ]
  });

  await prisma.urun.createMany({
    data: [
      {
        name: 'Kedi Oyuncağı',
        price: 60.0,
        category: 'Oyuncaklar',
        image: '',
      },
      {
        name: 'Köpek Oyuncağı',
        price: 80.0,
        category: 'Oyuncaklar',
        image: '',
      },
      {
        name: 'Veteriner Şampuanı',
        price: 150.0,
        category: 'Sağlık ve Veteriner Ürünleri',
        image: '',
      },
      {
        name: 'Vitamin Takviyesi',
        price: 120.0,
        category: 'Sağlık ve Veteriner Ürünleri',
        image: '',
      },
      {
        name: 'Kedi Maması',
        price: 120.0,
        category: 'Mama ve Besin Ürünleri',
        image: '',
      },
      {
        name: 'Köpek Maması',
        price: 150.0,
        category: 'Mama ve Besin Ürünleri',
        image: '',
      },
      {
        name: 'Kuş Kafesi',
        price: 250.0,
        category: 'Kafesler ve Barınaklar',
        image: '',
      },
      {
        name: 'Köpek Kulübesi',
        price: 300.0,
        category: 'Kafesler ve Barınaklar',
        image: '',
      },
    ]
  });

  console.log('Test users and products created!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 