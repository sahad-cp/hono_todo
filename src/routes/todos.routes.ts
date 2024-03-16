import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const todoroute = new Hono();

const prisma = new PrismaClient();

todoroute.get("/allTodos", async (c) => {
  try {
    const todos = await prisma.todos.findMany()
    return c.json({
      data: todos,
    });
  } catch (error: any) {
    return c.newResponse(error.messsage, 400);
  }
});

todoroute.post('/createTodos', async (c) => {
    try {
        const data:any =await c.req.json();
        console.log(data);
        
        const newTodo = await prisma.todos.create({
            data:{
                text:data.text,
                userId:+data.userId,
            }
        })
        return c.json(newTodo)
    } catch (error:any) {
        return c.newResponse(error.messsage, 400);
    }
})

todoroute.put('/updateTodos/:id', async (c) => {
    try {
        const todoId = c.req.param("id");
        const data:any =await c.req.json();
        const todo = await prisma.todos.findUnique({
            where:{id:parseInt(todoId)}
        })
        if(!todo){
            return c.newResponse('todo not found', 404)
        }
        const updateTodo:any = await prisma.todos.update({
            where:{id:parseInt(todoId)},
            data:{
                text: data.text || todo.text,
                userId: data.userId || todo.userId
            }
        })
        return c.json({ data: updateTodo });
    } catch (error:any) {
        return c.newResponse(error.message, 400);
    }
})


todoroute.delete('/deleteTodo/:id',async (c)=>{
    try {
        const todoId = c.req.param('id')
        await prisma.todos.delete({
            where:{id:parseInt(todoId)},
        })
        return c.newResponse('Todo deleted successfully',200)

    } catch (error:any) {
        return c.newResponse(error.message, 400);
    }
})


export default todoroute;

