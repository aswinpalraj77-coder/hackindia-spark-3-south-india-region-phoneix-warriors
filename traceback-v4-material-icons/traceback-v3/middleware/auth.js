const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Not authorized' });

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

const policeOnly = (req, res, next) => {
  if (req.user.role !== 'police' && req.user.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Police access only' });
  next();
};

module.exports = { protect, policeOnly };
