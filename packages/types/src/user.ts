import { z } from "zod/v4";

// Define the schema for a user object
export const UserSchema = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

// User type
export type User = z.infer<typeof UserSchema>;
