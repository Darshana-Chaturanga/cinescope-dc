import { db } from "@/lib/db";
import { NextResponse } from "next/server";

//our first GET API route
export const GET = async () => {
  try {
    const movies = await db
      .collection("movies")
      .find({})
      .sort({metacritic: -1})
      .limit(20)
      .toArray();
    return NextResponse.json(movies);
  } catch (error) {
    console.log("error fetching movies..", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
