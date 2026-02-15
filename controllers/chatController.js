const Chat = require("../schmaModel/chat");
const generateAIResponse = require("../utilis/api");

exports.sendMessage = async (req, res, next) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) return res.status(400).json({ message: "Missing fields" });

    let chat = await Chat.findOne({ userId });
    if (!chat) chat = new Chat({ userId, messages: [] });

    chat.messages.push({ role: "user", content: message });

    const aiResponse = await generateAIResponse(message);

    chat.messages.push({ role: "ai", content: aiResponse });

    await chat.save();

    res.status(200).json({ reply: aiResponse });
  } catch (err) {
    next(err);
  }
};

exports.getChatHistory = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ userId: req.params.userId });
    if (!chat) return res.status(404).json({ message: "No chat found" });

    res.status(200).json(chat.messages);
  } catch (err) {
    next(err);
  }
};
