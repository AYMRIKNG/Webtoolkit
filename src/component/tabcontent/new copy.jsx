import { Section } from "lucide-react";
import React from "react";

export default function CategoryPage ({category}){


  return (
  <section>
    <h1 className="text-white">{category}</h1>
  </section>
  );
}