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

afterAll(async()=>{
    await db.sync({force:true})
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
        });

        it("returns an error if a user does not have a name", async()=>{
            const response = await request(app)
            .post('/users')
            .send({
                "name":""
            })
            const errors = JSON.parse(response.text)
            console.log(JSON.parse(response.text))
            expect(response.statusCode).toBe(200)
            expect(errors.error[0].msg).toBe('Invalid value')
            
          
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

describe('Fruit Router', ()=>{
    describe('/GET', ()=>{
        it('succesfully gets fruit', async()=>{
            const fruits = await Fruit.findAll();
            const response = await request(app).get('/fruits')
        
            expect(response.statusCode).toBe(200)
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(fruits))
        })

        it('succesfully gets a fruit', async()=>{
            const fruit = await Fruit.findByPk(1);
            const response = await request(app).get('/fruits/1')
        
            expect(response.statusCode).toBe(200)
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(fruit))
        })
    })

    describe('./POST', ()=>{
        it('succesfully posts fruits', async()=>{
            
            const response = await request(app)
            .post('/fruits')
            .send({
                "name":"Mango",
                "color":"yellow/orange/green"
            })
        
            expect(response.statusCode).toBe(200)
            expect(response.body.name).toBe("Mango")
        })

        it("returns an error if a fruit does not have a color", async()=>{
            const response = await request(app)
            .post('/fruits')
            .send({
                "name":"Mango",
                "color": ""
            })
            const errors = JSON.parse(response.text)
            console.log(JSON.parse(response.text))
            expect(response.statusCode).toBe(200)
            expect(errors.error[0].msg).toBe('Invalid value')
            
          
        })
    })

    describe('./PUT', ()=>{
        it('succesfully updates a fruit', async()=>{
            
            const response = await request(app)
            .put('/fruits/1')
            .send({
                "name":"Guava",
                "color":"green"
            })
            const updatedFruit = await Fruit.findByPk(1)
            expect(response.statusCode).toBe(200)
            expect(updatedFruit.name).toBe("Guava")
        })
    })

    describe('./DELETE', ()=>{
        it('succesfully deletes a fruit', async()=>{
            const condemnedFruit = await Fruit.findByPk(1)
            const response = await request(app)
            .delete('/fruits/1')
            const ghost = await Fruit.findByPk(1);

            expect(response.statusCode).toBe(200)
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(condemnedFruit))
            expect(ghost).toBe(null)
        })
    })
})