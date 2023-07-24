import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';

describe('Game API Endpoints', () => {
  let gameId;
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URL);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('POST should create a new game and return a unique gameId', async () => {
    const response = await request(app).post('/api/v1/game/new').send({});

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    gameId = response.body.gameId;
  });

  it('GET should return a game with the given gameId', async () => {
    const response = await request(app).get(`/api/v1/game/?gameId=${gameId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.gameId).toBe(gameId);
  });

  it('DELETE should delete a game with the given gameId', async () => {
    const response = await request(app).delete(
      `/api/v1/game/?gameId=${gameId}`,
    );

    expect(response.statusCode).toBe(200);
  });

  it('POST should update a user with the given address and cards', async () => {
    const publicAddress = '0x1234567890123456789012345678901234567890';
    const response = await request(app)
      .post('/api/v1/game/cards')
      .send({ address: publicAddress, cards: [1, 2, 3] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('GET should return user cards with the given address', async () => {
    const publicAddress = '0x1234567890123456789012345678901234567890';
    const response = await request(app).get(
      `/api/v1/game/cards?publicAddress=${publicAddress}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.cards).toEqual([1, 2, 3]);
  });
});
