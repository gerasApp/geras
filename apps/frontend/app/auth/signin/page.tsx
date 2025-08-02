"use client"; // FIX RÁPIDO PARA QUE NO ROMPA EL BUILD, PERO CREO QUE CUANDO LO USEMOS VA A HABER QUE CAMBIARLO
import React from "react";
import { signIn, getProviders } from "next-auth/react";

// TODO: ACA IRIA EL FORMULARIO PARA LOGUEARSE - TODAVIA SIGUE INCOMPLETO
// A FUTURO EDITAR LOS BOTONES DE LOGUEO CON EL FORMATO CORRESPONDIENTE

export default async function SignInPage() {
  const providers = await getProviders();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
      }}
    >
      <button
        onClick={() => signIn(providers?.google.id)}
        style={{
          padding: "12px 24px",
          marginBottom: 16,
          borderRadius: 6,
          border: "none",
          background: "#4285F4",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer",
          width: 250,
        }}
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn(providers?.github.id)}
        style={{
          padding: "12px 24px",
          borderRadius: 6,
          border: "none",
          background: "#333",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer",
          width: 250,
        }}
      >
        Sign in with Github
      </button>
    </div>
  );
}
