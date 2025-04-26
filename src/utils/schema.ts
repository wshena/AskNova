"use client"

import { z } from "zod"

export const authFormSchema = () => {
  return z.object({
    email: z.string().email(),
    password: z.string().min(3),
  })
}
