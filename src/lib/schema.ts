import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
})

const registerDeviceSchema = z.object({
  name: z.string().min(1),
  viewType: z.enum(["none", "chart", "photo"]),
  bucket: z.string()
})

const editDeviceSchema = z.object({
  status: z.enum(['Active', 'Inactive']),
  threshold: z.string()
})

export { 
  signInSchema, signUpSchema,
  registerDeviceSchema, editDeviceSchema
}
