const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  report_number:  { type: String, unique: true },

  // ── CASE TYPE ──────────────────────────────
  case_type: {
    type: String,
    enum: [
      'missing_person',
      'mobile_theft',
      'chain_snatching',
      'vehicle_theft',
      'robbery',
      'cybercrime',
      'burglary',
      'assault',
      'found_person',
      'other'
    ],
    default: 'missing_person'
  },

  // ── PERSON / VICTIM ────────────────────────
  full_name:         { type: String, required: true },
  age:               Number,
  gender:            String,
  dob:               String,
  blood_group:       String,

  // Physical (missing person)
  height:            String,
  weight:            String,
  eye_color:         String,
  hair_color:        String,
  complexion:        String,
  build:             String,
  identifying_marks: String,
  medical:           String,

  // Last seen / Incident
  last_seen_date:     String,
  last_seen_time:     String,
  last_seen_location: String,
  last_seen_wearing:  String,
  places:             String,
  description:        String,

  // ── GENERAL COMPLAINT FIELDS ───────────────
  incident_date:        String,   // date of theft/crime
  incident_time:        String,
  incident_location:    String,   // where it happened
  incident_description: String,   // what happened

  // Item details (mobile, vehicle, stolen goods)
  item_description:  String,   // e.g. "Samsung Galaxy S23, Black"
  item_serial:       String,   // IMEI / serial number
  item_value:        String,   // estimated value ₹

  // Vehicle specific
  vehicle_number:    String,   // TN 32 AB 1234
  vehicle_type:      String,   // car / bike / auto
  vehicle_model:     String,   // e.g. Honda Activa 6G

  // Suspect details
  suspect_description: String,  // physical description / name if known

  // ── PHOTO ──────────────────────────────────
  photo: { type: String, default: '' },

  // ── STATUS ─────────────────────────────────
  status: {
    type: String,
    enum: ['missing', 'found', 'investigating', 'closed', 'recovered'],
    default: 'missing'
  },

  // ── REPORTER ───────────────────────────────
  reporter_name:     String,
  reporter_phone:    String,
  reporter_phone2:   String,
  reporter_relation: String,
  reporter_email:    String,
  reporter_address:  String,

  // ── POLICE ─────────────────────────────────
  police_station:    String,
  police_email:      String,
  police_phone:      String,

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Case', caseSchema);
