import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const userRoutes = new Hono();
const prisma = new PrismaClient();

userRoutes.get('/allUsers',async(c)=>{
    try {
        const users = await prisma.user.findMany()
        return c.json({
            data:users
        })
    } catch (error:any) {
        return c.newResponse(error.messsage, 400);
    }
})

userRoutes.post('/createUser',async(c)=>{
    try {
        const data:any = await c.req.json();
        const newUser = await prisma.user.create({
            data:{
                email:data.email,
                name:data.name
            }
        })
        return c.json({data:newUser})
    } catch (error:any) {
        return c.newResponse(error.messsage, 400);
    }
})


userRoutes.put('/updateUser/:id',async(c)=>{
    try {
        const userId = c.req.param('id')
        const data:any = await c.req.json();
        const user = await prisma.user.findUnique({
            where:{id:parseInt(userId)},
        });
        if(!user){
            return c.newResponse('User not found',404)
        }
        const updateUser = await prisma.user.update({
            where:{id:parseInt(userId)},
            data:{
                email:data.email || user.email,
                name: data.name || user.name
            },
        })
        return c.json({data:updateUser})
    } catch (error:any) {
        return c.newResponse(error.message, 400);
    }
})

userRoutes.delete('/deleteUser/:id',async(c)=>{
    try {
        const userId = c.req.param('id')
        const user = await prisma.user.findUnique({
            where:{id:parseInt(userId)}
        })
        if(!user){
            return c.newResponse('User not found', 404);
        }
        await prisma.user.delete({
            where:{id:parseInt(userId)}
        })
        return c.newResponse('User deleted successfully', 200);
    } catch (error:any) {
        return c.newResponse(error.message, 400);
    }
})

export default userRoutes