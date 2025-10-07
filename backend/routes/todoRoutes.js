import express from "express";
import Todo from "../models/todo.js";
const router = express.Router();
router.get("/", async (req, res) => {
    const todos =await Todo.find();
    res.json(todos);
});

router.post("/", async (req, res) => {
    const {title}=req.body;
    const todo=new Todo({title:title});
    await todo.save();
    res.json(todo);
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    // Update title if provided
    if (req.body.title !== undefined) todo.title = req.body.title;

 

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
});
export default router;