const prisma = require('../config/db');

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
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
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error while fetching clients' });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
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

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Internal server error while fetching client' });
  }
};

// Create a new client (convert lead to client)
const createClient = async (req, res) => {
  try {
    const { leadId, contractValue, renewalDate } = req.body;
    
    // Validate required fields
    if (!leadId || !contractValue || !renewalDate) {
      return res.status(400).json({ error: 'Lead ID, contract value, and renewal date are required' });
    }

    // Check if lead exists
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Check if client already exists for this lead
    const existingClient = await prisma.client.findUnique({ where: { leadId } });
    if (existingClient) {
      return res.status(400).json({ error: 'Client already exists for this lead' });
    }

    const client = await prisma.client.create({
      data: {
        leadId,
        contractValue: parseFloat(contractValue),
        renewalDate: new Date(renewalDate)
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

    // Update lead status to "Closed - Won"
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: 'Closed - Won' }
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Internal server error while creating client' });
  }
};

// Update a client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { contractValue, renewalDate } = req.body;

    // Check if client exists
    const existingClient = await prisma.client.findUnique({ where: { id } });
    if (!existingClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        contractValue: contractValue ? parseFloat(contractValue) : undefined,
        renewalDate: renewalDate ? new Date(renewalDate) : undefined
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

    res.status(200).json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Internal server error while updating client' });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if client exists
    const existingClient = await prisma.client.findUnique({ where: { id } });
    if (!existingClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await prisma.client.delete({ where: { id } });

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Internal server error while deleting client' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};