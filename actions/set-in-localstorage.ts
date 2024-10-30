"use client";

export const setInLocalstorage = (key: string, value: any)=>{
    console.log("key: " + key);
    console.log("value: " + value);
    

    return localStorage.setItem(key, JSON.stringify(value));
}