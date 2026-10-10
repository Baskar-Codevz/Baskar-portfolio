
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Creating APIs and handling application data.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Authentication",
    ],
  },
  {
    number: "03",
    title: "Tools & Workflow",
    description: "Tools I use to develop, manage and deploy projects.",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "NPM"],
  },
  {
    number: "04",
    title: "Exploring Next",
    description: "Expanding my skills with AI-powered technologies.",
    skills: ["AI", "AI Automation", "LLMs", "API Integration"],
  },
];

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#050505] py-24 sm:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full bg-violet-600/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="text-sm font-medium text-violet-400">03</span>
          <span className="h-px w-10 bg-violet-400/50" />
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Skills & tools
          </p>
        </motion.div>

        {/* Heading */}
        <div className="mb-20 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-4xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            The tools behind
            <span className="block text-zinc-600">
              what I create.
            </span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md text-base leading-8 text-zinc-500 md:justify-self-end"
          >
            My toolkit for turning ideas into functional digital experiences,
            from crafting the interface to connecting the backend.
          </motion.p>
        </div>

        {/* Minimal skill list — no cards */}
        <div>
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.number}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.08,
              }}
              className="group grid gap-5 border-t border-white/[0.10] py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-10"
            >
              {/* Category */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs tabular-nums text-violet-400/80">
                    {group.number}
                  </span>
                  <span className="h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-10 group-hover:bg-violet-400" />
                </div>

                <h3 className="text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-violet-300 sm:text-2xl">
                  {group.title}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
                  {group.description}
                </p>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap content-start gap-x-2 gap-y-3 md:pt-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 8 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: shouldReduceMotion
                        ? 0
                        : index * 0.06 + skillIndex * 0.035,
                    }}
                    className="group/skill inline-flex cursor-default items-center gap-1.5 border-b border-transparent py-1.5 text-sm text-zinc-400 transition-all duration-300 hover:border-violet-400/70 hover:text-white sm:text-base"
                  >
                    {skill}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-y-0.5 transition-all duration-300 group-hover/skill:translate-x-0.5 group-hover/skill:-translate-y-1 group-hover/skill:opacity-100"
                    />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="border-t border-white/[0.10]" />
        </div>

        {/* Bottom note */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-xs leading-6 text-zinc-600"
        >
          Always learning. Always building. Always improving.
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;

