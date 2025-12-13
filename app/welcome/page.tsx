import React from "react";
import One from "@/app/welcome/section/one";
import Two from "@/app/welcome/section/two";
import Three from "@/app/welcome/section/three";
import Four from "@/app/welcome/section/four";
import Five from "@/app/welcome/section/five";
import Six from "@/app/welcome/section/six";
import Seven from "@/app/welcome/section/seven";
import Eight from "@/app/welcome/section/eight";
import Nine from "@/app/welcome/section/nine";
import Ten from "@/app/welcome/section/ten";
import Eleven from "@/app/welcome/section/eleven";
import Twelve from "@/app/welcome/section/twelve";

export default function LandingPage() {
  return (
    <main className="w-full bg-white min-h-screen text-white overflow-x-hidden">
      <One />
      {/* <Two /> */}
      <Four />
      <Six />
      {/* <Three /> */}
      <Seven />
      {/* <Eight /> */}
      {/* <Nine /> */}
      {/* <Ten /> */}
      {/* <Eleven /> */}
      <Twelve />

      <Five />
    </main>
  );
}