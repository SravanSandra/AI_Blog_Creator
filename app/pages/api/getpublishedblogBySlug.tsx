// pages/api/getPublishedBlogs.ts

import { db } from "@utils/db"; 
import { AIOutput } from "@utils/db/schema";

export default async function handler(req, res) {
    try {
        const blogs = await db.select().from(AIOutput).where(AIOutput.isPublished.equals(true));

        if (blogs.length === 0) {
            return res.status(404).json({ error: "No published blogs found" });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
