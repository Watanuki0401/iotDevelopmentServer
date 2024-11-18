import { type DefaultSession } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
  }
}
