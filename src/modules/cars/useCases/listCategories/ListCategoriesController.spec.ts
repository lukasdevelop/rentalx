import request from 'supertest'

import { app } from '@shared/infra/http/app'
import {createConnection } from '@shared/infra/typeorm'
import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

let connection

describe("List Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection('localhost')
        await connection.runMigrations()

        const id = uuid()

        const password = await hash("admin", 8)

        await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rental.com.br', '${password}', true, 'now()', 'xxxxx')
    `)
    })

    afterAll(async () => {
       await connection.dropDatabase()
        await connection.destroy()
    })

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: "admin@rental.com.br",
            password: 'admin'
        })

        const { token } = responseToken.body

        await request(app).post("/categories").send({
            name: 'Cat supetest',
            description: 'cat supertest'
        }).set({
            Authorization: `Bearer ${token}`
        })

        const response = await request(app).get('/categories')

        console.log(response.body)

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0].name).toEqual("Cat supetest")
    })

})