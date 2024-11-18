"use server"

import { redirect } from "next/navigation"

async function signupRedirect () {
  redirect("/signin")
}

async function signInRedirect () {
  redirect("/user")
}

async function signOutRedirect () {
  redirect("/")
}

export {
  signupRedirect,
  signInRedirect,
  signOutRedirect
}
