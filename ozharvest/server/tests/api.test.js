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
  test('GET /api/posts - return posts (200)', async () => {
    await api.get('/api/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
    
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
    /*const response = await api.get('/api/likes')*/
    /*expect(response.body).toHaveLength(4)*/
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

  test('POST /api/post - return token (200)', async () => {
    const newPost = {
      title: "Post Title",
      content: "Post Content"
    }

    await api.post('/api/post')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)    
    
    .then(response => {
      /*console.log(response.body)*/
      expect(response.body.title).toBe('Post Title')
      expect(response.body.content).toBe('Post Content')
      expect(response.body.id).not.toBeNull()
      expect(response.body.author).toBe('617d2afd9b6201433e4e6059')
      expect(response.body.vote).toEqual(0)
      postId = response.body.id
    })  
  })
  
  test('POST /api/post/{id}/vote - return vote (200)', async () => {
    const newVote = {
      vote: 1
    }

    await api.post('/api/post/' + postId + '/vote')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .send(newVote)
    .expect(200)
    .expect('Content-Type', /application\/json/)    
    
    .then(response => {
      /*console.log(response.body)*/
      expect(response.body.vote).toEqual(1)
    })
  })
  
  test('POST /api/post/{id}/comment - return vote (200)', async () => {
    const newComment = {
      comment: "Comment Content" 
    }

    await api.post('/api/post/' + postId + '/comment')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .send(newComment)
    .expect(200)
    .expect('Content-Type', /application\/json/)    
  })
  
  test('GET /api/post/{id}/comments - return post comments (200)', async () => {
    await api.get('/api/post/'+ postId + "/comments")
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      expect(response.body.comments[0].comment).toBe('Comment Content')
    })  
  })
  
  test('GET /api/post/{id} - return post (200)', async () => {
    await api.get('/api/post/'+ postId)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      /*console.log(response.body)*/
      expect(response.body.title).toBe('Post Title')
      expect(response.body.content).toBe('Post Content')
      expect(response.body.id).not.toBeNull()
      expect(response.body.author.id).toBe('617d2afd9b6201433e4e6059')
      expect(response.body.author.username).toBe('test')
      expect(response.body.vote).toEqual(1)
    })  
  })
  
  test('DELETE /api/post/{id} - delete (200)', async () => {
    await api.delete('/api/post/' + postId)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .expect(204)
  })
  
  test('POST /api/post - fail (403)', async () => {
    const newPost = {
      title: "Post Title",
      content: "Post Content"
    }

    await api.post('/api/post')
    .set('Authorization', 'Bearer invalid.token.here')
    .send(newPost)
    .expect(403)
    .expect('Content-Type', /application\/json/)
  })
  
  test('POST /api/follow - follow (201)', async () => {
    const newFollow = {
      username: "john"
    }
    
    await api.post('/api/follow')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .expect(201)
    .set('Accept', 'application/json')
    .send(newFollow)
  })
  
  test('POST /api/follow - fail (409)', async () => {
    const newFollow = {
      username: "john"
    }
    
    await api.post('/api/follow')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .expect(409)
    .set('Accept', 'application/json')
    .send(newFollow)
  })
  
  test('GET /api/follow - return post (201)', async () => {
    await api.get('/api/follow')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      expect(response.body.follow).toHaveLength(1)
    })  
  })
  
  test('DELETE /api/follow/john - delete (201)', async () => {
    await api.delete('/api/follow/john')
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'application/json')
    .expect(204)
    .then(response => {
      /* console.log(response.body) */
    })  
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
