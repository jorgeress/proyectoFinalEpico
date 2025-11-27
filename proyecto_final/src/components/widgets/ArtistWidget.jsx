"use client";

import { useEffect } from "react";

async function getArtists(query){
const response = await fetch(
  `https://api.spotify.com/v1/search?type=artist&q=${query}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
)

const artist = response.json();
console.log(artist)
return artist;


}