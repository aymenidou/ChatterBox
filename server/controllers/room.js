const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const { name } = req.body;
  try {
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ msg: 'Room already exists' });
    }

    const newRoom = new Room({ name });
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};