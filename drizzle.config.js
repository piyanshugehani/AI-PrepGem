/** @type { import("drizzle-kit").Config } */
export default {
    dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
    schema: "./utils/schema.js",
    out: "./drizzle",
    dbCredentials:{
      url:'postgresql://ai-interview-mocker_owner:Le6Z4VipvFwN@ep-icy-waterfall-a1fo4zwn.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require'
    }
  };