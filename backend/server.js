const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/staff', require('./routes/api/staff'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/brand', require('./routes/api/brand'));
app.use('/api/mail', require('./routes/api/mail'));
app.use('/api/uploadimg', require('./routes/api/image-upload'));
app.use('/api/superadmin', require('./routes/api/superadmin'));
app.use('/api/app', require('./routes/api/app'));
app.use('/api/payment', require('./routes/api/payment'));
app.use('/api/card', require('./routes/api/card'));
app.use('/api/sms', require('./routes/api/sms'));
app.use('/api/code', require('./routes/api/code'));
app.use('/api/purchase', require('./routes/api/purchase'));
app.use('/api/message', require('./routes/api/message'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port', PORT));