import { Hono } from "hono";
import todoroute from "./todos.routes";
import userRoutes from "./user.routes";

const apirooute = new Hono()

apirooute.route('/todos',todoroute)
apirooute.route('/user',userRoutes)

export default apirooute