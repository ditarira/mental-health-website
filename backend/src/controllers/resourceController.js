// src/controllers/resourceController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all resources
const getResources = async (req, res) => {
  try {
    const { category } = req.query;
    
    const where = category ? { category } : {};
    
    const resources = await prisma.mentalHealthResource.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ resources });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to get resources' });
  }
};

// Get resource by ID
const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resource = await prisma.mentalHealthResource.findUnique({
      where: { id }
    });

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ resource });
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({ error: 'Failed to get resource' });
  }
};

// Create resource (admin only)
const createResource = async (req, res) => {
  try {
    const { title, description, content, category, imageUrl } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({ error: 'Title, description, content, and category are required' });
    }

    const resource = await prisma.mentalHealthResource.create({
      data: {
        title,
        description,
        content,
        category,
        imageUrl
      }
    });

    res.status(201).json({ resource });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

// Update resource (admin only)
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, imageUrl } = req.body;

    const resource = await prisma.mentalHealthResource.update({
      where: { id },
      data: {
        title,
        description,
        content,
        category,
        imageUrl
      }
    });

    res.json({ resource });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

// Delete resource (admin only)
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.mentalHealthResource.delete({
      where: { id }
    });

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};

module.exports = {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};

