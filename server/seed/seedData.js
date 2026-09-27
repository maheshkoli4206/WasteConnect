const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const WasteCategory = require('../models/WasteCategory');
const WasteRequest = require('../models/WasteRequest');
const { initialCategories } = require('../controllers/categoryController');
const { calculatePriority } = require('../services/priorityService');
const { calculateZone } = require('../services/zoneService');

dotenv.config({ path: '../.env' });

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wasteconnect';
    
    console.log('Connecting to database for seeding...');
    await mongoose.connect(connStr, { serverSelectionTimeoutMS: 3000 }).catch(async () => {
      console.log('Standard MongoDB connection failed. Running in-memory server for seeding...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      return mongoose.connect(mongod.getUri());
    });

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await WasteCategory.deleteMany({});
    await WasteRequest.deleteMany({});

    console.log('Seeding Waste Categories...');
    await WasteCategory.insertMany(initialCategories);

    console.log('Seeding Demo Accounts...');
    // Demo Admin
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@wasteconnect.org',
      password: 'Admin123!',
      role: 'ADMIN',
    });

    // Demo Resident User
    const residentUser = await User.create({
      name: 'Alex Johnson',
      email: 'user@wasteconnect.org',
      password: 'User123!',
      role: 'USER',
    });

    // Secondary Resident User
    const residentUser2 = await User.create({
      name: 'Sarah Connor',
      email: 'sarah@wasteconnect.org',
      password: 'User123!',
      role: 'USER',
    });

    console.log('Seeding Demo Waste Requests...');
    const today = new Date();
    const formatDate = (daysAhead) => {
      const d = new Date(today);
      d.setDate(d.getDate() + daysAhead);
      return d.toISOString().split('T')[0];
    };

    const demoRequestsData = [
      {
        userId: residentUser._id,
        wasteCategory: 'E-Waste',
        description: 'Old laptop, broken lithium batteries, and 3 monitors from home office cleanup.',
        pickupAddress: '742 Evergreen Terrace, Sector 4', // Zone A
        pickupDate: formatDate(1),
        pickupTime: '10:00 AM - 12:00 PM',
        status: 'SUBMITTED',
      },
      {
        userId: residentUser._id,
        wasteCategory: 'Hazardous',
        description: 'Urgent: Leaking paint cans and chemical household solvents in garage.',
        pickupAddress: '742 Evergreen Terrace, Sector 4', // Zone A
        pickupDate: formatDate(1), // Same zone/date -> Batching demo
        pickupTime: '02:00 PM - 04:00 PM',
        status: 'REVIEWED',
      },
      {
        userId: residentUser._id,
        wasteCategory: 'Plastic',
        description: 'Bulk plastic drinking bottles and packaging materials bundled in blue bags.',
        pickupAddress: '742 Evergreen Terrace, Sector 4', // Zone A
        pickupDate: formatDate(-2),
        pickupTime: '09:00 AM - 11:00 AM',
        status: 'COMPLETED',
        adminNotes: 'Collected successfully by EcoCrew #4.',
      },
      {
        userId: residentUser2._id,
        wasteCategory: 'Organic',
        description: 'Compostable garden clippings and fallen leaves bags.',
        pickupAddress: '104 Oak Ridge Avenue', // Zone B
        pickupDate: formatDate(2),
        pickupTime: '08:00 AM - 10:00 AM',
        status: 'SCHEDULED',
      },
      {
        userId: residentUser2._id,
        wasteCategory: 'Glass',
        description: 'Carefully packed unbroken glass beverage containers in wooden crate.',
        pickupAddress: '104 Oak Ridge Avenue', // Zone B
        pickupDate: formatDate(2), // Same zone/date -> Batching demo
        pickupTime: '01:00 PM - 03:00 PM',
        status: 'ASSIGNED',
        adminNotes: 'Assigned to Driver Mark.',
      },
      {
        userId: residentUser2._id,
        wasteCategory: 'Metal',
        description: 'Old copper pipes and aluminum window frames.',
        pickupAddress: '555 Innovation Park Boulevard', // Zone C
        pickupDate: formatDate(-5),
        pickupTime: '11:00 AM - 01:00 PM',
        status: 'COLLECTED',
      },
      {
        userId: residentUser._id,
        wasteCategory: 'Paper',
        description: 'Old textbooks and cardboard storage boxes.',
        pickupAddress: '12 West Maple Highway', // Zone D / General
        pickupDate: formatDate(-1),
        pickupTime: '03:00 PM - 05:00 PM',
        status: 'CANCELLED',
        adminNotes: 'Cancelled by user request.',
      },
      {
        userId: residentUser2._id,
        wasteCategory: 'E-Waste',
        description: 'Broken microwave and old CRT TV unit.',
        pickupAddress: '555 Innovation Park Boulevard', // Zone C
        pickupDate: formatDate(-1),
        pickupTime: '09:00 AM - 11:00 AM',
        status: 'COMPLETED',
        adminNotes: 'Recycled at E-Tech Center.',
      },
    ];

    for (let index = 0; index < demoRequestsData.length; index++) {
      const item = demoRequestsData[index];
      const priorityInfo = calculatePriority(item.wasteCategory, item.description, item.pickupDate);
      const zone = calculateZone(item.pickupAddress);
      
      await WasteRequest.create({
        requestId: `REQ-2026-${1000 + index}`,
        userId: item.userId,
        wasteCategory: item.wasteCategory,
        description: item.description,
        pickupAddress: item.pickupAddress,
        collectionZone: zone,
        pickupDate: item.pickupDate,
        pickupTime: item.pickupTime,
        priority: priorityInfo.priority,
        priorityScore: priorityInfo.score,
        priorityReason: priorityInfo.reason,
        priorityReasons: priorityInfo.reasonsList || [],
        status: item.status,
        adminNotes: item.adminNotes || '',
      });
    }

    console.log('==================================================');
    console.log('SEED COMPLETE SUCCESSFUL!');
    console.log('==================================================');
    console.log('Demo Credentials:');
    console.log('ADMIN -> Email: admin@wasteconnect.org | Password: Admin123!');
    console.log('USER  -> Email: user@wasteconnect.org  | Password: User123!');
    console.log('==================================================');

    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Seeding failed:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
