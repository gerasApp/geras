import { z } from "zod/v4";

// Define the schema for a user object
export const UserSchema = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  image: z.string().optional(),
});

// User type
export type User = z.infer<typeof UserSchema>;
