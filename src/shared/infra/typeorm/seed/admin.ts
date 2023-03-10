import { createConnection } from "..";

import { v4 as uuidV4} from 'uuid'
import { hash } from 'bcryptjs'


async function create(){

    const connection = await createConnection('localhost')  

    const id = uuidV4()
    const password = await hash("admin", 8)

    await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rental.com.br', '${password}', true, 'now()', 'xxxxx')
    `)

    await connection.destroy()
}

create()
    .then(() => console.log("User admin created!"))