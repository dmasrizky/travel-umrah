const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const badGallery = await prisma.gallery.findMany({
    where: { imageUrl: { contains: 'unsplash.com/photos' } }
  });
  const badPackages = await prisma.package.findMany({
    where: { imageUrl: { contains: 'unsplash.com/photos' } }
  });

  console.log('Bad Gallery Items:', badGallery.length);
  if (badGallery.length > 0) console.log(badGallery);
  
  console.log('Bad Package Items:', badPackages.length);
  if (badPackages.length > 0) console.log(badPackages);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
