"use client";

import { useState } from "react";
import WSelect from "@/components/ui/WSelect";
import { Apple, Fan, Laptop, Smartphone, Rocket, Blocks } from "lucide-react";

export default function Home() {
  const [selected, setSelected] = useState(""); // <-- 1. Track selected value

  return (
    <div className="min-h-screen bg-empty p-6 flex flex-col gap-6 text-fg-primary">
      <label className="text-label-s text-fg-primary">Select an object</label>

      <div className="w-full max-w-[500px]">
        <WSelect
          placeholder="Placeholder"
          placeholderIcon={<Blocks className="text-icon w-4 h-4" />}
          groups={[
            {
              items: [
                {
                  value: "apple",
                  label: "Apple",
                  description: "Some sort of fruit company",
                  icon: <Apple className="w-5 h-5" />,
                },
                {
                  value: "fan",
                  label: "Fan",
                  description: "When you really love someone",
                  icon: <Fan className="w-5 h-5" />,
                },
              ],
            },
            {
              label: "Technology",
              items: [
                {
                  value: "laptop",
                  label: "Laptop",
                  description: "Where great ideas are built",
                  icon: <Laptop className="w-5 h-5" />,
                },
                {
                  value: "smartphone",
                  label: "Smartphone",
                  description: "Where B2C thrives",
                  icon: <Smartphone className="w-5 h-5" />,
                },
              ],
            },
            {
              label: "Aspirations",
              items: [
                {
                  value: "space",
                  label: "Space travel",
                  description: "Reaching for the stars",
                  icon: <Rocket className="w-5 h-5" />,
                },
              ],
            },
          ]}
          value={selected}               // <-- 2. Pass selected value
          onChange={(val) => setSelected(val)} // <-- 3. Update on change
        />
      </div>
    </div>
  );
}
