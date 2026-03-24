"use client"

import Link from "next/link";
import { Button } from "primereact/button";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Welcome to Hornez</h1>
        <Link href="/login">
          <Button label="Login" className="p-button-rounded p-button-success" />
        </Link>
      </main>
    </>
  );
}
