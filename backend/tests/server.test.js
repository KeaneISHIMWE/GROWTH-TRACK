require('dotenv').config({ path: '.env.test' });

// Mock Prisma Client
jest.mock('../config/db', () => {
  return {
    lead: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({})
    }
  };
});

// Mock Supabase Client
jest.mock('../config/supabase', () => {
  return {
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signUp: jest.fn().mockResolvedValue({ data: { user: {} }, error: null }),
      signInWithPassword: jest.fn().mockResolvedValue({ data: { user: {}, session: {} }, error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null })
    }
  };
});

const request = require('supertest');
const app = require('../server');

describe('Server Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to GrowthTrack API');
  });

  test('GET /api/leads should return 401 without authentication', async () => {
    const response = await request(app).get('/api/leads');
    expect(response.status).toBe(401);
  });
});