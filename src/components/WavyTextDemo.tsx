import { WavyBlock, WavyBlockItem } from "./ui/wavy-text-block";

const skills = [
  "React & TypeScript",
  "Smart Contracts",
  "AI / ML Agents",
  "Three.js & WebGL",
  "Robotics & MuJoCo",
  "Full-Stack Systems",
  "DeFi Protocols",
  "Real-Time Data",
];

export default function WavyTextDemo() {
  return (
    <section
      className="relative w-full py-32"
      style={{ background: "#050505" }}
    >
      <WavyBlock
        className="flex flex-col gap-4 py-24"
        offset={["start end", "end start"]}
      >
        {skills.map((skill, i) => (
          <WavyBlockItem
            key={skill}
            index={i}
            className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: i % 2 === 0 ? "#928466" : "rgba(255,255,255,0.15)",
            }}
          >
            {skill}
          </WavyBlockItem>
        ))}
      </WavyBlock>
    </section>
  );
}
