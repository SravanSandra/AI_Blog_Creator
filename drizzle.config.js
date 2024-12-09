/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-blog-maker_owner:2HGrPqkTy5SE@ep-damp-dew-a8fqv0cy.eastus2.azure.neon.tech/ai-blog-maker?sslmode=require',
    }
  };
  