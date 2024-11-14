// pages/api/getBlogBySlug.ts

import { db } from "@utils/db"; 
import { AIOutput } from "@utils/db/schema";

export default async function handler(req, res) {
    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({ error: "Slug is required" });
    }

    try {
        const blog = await db.select().from(AIOutput).where(AIOutput.slug.equals(slug)).single();

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
