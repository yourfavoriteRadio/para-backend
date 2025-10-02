import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Users ---
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Example',
      email: 'alice@example.com',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Example',
      email: 'bob@example.com',
    },
  });

  // --- Products ---
  const laptop = await prisma.product.create({
    data: {
      name: 'Laptop',
      description: '15-inch laptop with 16GB RAM and 512GB SSD',
      price: 1200.0,
      oldPrice: 1400.0,
      discount: 15,
      rating: 4,
      reviews: 10,
      image: 'https://picsum.photos/seed/laptop/300/200',
    },
  });

  const phone = await prisma.product.create({
    data: {
      name: 'Phone',
      description: 'Smartphone with OLED display and great camera',
      price: 800.0,
      oldPrice: 950.0,
      discount: 10,
      rating: 5,
      reviews: 20,
      image: 'https://picsum.photos/seed/phone/300/200',
    },
  });

  const headphones = await prisma.product.create({
    data: {
      name: 'Headphones',
      description: 'Noise cancelling over-ear headphones',
      price: 200.0,
      oldPrice: 250.0,
      discount: 20,
      rating: 4,
      reviews: 15,
      image: 'https://picsum.photos/seed/headphones/300/200',
    },
  });

  // --- Orders ---
  await prisma.order.create({
    data: {
      userId: alice.id,
      total: 2000.0,
      items: {
        create: [
          {
            productId: laptop.id,
            quantity: 1,
            price: 1200.0,
          },
          {
            productId: headphones.id,
            quantity: 4,
            price: 200.0,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: bob.id,
      total: 800.0,
      items: {
        create: [
          {
            productId: phone.id,
            quantity: 1,
            price: 800.0,
          },
        ],
      },
    },
  });
}

main()
  .then(() => {
    console.log('✅ Database seeded successfully');
  })
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
