module.exports = async function(cb, res) {
  try {
    await cb();
    console.log('success');
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).send('Server error');
    }
  }
};
