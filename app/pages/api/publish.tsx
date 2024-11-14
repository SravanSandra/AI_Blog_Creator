import { db } from "@/db";
import { AIOutput } from "@/db/schema";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;

        const blog = await db.select().from(AIOutput).where(AIOutput.id.equals(id)).single();

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const slug = blog.formData.toLowerCase().replace(/ /g, "-").substring(0, 50);

        await db
            .update(AIOutput)
            .set({ isPublished: true, slug })
            .where(AIOutput.id.equals(id));

        res.status(200).json({ slug });
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
