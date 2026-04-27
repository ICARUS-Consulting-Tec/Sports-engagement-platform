const express = require("express");
const { pool } = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4001;

app.get("/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() AS now");
        res.status(200).json({
            service: "community-service",
            status: "disconnected",
            db: "connected",
            time: result.rows[0].now
        });
    } catch(error) {
        res.status(500).json({
            service: "community-service",
            status: "error",
            db: "disconnected",
            error: error.message
        });
    }
});

//basic posts CRUD
//CREATE post
app.post("/new_post", async (req, res) => {
    try {
        const {
            user_id,
            category_id, 
            title, 
            content
        } = req.body;

        if (!title || !content || !category_id) {
            return res.status(400).json({
                success: false, 
                message: "Post title, content and category are ALL required"
            });
        }
        
        const result = pool.query(`
            INSERT INTO posts (
                user_id, 
                category_id, 
                title, 
                content, 
            )
            values ($1, $2, $3, $4)
            RETURNING
                user_id,
                category_id,
                title,
                content, 
                views_count, 
                upvotes_count,
                created_at
        `, [
            user_id,
            category_id,
            title, 
            content
        ]);

        res.status(201).json({
            success: true,
            result: result.rows[0]
        });

    } catch(error) {
        res.status(500).json({
            success: false, 
            error: error.message
        });
    }
});

//READ posts
app.get("/get_posts", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM posts
            ORDER BY created_at
        `);

        res.status(200).json({
            success: true,
            result: result.rows,
        });
    } catch(error) {
        res.status(500).json({
            success: false, 
            error: error.message
        });
    }
});

//DELETE posts
app.delete("/delete_post", async (req, res) => {
    try{
        const result = await pool.query(`
            DELETE FROM posts
            WHERE post_id = ${req.post_id}
        `);

        res.status(200).json({
            success: true,
            result: result.rows
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message         
        });
    }
});

//UPDATE post
app.patch("/edit_post", async (req, res) => {
    try {
        const {
            post_id ,
            user_id,
            new_category_name,
            new_title,
            new_content
        } = req.body;

        const result = await pool.query(`
            UPDATE posts 
            SET 
                title = ${new_title},
                content = ${new_content},
                category_id = c.category_id
            FROM categories c 
            WHERE c."name" = ${new_category_name}
            AND post_id = ${post_id} 
            AND user_id = ${user_id}
        `)

        res.status(200).json({
            success: true,
            result: result.rows
        });

    } catch (error) {
        res.status(500).json({
            success: false, 
            error: error.message
        });
    }
});

//TODO: CRUD comments
//TODO: special endpoints: filter by user_id, top contributors by posts quantity

app.listen(PORT, () => {
    console.log(`Community service running on port ${PORT}`);
});
