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
        
        const result = await pool.query(`
            INSERT INTO posts (
                user_id, 
                category_id, 
                title, 
                content
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

app.delete("/delete_post", async (req, res) => {
    try{
        const { post_id } = req.body;

        if (!post_id) {
            return res.status(400).json({
                success: false,
                message: "post_id is required"
            });
        }

        const result = await pool.query(`
            DELETE FROM posts
            WHERE post_id = $1
            RETURNING 
                post_id, 
                category_id,
                title, 
                content, 
                views_count, 
                upvotes_count,
                created_at
        `, [post_id]);

        res.status(200).json({
            success: true,
            result: result.rows
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message         
        });
    }
});

app.patch("/edit_post", async (req, res) => {
    try {
        const {
            post_id ,
            new_category_name,
            new_title,
            new_content
        } = req.body;

        if (!post_id) {
            return res.status(400).json({
                success: false,
                message: "post_id is required"
            });
        }

        const result = await pool.query(`
            UPDATE posts p
            SET
                title = COALESCE($1, p.title),
                content = COALESCE($2, p.content),
                category_id = COALESCE(c.category_id, p.category_id)
            FROM categories c
            WHERE c.name = $3
              AND p.post_id = $4
            RETURNING
                p.post_id,
                p.category_id,
                p.title,
                p.content,
                p.views_count,
                p.upvotes_count,
                p.created_at
        `, [
            new_title ?? null,
            new_content ?? null,
            new_category_name ?? null,
            post_id
        ]);

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

app.get("/get_post_comments", async (req, res) => {
    try {
        const { post_id } = req.query;
        
        if (!post_id) {
            return res.status(400).json({
                success: false,
                message: "post_id is required"
            });
        }

        const result = await pool.query(`
            SELECT
                reply_id,
                content,
                upvotes_count,
                created_at
            FROM replies r
            WHERE r.post_id = $1
        `, [post_id]);

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

app.post("/create_comment", async (req, res) => {
    try {
        const {
            post_id, 
            user_id, 
            content
        } = req.body;

        const result = await pool.query(`
            INSERT INTO replies (
                post_id, 
                user_id, 
                content
            )
            VALUES ($1, $2, $3) 
            RETURNING
                reply_id, 
                post_id, 
                content, 
                upvotes_count,
                created_at
        `, [
            post_id,
            user_id,
            content
        ]);

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

app.delete("/delete_reply", async (req, res) => {
    try {
        const {reply_id} = req.body;
        if (!reply_id) {
            return res.status(400).json({
                success: false,
                message: "reply_id is required"
            });
        }

        const result = await pool.query(`
            DELETE FROM replies
            WHERE reply_id = $1
            RETURNING
               reply_id,
               post_id,
               content,
               upvotes_count,
               created_at
        `, [reply_id]);
        
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

app.patch("/edit_comment", async (req, res) => {
    try {
        const {
            reply_id, 
            new_content
        } = req.body;

        if (!reply_id || !new_content) {
            return res.status(400).json({
                success: false,
                message: "reply_id and new_content are required"
            });
        }

        const result = await pool.query(`
            UPDATE replies
            SET content = $1
            WHERE reply_id = $2
            RETURNING
                reply_id,
                post_id,
                content,
                upvotes_count
        `, [new_content, reply_id]);

        res.status(200).json({
            success: true, 
            result: result.rows
        });

    } catch(error) {
        res.status(500).json({
            success: false, 
            error: error.message
        });
    }
});

app.get("/user_posts", async (req, res) => {
    try{
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "user_id is required"
            });
        }

        const result = await pool.query(`
            SELECT *
            FROM posts
            WHERE user_id = $1
        `, [user_id]);

        res.status(200).json({
            success: true, 
            result: result.rows
        });

    } catch(error) {
        res.status(500).json({
            success: false, 
            error: error.message
        });
    }
});

app.get("/top_contributors", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                user_id, 
                count(*) as post_count
            FROM posts
            GROUP BY user_id 
            ORDER BY post_count DESC
        `);

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

app.get("/fan_of_week", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                user_id, 
                COUNT(p.content) as post_count,
                SUM(p.upvotes_count) as upvotes_count
            FROM posts p 
            GROUP BY p.user_id 
            ORDER BY 
                post_count DESC, 
                upvotes_count DESC
            LIMIT 1;
        `);

        res.status(200).json({
            success: true,
            result: result.rows
        });

    } catch(error) {
        res.status(500).json({
            success: false, 
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Community service running on port ${PORT}`);
});
