const express  = require('express');
const router   = express.Router();
const Case     = require('../models/Case');
const { protect, policeOnly } = require('../middleware/auth');

// GET /api/cases
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status)    filter.status    = req.query.status;
    if (req.query.case_type) filter.case_type = req.query.case_type;
    if (req.query.q) {
      const re = new RegExp(req.query.q, 'i');
      filter.$or = [{ full_name: re }, { last_seen_location: re }, { report_number: re }];
    }
    const cases = await Case.find(filter).sort({ created_at: -1 });
    res.json({ success: true, data: cases });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// GET /api/cases/stats
router.get('/stats', async (req, res) => {
  try {
    const [total, missing, found, investigating, today] = await Promise.all([
      Case.countDocuments(),
      Case.countDocuments({ status: 'missing' }),
      Case.countDocuments({ status: 'found' }),
      Case.countDocuments({ status: 'investigating' }),
      Case.countDocuments({ created_at: { $gte: new Date(new Date().setHours(0,0,0,0)), $lt: new Date(new Date().setHours(23,59,59,999)) } })
    ]);
    const districtRaw = await Case.aggregate([{ $group: { _id: '$last_seen_location', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 8 }]);
    const ageGroups   = await Case.aggregate([{ $bucket: { groupBy: '$age', boundaries: [0,13,18,30,45,60,100], default: 'Unknown', output: { count: { $sum: 1 } } } }]);
    const sixMonthsAgo = new Date(); sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthly = await Case.aggregate([
      { $match: { created_at: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: '$created_at' }, month: { $month: '$created_at' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json({ success: true, data: {
      total, missing, found, investigating, today,
      districts: districtRaw.map(d => ({ location: d._id || 'Unknown', count: d.count })),
      ageGroups: ageGroups.map(a => ({ label: a._id === 'Unknown' ? 'Unknown' : `${a._id}+`, count: a.count })),
      monthly: monthly.map(m => ({ label: `${m._id.year}-${String(m._id.month).padStart(2,'0')}`, count: m.count }))
    }});
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// GET /api/cases/:id
router.get('/:id', async (req, res) => {
  try {
    const c = await Case.findById(req.params.id);
    if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
    res.json({ success: true, data: c });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// POST /api/cases
router.post('/', async (req, res) => {
  try {
    const now = new Date();
    const caseNo = req.body.report_number || `TB-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}-${Math.floor(1000+Math.random()*9000)}`;
    const saved = await new Case({ ...req.body, report_number: caseNo }).save();
    if (req.app.get('io')) req.app.get('io').emit('new_case', { id: saved._id, full_name: saved.full_name, last_seen_location: saved.last_seen_location, report_number: saved.report_number });
    res.status(201).json({ success: true, data: saved, report_number: caseNo });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

// PATCH /api/cases/:id/status  (police only)
router.patch('/:id/status', protect, policeOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['missing','found','investigating','closed','recovered'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    const updated = await Case.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Case not found' });
    if (req.app.get('io')) req.app.get('io').emit('status_update', { id: updated._id, full_name: updated.full_name, status: updated.status, report_number: updated.report_number });
    res.json({ success: true, data: updated });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// DELETE /api/cases/:id  (police only)
router.delete('/:id', protect, policeOnly, async (req, res) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Case not found' });
    res.json({ success: true, message: 'Case deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
