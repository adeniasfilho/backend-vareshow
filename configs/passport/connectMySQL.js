import { createConnection } from "mysql";
const connection = conn = createConnection({
    host: "localhost",
    user: "vareshow",
    password: "vareshow123",
    database: "vareshow"
});
connection.connect();

export default connectMySQL;