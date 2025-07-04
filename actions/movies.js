"use server";

import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

//get all movie action
export const getMovies = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok..");
    }

    if (response.status == 200) {
      return await response.json();
    } else {
      console.log("No movies found!");
      return undefined;
    }
  } catch (error) {
    console.log("Error fetching movies : ", error);
    return undefined;
  }
};

// create movie action
export const createMovie = async(movie) => {
  try {
    const result = await db.collection("movies_n").insertOne(movie);
    if(result.acknowledged){
      console.log(`A movie was inserted with the _id: ${result.insertedId}`);
      return {
        success: true,
        message: "Movie created successfully"
      };
    }else{
      return undefined;
    }
  } 
  catch{
    console.log("Mongodb insert failed");
  }
}


// Update movie action
export const updateMovie = async (movieId, movieDoc) => {
  try {
    const result = await db
      .collection("movies_n")
      .updateOne(
        { _id: ObjectId.createFromHexString(movieId) },
        { $set: movieDoc },
        { upsert: true }
      );

    if (result.acknowledged) {
      console.log(`A movie was inserted with the _id: ${result.insertedId}`);
      return {
        success: true,
        message: "Movie updated successfully!",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("Mongodb update failed!");
  }
};

// Delete movie action
export const deleteMovie = async (movieId) => {
  try {
    const result = await db
      .collection("movies_n")
      .deleteOne({ _id: ObjectId.createFromHexString(movieId) });

    if (result.acknowledged) {
      console.log(`A movie was deleted with the _id: ${result.insertedId}`);
      return {
        success: true,
        message: "Movie deleted successfully!",
      };
    } else {
      return undefined;
    }
  } catch {
    console.log("Mongodb delete failed!");
  }
};
