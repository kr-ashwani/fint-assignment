const handleErrors = require('../utils/handleErrors');

const viewRepliedComment = async (req, res) => {
  try {
    res.send('view');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

const replyToComment = async (req, res) => {
  try {
    res.send('post');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

module.exports = { viewRepliedComment, replyToComment };
