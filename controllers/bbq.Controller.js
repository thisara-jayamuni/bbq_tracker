// BBQ Controller
  const getAllBBQs = async (req, res) => {
    
    try {
      res.status(200).json({ message: 'All BBQs' });
    } catch (error) {
      res.status(500).json({ message: { error } });
    }
  };


  module.exports = {
    getAllBBQs
  };
  