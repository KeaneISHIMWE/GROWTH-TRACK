const prisma = require('../config/db');

// Get all revenue entries
const getAllRevenue = async (req, res) => {
  try {
    const revenue = await prisma.revenue.findMany({
      include: {
        deal: {
          select: {
            id: true,
            stage: true,
            amount: true,
            lead: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                company: true
              }
            }
          }
        }
      }
    });
    res.status(200).json(revenue);
  } catch (error) {
    console.error('Error fetching revenue:', error);
    res.status(500).json({ error: 'Internal server error while fetching revenue' });
  }
};

// Get revenue by ID
const getRevenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const revenue = await prisma.revenue.findUnique({
      where: { id },
      include: {
        deal: {
          select: {
            id: true,
            stage: true,
            amount: true,
            lead: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                company: true
              }
            }
          }
        }
      }
    });

    if (!revenue) {
      return res.status(404).json({ error: 'Revenue entry not found' });
    }

    res.status(200).json(revenue);
  } catch (error) {
    console.error('Error fetching revenue entry:', error);
    res.status(500).json({ error: 'Internal server error while fetching revenue entry' });
  }
};

// Create a new revenue entry
const createRevenue = async (req, res) => {
  try {
    const { dealId, amount, date } = req.body;
    
    // Validate required fields
    if (!dealId || !amount) {
      return res.status(400).json({ error: 'Deal ID and amount are required' });
    }

    // Check if deal exists
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    const revenue = await prisma.revenue.create({
      data: {
        dealId,
        amount: parseFloat(amount),
        date: date ? new Date(date) : new Date()
      },
      include: {
        deal: {
          select: {
            id: true,
            stage: true,
            amount: true,
            lead: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                company: true
              }
            }
          }
        }
      }
    });

    res.status(201).json(revenue);
  } catch (error) {
    console.error('Error creating revenue entry:', error);
    res.status(500).json({ error: 'Internal server error while creating revenue entry' });
  }
};

// Update a revenue entry
const updateRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;

    // Check if revenue entry exists
    const existingRevenue = await prisma.revenue.findUnique({ where: { id } });
    if (!existingRevenue) {
      return res.status(404).json({ error: 'Revenue entry not found' });
    }

    const revenue = await prisma.revenue.update({
      where: { id },
      data: {
        amount: amount !== undefined ? parseFloat(amount) : undefined,
        date: date ? new Date(date) : undefined
      },
      include: {
        deal: {
          select: {
            id: true,
            stage: true,
            amount: true,
            lead: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                company: true
              }
            }
          }
        }
      }
    });

    res.status(200).json(revenue);
  } catch (error) {
    console.error('Error updating revenue entry:', error);
    res.status(500).json({ error: 'Internal server error while updating revenue entry' });
  }
};

// Delete a revenue entry
const deleteRevenue = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if revenue entry exists
    const existingRevenue = await prisma.revenue.findUnique({ where: { id } });
    if (!existingRevenue) {
      return res.status(404).json({ error: 'Revenue entry not found' });
    }

    await prisma.revenue.delete({ where: { id } });

    res.status(200).json({ message: 'Revenue entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting revenue entry:', error);
    res.status(500).json({ error: 'Internal server error while deleting revenue entry' });
  }
};

module.exports = {
  getAllRevenue,
  getRevenueById,
  createRevenue,
  updateRevenue,
  deleteRevenue
};