import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';

describe('Marketplace API Endpoints', () => {
  let id;
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URL);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('GET should get all listings', async () => {
    const response = await request(app).get('/api/v1/marketplace/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('POST should create a new listing', async () => {
    const newListing = {
      tokenId: 100,
      price: 100,
      seller: '0x1234567890123456789012345678901234567890',
      cardId: 2,
    };

    const response = await request(app)
      .post('/api/v1/marketplace/')
      .send(newListing);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.tokenId).toBe(newListing.tokenId);
    expect(response.body.price).toBe(newListing.price);
    expect(response.body.seller).toBe(newListing.seller);
    expect(response.body.cardId).toBe(newListing.cardId);
    id = response.body._id;
  });

  it('POST should not create a new listing when it already exists', async () => {
    const newListing = {
      tokenId: 100,
      price: 100,
      seller: '0x1234567890123456789012345678901234567890',
      cardId: 2,
    };

    const response = await request(app)
      .post('/api/v1/marketplace/')
      .send(newListing);
    expect(response.statusCode).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toBe('Listing already exists');
  });

  it('GET should get all listings under a seller', async () => {
    const seller = '0x1234567890123456789012345678901234567890';

    const response = await request(app).get(
      `/api/v1/marketplace/${seller}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('DELETE should delete a listing', async () => {
    const response = await request(app).delete(
      `/api/v1/marketplace/${id}`,
    );

    expect(response.statusCode).toBe(200);
  });
});
