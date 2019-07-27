module.exports = async function(cb) {
  try {
    await cb();
    console.log('success');
  } catch (error) {
    console.error(error);
  }
};
