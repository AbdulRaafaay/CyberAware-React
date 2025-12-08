const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongod;
let authToken;

const registerAndLogin = async () => {
  const registerRes = await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'Password123!'
  });
  if (registerRes.statusCode !== 201) {
    throw new Error(`Register failed: ${registerRes.statusCode} ${JSON.stringify(registerRes.body)}`);
  }

  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'test@example.com',
    password: 'Password123!'
  });
  if (loginRes.statusCode !== 200) {
    throw new Error(`Login failed: ${loginRes.statusCode} ${JSON.stringify(loginRes.body)}`);
  }

  authToken = loginRes.body.data.token;
};

const createIncident = async () => {
  const res = await request(app)
    .post('/api/incidents')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      name: 'Test Incident',
      year: '2020',
      description: 'Test description 123',
      timeline: [
        { date: '2020-01-01', event: 'Detected', details: 'Detected by SOC' },
        { date: '2020-01-02', event: 'Contained', details: 'Isolated affected systems' }
      ],
      impact: 'high'
    });

  if (res.statusCode !== 201) {
    throw new Error(`Create incident failed: ${res.statusCode} ${JSON.stringify(res.body)}`);
  }

  return res.body.data._id;
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  process.env.JWT_SECRET = 'testsecret';
  process.env.JWT_REFRESH_SECRET = 'testrefresh';
  process.env.FRONTEND_URL = 'http://localhost:3000';
  process.env.EMAIL_HOST = 'smtp.test.com';
  process.env.EMAIL_USER = 'test';
  process.env.EMAIL_PASS = 'test';
  process.env.EMAIL_FROM = 'noreply@test.com';

  app = require('../server');
});

beforeEach(async () => {
  const { collections } = mongoose.connection;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
  await registerAndLogin();
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongod) await mongod.stop();
});

describe('Incidents API', () => {
  test('POST /api/incidents should create an incident', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Ransomware Attack',
        year: '2021',
        description: 'Sample description about an incident',
        timeline: [
          { date: '2021-03-01', event: 'Detected', details: 'Detected by monitoring' },
          { date: '2021-03-02', event: 'Contained', details: 'Network isolated' }
        ],
        impact: 'medium'
      });

    if (res.statusCode !== 201) {
      throw new Error(`Create incident failed: ${res.statusCode} ${JSON.stringify(res.body)}`);
    }

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.name).toBe('Ransomware Attack');
  });

  test('PATCH /api/incidents/:id should update an incident', async () => {
    const incidentId = await createIncident();

    const res = await request(app)
      .patch(`/api/incidents/${incidentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        impact: 'critical',
        description: 'Updated description'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.impact).toBe('critical');
    expect(res.body.data.description).toBe('Updated description');
  });
});
