import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);

// auth/[...all]/route.js - Designate for handling all auth routes
// this will handle all request to /api/auth/*
// and will be passed to the auth handler












