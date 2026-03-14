require('dotenv').config();
const mongoose = require('mongoose');
const Case = require('./models/Case');

const SEED_CASES = [
  {
    report_number: 'TB-2025-0001', full_name: 'Karthik Rajan', age: 28, gender: 'Male',
    status: 'missing', last_seen_location: 'Adyar Bridge, Chennai',
    last_seen_date: '2025-07-14', last_seen_time: '21:30',
    last_seen_wearing: 'Blue jeans, white shirt', height: '5.7ft - 5.9ft',
    weight: '65-75 kg', eye_color: 'Black', hair_color: 'Black',
    complexion: 'Wheatish', identifying_marks: 'Small scar on left cheek',
    blood_group: 'O+', description: 'Left home after a family argument.',
    reporter_name: 'Rajan Kumar', reporter_phone: '9876543210',
    reporter_relation: 'Father', reporter_email: 'rajan@email.com',
    police_station: 'Adyar PS, Chennai', created_at: new Date('2025-07-14T21:45:00')
  },
  {
    report_number: 'TB-2025-0002', full_name: 'Divya Krishnan', age: 14, gender: 'Female',
    status: 'missing', last_seen_location: 'Anna Nagar 3rd Street, Chennai',
    last_seen_date: '2025-07-16', last_seen_time: '15:00',
    last_seen_wearing: 'School uniform - blue skirt, white shirt',
    height: '4.5ft - 5ft', weight: '30-45 kg', eye_color: 'Dark Brown',
    hair_color: 'Black', complexion: 'Fair', identifying_marks: 'Birthmark on right arm',
    blood_group: 'B+', description: 'Went to school and did not return.',
    reporter_name: 'Krishnan P', reporter_phone: '9765432109',
    reporter_relation: 'Father', police_station: 'Anna Nagar PS, Chennai',
    created_at: new Date('2025-07-16T18:00:00')
  },
  {
    report_number: 'TB-2025-0003', full_name: 'Ramu Pillai', age: 67, gender: 'Male',
    status: 'found', last_seen_location: 'T Nagar Market, Chennai',
    last_seen_date: '2025-07-10', last_seen_time: '11:00',
    last_seen_wearing: 'White dhoti, grey shirt', height: '5ft - 5.3ft',
    complexion: 'Brown', identifying_marks: 'Has hearing aid, walks with slight limp',
    blood_group: 'A+', description: 'Elderly person with mild dementia. Found near Tambaram.',
    reporter_name: 'Suresh Pillai', reporter_phone: '9654321098',
    reporter_relation: 'Son', police_station: 'T Nagar PS, Chennai',
    created_at: new Date('2025-07-10T12:00:00')
  },
  {
    report_number: 'TB-2025-0004', full_name: 'Mohamed Farook', age: 22, gender: 'Male',
    status: 'missing', last_seen_location: 'Gandhipuram, Coimbatore',
    last_seen_date: '2025-07-12', last_seen_time: '08:15',
    last_seen_wearing: 'Black jeans, red t-shirt, backpack', height: '5.6ft - 5.9ft',
    complexion: 'Dark Brown', identifying_marks: 'Tattoo on left arm', blood_group: 'B-',
    description: 'College student. Phone switched off.',
    reporter_name: 'Abdul Farook', reporter_phone: '9543210987',
    reporter_relation: 'Father', police_station: 'Coimbatore Central PS',
    created_at: new Date('2025-07-12T10:30:00')
  },
  {
    report_number: 'TB-2025-0005', full_name: 'Lakshmi Devi', age: 45, gender: 'Female',
    status: 'investigating', last_seen_location: 'Mattuthavani Bus Stand, Madurai',
    last_seen_date: '2025-07-15', last_seen_time: '14:00',
    last_seen_wearing: 'Green saree, gold earrings', height: '5ft - 5.3ft',
    complexion: 'Wheatish', blood_group: 'AB+',
    description: 'Went to visit sister in Trichy, never arrived.',
    reporter_name: 'Arun Devi', reporter_phone: '9432109876',
    reporter_relation: 'Husband', police_station: 'Madurai Central PS',
    created_at: new Date('2025-07-15T16:00:00')
  },
  {
    report_number: 'TB-2025-0006', full_name: 'Arjun Sharma', age: 8, gender: 'Male',
    status: 'missing', last_seen_location: 'Singanallur Lake Area, Coimbatore',
    last_seen_date: '2025-07-17', last_seen_time: '16:30',
    last_seen_wearing: 'Blue shorts, yellow t-shirt', height: 'Below 4ft',
    complexion: 'Fair', blood_group: 'O-',
    description: 'Child playing near lake. CRITICAL ALERT.',
    reporter_name: 'Vijay Sharma', reporter_phone: '9321098765',
    reporter_relation: 'Father', police_station: 'Coimbatore Central PS',
    created_at: new Date('2025-07-17T17:00:00')
  },
  {
    report_number: 'TB-2025-0007', full_name: 'Kavitha Nair', age: 35, gender: 'Female',
    status: 'found', last_seen_location: 'Periyar Bus Stand, Madurai',
    last_seen_date: '2025-07-08', last_seen_time: '09:00',
    last_seen_wearing: 'Pink churidar', height: '5ft - 5.3ft',
    complexion: 'Fair', blood_group: 'A-',
    description: 'Found safe in Tirunelveli.',
    reporter_name: 'Nair S', reporter_phone: '9210987654',
    reporter_relation: 'Spouse', police_station: 'Madurai Central PS',
    created_at: new Date('2025-07-08T11:00:00')
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await Case.deleteMany({});
  console.log('🗑️  Cleared existing cases');

  await Case.insertMany(SEED_CASES);
  console.log(`🌱 Seeded ${SEED_CASES.length} cases into tracebackDB`);

  await mongoose.disconnect();
  console.log('✅ Done! Open MongoDB Compass → tracebackDB → cases');
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1); });
