const request = require("supertest");
const {User, Fruit} = require("./models/index");
const db = require("./db/connection");
const app = require('./src/app');
const { seedFruits, seedUsers } = require("./seedData");

beforeAll(async()=>{
    await db.sync({force: true});
    await Fruit.bulkCreate(seedFruits);
    await User.bulkCreate(seedUsers);
})

describe('User Router', ()=>{
    describe('/GET', ()=>{
        it('succesfully gets users', async()=>{
            const users = await User.findAll();
            const response = await request(app).get('/users')
        
            expect(response.statusCode).toBe(200)
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(users))
        })
        it('succesfully gets a user', async()=>{
            const user = await User.findByPk(1);
            const response = await request(app).get('/users/1')
        
            expect(response.statusCode).toBe(200)
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(user))
        })
    })

    describe('./POST', ()=>{
        it('succesfully posts users', async()=>{
            
            const response = await request(app)
            .post('/users')
            .send({
                "name":"Friend",
                "age":20
            })
        
            expect(response.statusCode).toBe(200)
            expect(response.body.name).toBe("Friend")
        })
    })

    describe('./PUT', ()=>{
        it('succesfully updates a user', async()=>{
            
            const response = await request(app)
            .put('/users/1')
            .send({
                "name":"Friendo",
                "age":21
            })
            const updatedUser = await User.findByPk(1)
            expect(response.statusCode).toBe(200)
            expect(updatedUser.name).toBe("Friendo")
        })
    })

    describe('./DELETE', ()=>{
        it('succesfully de;etes a user', async()=>{
            const condemnedUser = await User.findByPk(1)
            const response = await request(app)
            .delete('/users/1')
            const ghost = await User.findByPk(1);

            expect(response.statusCode).toBe(200)
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(condemnedUser))
            expect(ghost).toBe(null)
        })
    })
})