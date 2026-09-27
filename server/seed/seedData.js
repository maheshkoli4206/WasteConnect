const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const WasteCategory = require('../models/WasteCategory');
const WasteRequest = require('../models/WasteRequest');
const { initialCategories } = require('../controllers/categoryController');
const { calculatePriority } = require('../services/priorityService');
const { calculateZone } = require('../services/zoneService');

dotenv.config({ path: '../.env' });

const seedDB = async (clearExisting = true) => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wasteconnect';
    
    if (mongoose.connection.readyState !== 1) {
      console.log('Connecting to database for seeding...');
      await mongoose.connect(connStr, { serverSelectionTimeoutMS: 5000 }).catch(async () => {
        console.log('Standard MongoDB connection failed. Running in-memory server for seeding...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        return mongoose.connect(mongod.getUri());
      });
    }

    if (clearExisting) {
      console.log('Clearing existing data...');
      await User.deleteMany({});
      await WasteCategory.deleteMany({});
      await WasteRequest.deleteMany({});
    }

    const catCount = await WasteCategory.countDocuments();
    if (catCount === 0) {
      console.log('Seeding Waste Categories...');
      await WasteCategory.insertMany(initialCategories);
    }

    let adminUser = await User.findOne({ email: 'admin@wasteconnect.org' });
    if (!adminUser) {
      console.log('Seeding Demo Admin Account...');
      adminUser = await User.create({
        name: 'System Admin',
        email: 'admin@wasteconnect.org',
        password: 'Admin123!',
        role: 'ADMIN',
      });
    }

    let residentUser = await User.findOne({ email: 'user@wasteconnect.org' });
    if (!residentUser) {
      console.log('Seeding Demo Resident User Account...');
      residentUser = await User.create({
        name: 'Alex Johnson',
        email: 'user@wasteconnect.org',
        password: 'User123!',
        role: 'USER',
      });
    }

    let residentUser2 = await User.findOne({ email: 'sarah@wasteconnect.org' });
    if (!residentUser2) {
      residentUser2 = await User.create({
        name: 'Sarah Connor',
        email: 'sarah@wasteconnect.org',
        password: 'User123!',
        role: 'USER',
      });
    }

    const reqCount = await WasteRequest.countDocuments();
    if (reqCount === 0) {
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
          pickupAddress: '742 Evergreen Terrace, Sector 4',
          pickupDate: formatDate(1),
          pickupTime: '10:00 AM - 12:00 PM',
          status: 'SUBMITTED',
        },
        {
          userId: residentUser._id,
          wasteCategory: 'Hazardous',
          description: 'Urgent: Leaking paint cans and chemical household solvents in garage.',
          pickupAddress: '742 Evergreen Terrace, Sector 4',
          pickupDate: formatDate(1),
          pickupTime: '02:00 PM - 04:00 PM',
          status: 'REVIEWED',
        },
        {
          userId: residentUser._id,
          wasteCategory: 'Plastic',
          description: 'Bulk plastic drinking bottles and packaging materials bundled in blue bags.',
          pickupAddress: '742 Evergreen Terrace, Sector 4',
          pickupDate: formatDate(-2),
          pickupTime: '09:00 AM - 11:00 AM',
          status: 'COMPLETED',
          adminNotes: 'Collected successfully by EcoCrew #4.',
        },
        {
          userId: residentUser2._id,
          wasteCategory: 'Organic',
          description: 'Compostable garden clippings and fallen leaves bags.',
          pickupAddress: '104 Oak Ridge Avenue',
          pickupDate: formatDate(2),
          pickupTime: '08:00 AM - 10:00 AM',
          status: 'SCHEDULED',
        },
        {
          userId: residentUser2._id,
          wasteCategory: 'Glass',
          description: 'Carefully packed unbroken glass beverage containers in wooden crate.',
          pickupAddress: '104 Oak Ridge Avenue',
          pickupDate: formatDate(2),
          pickupTime: '01:00 PM - 03:00 PM',
          status: 'ASSIGNED',
          adminNotes: 'Assigned to Driver Mark.',
        },
        {
          userId: residentUser2._id,
          wasteCategory: 'Metal',
          description: 'Old copper pipes and aluminum window frames.',
          pickupAddress: '555 Innovation Park Boulevard',
          pickupDate: formatDate(-5),
          pickupTime: '11:00 AM - 01:00 PM',
          status: 'COLLECTED',
        },
        {
          userId: residentUser._id,
          wasteCategory: 'Paper',
          description: 'Old textbooks and cardboard storage boxes.',
          pickupAddress: '12 West Maple Highway',
          pickupDate: formatDate(-1),
          pickupTime: '03:00 PM - 05:00 PM',
          status: 'CANCELLED',
          adminNotes: 'Cancelled by user request.',
        },
        {
          userId: residentUser2._id,
          wasteCategory: 'E-Waste',
          description: 'Broken microwave and old CRT TV unit.',
          pickupAddress: '555 Innovation Park Boulevard',
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
    }

    console.log('Seeding check completed successfully.');
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

const autoSeedIfEmpty = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Database empty. Auto-seeding initial demo data...');
      await seedDB(false);
    } else {
      console.log('Database already contains user records. Skipping auto-seed.');
    }
  } catch (err) {
    console.error('Auto-seed check error:', err.message);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = { seedDB, autoSeedIfEmpty };
