const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const umrahEquipment = ["koper bagasi", "koper cabin", "tas selempang", "id card", "buku memori", "buku kalung do'a", "buku manasik", "kain batik travel"]
  const hajiEquipment = ["koper bagasi", "koper cabin", "tas selempang", "id card", "buku memori", "buku kalung do'a", "buku manasik", "kain batik travel"]
  const menEquipment = ["kain ihram", "sabuk ihram"]
  const womenEquipment = ["mukenah", "jilbab travel"]

  console.log("Updating UMRAH packages...")
  const umrahUpdate = await prisma.package.updateMany({
    where: { type: 'UMRAH' },
    data: {
      generalEquipment: umrahEquipment,
      menEquipment: menEquipment,
      womenEquipment: womenEquipment
    }
  })
  console.log(`Updated ${umrahUpdate.count} UMRAH packages.`)

  console.log("Updating HAJI packages...")
  const hajiUpdate = await prisma.package.updateMany({
    where: { type: 'HAJI' },
    data: {
      generalEquipment: hajiEquipment,
      menEquipment: menEquipment,
      womenEquipment: womenEquipment
    }
  })
  console.log(`Updated ${hajiUpdate.count} HAJI packages.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
