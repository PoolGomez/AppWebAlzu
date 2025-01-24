"use client";

import { useEffect } from "react";
import { Mesas } from "./Mesas";

export default function RealTimePage() {
    useEffect(() => {
        fetch("/api/socket");
      }, []);
    
  return (
    <div>
      <h1 className="text-2xl font-bold">Gestión de Mesas en Tiempo Real</h1>
      <Mesas />
    </div>
  )
}
