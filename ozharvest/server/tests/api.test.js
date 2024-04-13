/**
 * @jest-environment node
 */

const mongoose = require('mongoose') 
const supertest = require('supertest')
const fs = require('fs')
const app = require('../app')
const api = supertest(app)


let token;
let postId;

beforeAll(async () => {
  const data = {
    username: 'test',
    password: 'password'
  }

  await api.post('/api/auth/login')
  .send(data)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  .expect('Set-Cookie', /.*/)
  .then(response => {
    token = response.body.token
  })
})

describe('api', () => {
  test('GET /api/users - fail (403)', async () => {
    await api.get('/api/users')
    .expect(403)
    .expect('Content-Type', /application\/json/)
  })  
    
  test('GET /api/users - returns users (200)', async () => {
    await api.get('/api/users')
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
    
  test('POST /api/auth/login - fail (400)', async () => {
    const data = {
      username: 'bob',
      password: 'notbob'
    }

    await api.post('/api/auth/login')
    .send(data)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })
    
  test('GET /api/auth/whoami - returns self (200)', async () => {
    await api.get('/api/auth/whoami')
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      /*console.log(response.body)*/
      expect(response.body.username).toBe('test');
    })  
  })
  
  test('POST /api/auth/login - return token (200)', async () => {
    const data = {
      username: 'test',
      password: 'password'
    }

    await api.post('/api/auth/login')
    .send(data)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect('Set-Cookie', /.*/)
    .then(response => {
      expect(response.body.token).not.toBeNull();
    })  
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

