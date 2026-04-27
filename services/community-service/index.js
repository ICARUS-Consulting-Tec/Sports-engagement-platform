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
        const result = await pool.query(`
            DELETE FROM posts
            WHERE post_id = ${req.post_id}
            RETURNING 
                post_id, 
                category_id,
                title, 
                content, 
                views_count, 
                upvotes_count,
                created_at
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
            RETURNING
                post_id, 
                category_id, 
                title, 
                content, 
                views_count, 
                upvotes_count,
                created_at 
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

app.get("/get_post_comments", async (req, res) => {
    try {
        const {user_id, post_id} = req.query;
        const result = await pool.query(`
            SELECT 
                reply_id,
                content,
                upvotes_count,
                created_at
            FROM replies r
            WHERE r.post_id = ${post_id};
            AND r.user_id = ${user_id};
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
        const result = await pool.query(`
            DELETE FROM replies 
            WHERE reply_id = ${reply_id}
            RETURNING
               reply_id, 
               post_id, 
               content, 
               upvotes_count, 
               created_at 
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

app.patch("/edit_comment", async (req, res) => {
    try {
        const {
            reply_id, 
            new_content
        } = req.body;

        const result = await pool.query(`
            UPDATE replies
            SET content = ${new_content}
            WHERE reply_id = ${reply_id}
            RETURNING 
                reply_id, 
                post_id,    
                content, 
                upvotes_count
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

app.get("/user_posts", async (req, res) => {
    try{
        const { user_id } = req.query;

        const result = await pool.query(`
            SELECT *
            FROM posts  
            WHERE user_id = ${user_id}
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
                upvotes_count DESC;
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
})

app.listen(PORT, () => {
    console.log(`Community service running on port ${PORT}`);
});
