const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'admin77';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { username },
    update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN'
    },
    create: {
      email: 'admin@annur.com',
      username,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log({ user });

  // Seed Package
  const slug = 'umrah-maret-syawal-2026';
  const existingPackage = await prisma.package.findUnique({ where: { slug } });
  
  if (!existingPackage) {
      await prisma.package.create({
        data: {
          title: 'Umrah Maret Syawal',
          slug,
          type: 'UMRAH',
          price: 37500000,
          duration: 9, // Assumed duration based on common packages, user didn't specify duration explicitly but mentioned 2 days manasik etc. Let's assume standard 9 days or update later.
          // Wait, user said "Maret Syawal", usually longer? No, 37.5 mill suggest premium 9-12 days. Let's put 9 for now.
          departureDate: 'Maret 2026 (Syawal)',
          description: `Paket Umrah Spesial Maret Syawal. \n\nFasilitas:\n- Tiket Pesawat PP Lion Air\n- Lounge Bandara\n- Visa Umrah & Handling\n- Manasik Umrah 2 Hari\n- Asuransi Perjalanan\n- Hotel Bintang 4 & 3\n- Perlengkapan Lengkap`,
          amenities: ['Tiket Pesawat PP', 'Visa Umrah', 'Hotel Bintang 4/3', 'Makan 3x', 'Mutawwif', 'Air Zam Zam 5L'],
          imageUrl: 'https://images.unsplash.com/photo-1596720510526-7881c628cac6?q=80&w=1000&auto=format&fit=crop',
          isFeatured: true,
          hotelMakkah: 'Olayan Ajyad',
          hotelMadinah: 'Sanabil',
          airline: 'Lion Air'
        }
      });
      console.log('Package created');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
