// src/seeders/createAdmin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@mindfulme.com' }
    });

    if (existingAdmin) {
      console.log('🔧 Admin user already exists!');
      
      // Update to ensure admin role
      await prisma.user.update({
        where: { email: 'admin@mindfulme.com' },
        data: { role: 'ADMIN' }
      });
      
      console.log('✅ Admin role updated successfully!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@mindfulme.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    });

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@mindfulme.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: ADMIN');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
