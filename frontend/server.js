// Add this after your existing routes
app.use('/api/admin', authenticateToken, require('./routes/admin'));
