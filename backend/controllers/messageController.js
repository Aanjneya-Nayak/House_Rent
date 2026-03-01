const Message = require("../models/Message");
const User = require("../models/User");

// Get user messages
const getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, recipient: otherUserId },
        { sender: otherUserId, recipient: req.user.userId },
      ],
    })
      .populate("sender", "firstName lastName profileImage")
      .populate("recipient", "firstName lastName profileImage")
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      {
        recipient: req.user.userId,
        sender: otherUserId,
        isRead: false,
      },
      { isRead: true },
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get message conversations
const getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: req.user.userId }, { recipient: req.user.userId }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", req.user.userId] },
              "$recipient",
              "$sender",
            ],
          },
          lastMessage: { $last: "$message" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$recipient", req.user.userId] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          lastMessageTime: { $last: "$createdAt" },
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "otherUser",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: conversations.length,
      conversations: conversations.map((conv) => ({
        ...conv,
        otherUser: conv.otherUser[0],
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send message
const sendMessage = async (req, res) => {
  try {
    const { recipientId, propertyId, message, subject } = req.body;

    const message_obj = new Message({
      sender: req.user.userId,
      recipient: recipientId,
      property: propertyId || null,
      message,
      subject,
    });

    await message_obj.save();
    await message_obj.populate("sender", "firstName lastName profileImage");
    await message_obj.populate("recipient", "firstName lastName profileImage");

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message_obj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMessages,
  getConversations,
  sendMessage,
};
