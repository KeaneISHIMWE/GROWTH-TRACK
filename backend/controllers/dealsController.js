const prisma = require('../config/db');

// Get all deals
const getAllDeals = async (req, res) => {
  try {
    const deals = await prisma.deal.findMany({
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            email: true
          }
        }
      }
    });
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Internal server error while fetching deals' });
  }
};

// Get deal by ID
const getDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await prisma.deal.findUnique({
      where: { id },
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            email: true
          }
        }
      }
    });

    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.status(200).json(deal);
  } catch (error) {
    console.error('Error fetching deal:', error);
    res.status(500).json({ error: 'Internal server error while fetching deal' });
  }
};

// Create a new deal
const createDeal = async (req, res) => {
  try {
    const { leadId, stage, probability, amount, closeDate } = req.body;
    
    // Validate required fields
    if (!leadId || !amount) {
      return res.status(400).json({ error: 'Lead ID and amount are required' });
    }

    // Check if lead exists
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const deal = await prisma.deal.create({
      data: {
        leadId,
        stage: stage || 'New Lead',
        probability: probability ? parseInt(probability) : 0,
        amount: parseFloat(amount),
        closeDate: closeDate ? new Date(closeDate) : null
      },
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(deal);
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(500).json({ error: 'Internal server error while creating deal' });
  }
};

// Update a deal
const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, probability, amount, closeDate } = req.body;

    // Check if deal exists
    const existingDeal = await prisma.deal.findUnique({ where: { id } });
    if (!existingDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    const deal = await prisma.deal.update({
      where: { id },
      data: {
        stage,
        probability: probability !== undefined ? parseInt(probability) : undefined,
        amount: amount !== undefined ? parseFloat(amount) : undefined,
        closeDate: closeDate ? new Date(closeDate) : null
      },
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            email: true
          }
        }
      }
    });

    res.status(200).json(deal);
  } catch (error) {
    console.error('Error updating deal:', error);
    res.status(500).json({ error: 'Internal server error while updating deal' });
  }
};

// Delete a deal
const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if deal exists
    const existingDeal = await prisma.deal.findUnique({ where: { id } });
    if (!existingDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    await prisma.deal.delete({ where: { id } });

    res.status(200).json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ error: 'Internal server error while deleting deal' });
  }
};

module.exports = {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
};