import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
    id: serial('id').primaryKey(),
    formData: varchar('formData'),
    aiResponse: text('aiResponse'),
    templateSlug: varchar('templateSlug'),
    createdBy: varchar('createdBy'),
    createdAt: varchar('createdAt'),
});


export const UserSubscription=pgTable('userSubscription',{
    id:serial('id').primaryKey(),
    email:varchar('email'),
    userName:varchar('userName'),
    active:boolean('active'),
    paymentId:varchar('paymentId'),
    joinDate:varchar('joinData')
})

export const posts = pgTable("posts", {
  id: integer("id").primaryKey().autoIncrement(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  comments: array(text("comments")).default([]),
  createdAt: timestamp("created_at").defaultNow(),
});
