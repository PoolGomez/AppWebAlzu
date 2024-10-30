"use client";

export const getFromLocalstorage = (key: string)=>{
    // return JSON.parse(localStorage.getItem(key) as string);
    // console.log("key: " + key);
    
    const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error);
      return null;
    }
  }
  return null;
}