/* eslint-disable */
import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const restaurants = [
  {
    name: "The Grand Spice",
    email: "contact@grandspice.com",
    phone: "+91-9876543210",
    branches: [
      {
        name: "Connaught Place",
        address: "12, Block A, Connaught Place",
        city: "New Delhi",
        state: "Delhi",
        gstNumber: "07AAACG1234A1ZX",
        floors: [
          {
            name: "Ground Floor",
            displayOrder: 1,
            tables: [
              {
                tableNumber: 1,
                status: "available",
                posX: 50,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 2,
                status: "available",
                posX: 150,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 3,
                status: "available",
                posX: 250,
                posY: 50,
                shape: "round",
              },
              {
                tableNumber: 4,
                status: "reserved",
                posX: 50,
                posY: 150,
                shape: "square",
              },
              {
                tableNumber: 5,
                status: "available",
                posX: 150,
                posY: 150,
                shape: "round",
              },
            ],
          },
          {
            name: "First Floor",
            displayOrder: 2,
            tables: [
              {
                tableNumber: 6,
                status: "available",
                posX: 50,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 7,
                status: "occupied",
                posX: 150,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 8,
                status: "available",
                posX: 250,
                posY: 50,
                shape: "rectangle",
              },
              {
                tableNumber: 9,
                status: "available",
                posX: 50,
                posY: 150,
                shape: "round",
              },
              {
                tableNumber: 10,
                status: "reserved",
                posX: 150,
                posY: 150,
                shape: "square",
              },
            ],
          },
          {
            name: "Rooftop",
            displayOrder: 3,
            tables: [
              {
                tableNumber: 11,
                status: "available",
                posX: 100,
                posY: 100,
                shape: "round",
              },
              {
                tableNumber: 12,
                status: "available",
                posX: 200,
                posY: 100,
                shape: "round",
              },
              {
                tableNumber: 13,
                status: "reserved",
                posX: 300,
                posY: 100,
                shape: "square",
              },
            ],
          },
        ],
      },
      {
        name: "Hauz Khas",
        address: "45, Hauz Khas Village",
        city: "New Delhi",
        state: "Delhi",
        gstNumber: "07AAACG1234A2ZX",
        floors: [
          {
            name: "Main Hall",
            displayOrder: 1,
            tables: [
              {
                tableNumber: 1,
                status: "available",
                posX: 60,
                posY: 60,
                shape: "square",
              },
              {
                tableNumber: 2,
                status: "occupied",
                posX: 160,
                posY: 60,
                shape: "rectangle",
              },
              {
                tableNumber: 3,
                status: "available",
                posX: 260,
                posY: 60,
                shape: "square",
              },
              {
                tableNumber: 4,
                status: "available",
                posX: 60,
                posY: 160,
                shape: "round",
              },
              {
                tableNumber: 5,
                status: "reserved",
                posX: 160,
                posY: 160,
                shape: "square",
              },
              {
                tableNumber: 6,
                status: "available",
                posX: 260,
                posY: 160,
                shape: "round",
              },
            ],
          },
          {
            name: "Outdoor Patio",
            displayOrder: 2,
            tables: [
              {
                tableNumber: 7,
                status: "available",
                posX: 80,
                posY: 80,
                shape: "round",
              },
              {
                tableNumber: 8,
                status: "available",
                posX: 180,
                posY: 80,
                shape: "round",
              },
              {
                tableNumber: 9,
                status: "occupied",
                posX: 280,
                posY: 80,
                shape: "square",
              },
              {
                tableNumber: 10,
                status: "available",
                posX: 80,
                posY: 180,
                shape: "square",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Bella Italia",
    email: "hello@bellaitalia.in",
    phone: "+91-8765432109",
    branches: [
      {
        name: "Banjara Hills",
        address: "Road No. 10, Banjara Hills",
        city: "Hyderabad",
        state: "Telangana",
        gstNumber: "36AAACB5678B1ZX",
        floors: [
          {
            name: "Dining Area",
            displayOrder: 1,
            tables: [
              {
                tableNumber: 1,
                status: "available",
                posX: 50,
                posY: 50,
                shape: "round",
              },
              {
                tableNumber: 2,
                status: "occupied",
                posX: 150,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 3,
                status: "available",
                posX: 250,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 4,
                status: "available",
                posX: 350,
                posY: 50,
                shape: "rectangle",
              },
              {
                tableNumber: 5,
                status: "reserved",
                posX: 50,
                posY: 150,
                shape: "square",
              },
              {
                tableNumber: 6,
                status: "available",
                posX: 150,
                posY: 150,
                shape: "round",
              },
              {
                tableNumber: 7,
                status: "available",
                posX: 250,
                posY: 150,
                shape: "square",
              },
              {
                tableNumber: 8,
                status: "occupied",
                posX: 350,
                posY: 150,
                shape: "round",
              },
            ],
          },
          {
            name: "Private Dining",
            displayOrder: 2,
            tables: [
              {
                tableNumber: 9,
                status: "available",
                posX: 100,
                posY: 100,
                shape: "rectangle",
              },
              {
                tableNumber: 10,
                status: "reserved",
                posX: 250,
                posY: 100,
                shape: "rectangle",
              },
            ],
          },
        ],
      },
      {
        name: "Jubilee Hills",
        address: "Plot 42, Jubilee Hills",
        city: "Hyderabad",
        state: "Telangana",
        gstNumber: "36AAACB5678B2ZX",
        floors: [
          {
            name: "Ground Floor",
            displayOrder: 1,
            tables: [
              {
                tableNumber: 1,
                status: "available",
                posX: 70,
                posY: 70,
                shape: "square",
              },
              {
                tableNumber: 2,
                status: "available",
                posX: 170,
                posY: 70,
                shape: "round",
              },
              {
                tableNumber: 3,
                status: "occupied",
                posX: 270,
                posY: 70,
                shape: "square",
              },
              {
                tableNumber: 4,
                status: "available",
                posX: 70,
                posY: 170,
                shape: "round",
              },
              {
                tableNumber: 5,
                status: "reserved",
                posX: 170,
                posY: 170,
                shape: "square",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Wok & Roll",
    email: "info@wokandroll.co.in",
    phone: "+91-7654321098",
    branches: [
      {
        name: "Koramangala",
        address: "80 Feet Road, 6th Block, Koramangala",
        city: "Bengaluru",
        state: "Karnataka",
        gstNumber: "29AAACW9012C1ZX",
        floors: [
          {
            name: "Main Floor",
            displayOrder: 1,
            tables: [
              {
                tableNumber: 1,
                status: "available",
                posX: 50,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 2,
                status: "available",
                posX: 150,
                posY: 50,
                shape: "square",
              },
              {
                tableNumber: 3,
                status: "occupied",
                posX: 250,
                posY: 50,
                shape: "rectangle",
              },
              {
                tableNumber: 4,
                status: "available",
                posX: 50,
                posY: 150,
                shape: "round",
              },
              {
                tableNumber: 5,
                status: "available",
                posX: 150,
                posY: 150,
                shape: "square",
              },
              {
                tableNumber: 6,
                status: "reserved",
                posX: 250,
                posY: 150,
                shape: "round",
              },
            ],
          },
          {
            name: "Mezzanine",
            displayOrder: 2,
            tables: [
              {
                tableNumber: 7,
                status: "available",
                posX: 80,
                posY: 80,
                shape: "square",
              },
              {
                tableNumber: 8,
                status: "occupied",
                posX: 200,
                posY: 80,
                shape: "square",
              },
              {
                tableNumber: 9,
                status: "available",
                posX: 80,
                posY: 200,
                shape: "round",
              },
              {
                tableNumber: 10,
                status: "available",
                posX: 200,
                posY: 200,
                shape: "round",
              },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("Starting database seed...\n");

  // Wipe existing data in the correct order to respect FK constraints
  console.log("Clearing existing data...");
  await prisma.table.deleteMany();
  await prisma.floor.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.restaurant.deleteMany();
  console.log("Existing data cleared.\n");

  for (const restaurantData of restaurants) {
    const { branches, ...restaurantFields } = restaurantData;

    const restaurant = await prisma.restaurant.create({
      data: restaurantFields,
    });

    console.log(
      `🍽️   Created restaurant: "${restaurant.name}" (${restaurant.id})`,
    );

    for (const branchData of branches) {
      const { floors, ...branchFields } = branchData;

      const branch = await prisma.branch.create({
        data: { ...branchFields, restaurantId: restaurant.id },
      });

      console.log(`  📍  Branch: "${branch.name}" (${branch.id})`);

      for (const floorData of floors) {
        const { tables, ...floorFields } = floorData;

        const floor = await prisma.floor.create({
          data: { ...floorFields, branchId: branch.id },
        });

        console.log(`    🏢  Floor: "${floor.name}" (${floor.id})`);

        for (const tableData of tables) {
          const table = await prisma.table.create({
            data: {
              ...tableData,
              branchId: branch.id,
              floorId: floor.id,
            },
          });

          console.log(
            `      🪑  Table #${table.tableNumber} — ${table.status} [${table.shape}] @ (${table.posX}, ${table.posY})`,
          );
        }
      }
    }

    console.log();
  }

  // Summary
  const [restaurantCount, branchCount, floorCount, tableCount] =
    await Promise.all([
      prisma.restaurant.count(),
      prisma.branch.count(),
      prisma.floor.count(),
      prisma.table.count(),
    ]);

  console.log("━".repeat(50));
  console.log("Seed complete!\n");
  console.log(`   Restaurants : ${restaurantCount}`);
  console.log(`   Branches    : ${branchCount}`);
  console.log(`   Floors      : ${floorCount}`);
  console.log(`   Tables      : ${tableCount}`);
  console.log("━".repeat(50));
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
