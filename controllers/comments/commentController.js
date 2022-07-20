const handleErrors = require('../utils/handleErrors');

const viewComment = async (req, res) => {
  try {
    res.send('view');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

const postComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment?.trim()?.length)
      return res.status(400).json('comment is missing');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

module.exports = { viewComment, postComment };
