const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');

// @path /api/message
// @desc save message to database
router.post('/', auth, async (req, res) => {
  const { forWho, message, department, receiverId } = req.body;
  const { id } = req.user;
  if (forWho != 'public' && !(department || receiverId)) {
    return res.status(401).send({ msg: 'Bad request' });
  }
  const member = await Staff.findOne({ _id: receiverId });
  const receiverName = member.name;
  const receiverDepartment = member.department;
  const newPost = new Message({
    sender: id,
    receiverInfo: {
      name: receiverName,
      department: receiverDepartment,
      avatar: member.avatar
    },
    forWho,
    message,
    department,
    receiver: receiverId
  });
  try {
    await newPost.save();
    res.send({ status: 'Success' })
  } catch (error) {
    res.send({ status: 'failure', msg: 'Server error', error })
  }
});


// @path /api/message/getPublic
// @desc get public messages by sender id
router.post('/getPublic', auth, async (req, res) => {
  const { supervisor } = req.body;
  if (!supervisor) {
    return res.status(401).send({ msg: 'Bad Request' })
  }
  try {
    const messages = await Message.find({ sender: supervisor, forWho: 'public' });
    if (messages.length > 0) {
      return res.send({ messages });
    } else return res.send({ msg: 'No messages were found' })
  } catch (error) {
    res.send({ status: 'failure', msg: 'Server error', error })
  }
});

// @path /api/message/getDepartment
// @desc get department messages by sender id
router.post('/getDepartment', auth, async (req, res) => {
  const { supervisor } = req.body;
  if (!supervisor) {
    return res.status(401).send({ msg: 'Bad Request' })
  }
  try {
    const messages = await Message.find({ sender: supervisor, forWho: 'department' });
    if (messages.length > 0) {
      return res.send({ messages });
    } else return res.send({ msg: 'No messages were found' })
  } catch (error) {
    res.send({ status: 'failure', msg: 'Server error', error })
  }
});

// @path /api/message/getDirect
// @desc get direct messages by sender id
router.post('/getDirect', auth, async (req, res) => {
  const { supervisor } = req.body;
  if (!supervisor) {
    return res.status(401).send({ msg: 'Bad Request' })
  }
  const { id } = req.user;
  try {
    const messages = await Message.find({ sender: supervisor, forWho: 'private', receiver: id });
    if (messages.length > 0) {
      return res.send({ messages });
    } else return res.send({ msg: 'No messages were found' })
  } catch (error) {
    res.send({ status: 'failure', msg: 'Server error', error })
  }
});

router.post('/supportTicket', auth, async (req, res) => {
  const { message } = req.body;
  const { id } = req.user;
  const newPost = new Message({
    sender: id,
    receiverInfo: {
      name: 'admin',
      department: 'admin',
      avatar: 'admin'
    },
    forWho: 'admin',
    message,
    receiver: 'admin'
  });
  await newPost.save();
  res.send('Successs');
});

router.post('/target/getDepartment', auth, async (req, res) => {
  const { supervisor } = req.body;
  if (!supervisor) {
    return res.status(401).send({ msg: 'Bad Request' })
  }
  try {
    const messages = await Message.find({ sender: supervisor, forWho: 'departmentTarget' });
    if (messages.length > 0) {
      return res.send({ messages });
    } else return res.send({ msg: 'No messages were found' })
  } catch (error) {
    res.send({ status: 'failure', msg: 'Server error', error })
  }
});

router.post('/target/getPersonal', auth, async (req, res) => {
  const { supervisor } = req.body;
  if (!supervisor) {
    return res.status(401).send({ msg: 'Bad Request' })
  }
  try {
    const messages = await Message.find({ sender: supervisor, forWho: 'privateTarget', receiver: req.user.id });
    if (messages.length > 0) {
      return res.send({ messages });
    } else return res.send({ msg: 'No messages were found' })
  } catch (error) {
    res.send({ status: 'failure', msg: 'Server error', error })
  }
});

module.exports = router;