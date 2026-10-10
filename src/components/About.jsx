
import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Database,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const expertise = [
  {
    number: "01",
    title: "Frontend",
    tech: "HTML · CSS · JavaScript · React · Tailwind CSS",
  },
  {
    number: "02",
    title: "Backend",
    tech: "Node.js · Express.js · REST APIs",
  },
  {
    number: "03",
    title: "Database",
    tech: "MongoDB · Data Management",
  },
  {
    number: "04",
    title: "Exploring",
    tech: "AI · Automation · LLMs · API Integration",
  },
];

const principles = [
  {
    icon: Code2,
    title: "Build with purpose",
    description: "Writing code to solve real problems.",
  },
  {
    icon: Layers3,
    title: "Design with clarity",
    description: "Creating interfaces that feel intuitive.",
  },
  {
    icon: BrainCircuit,
    title: "Keep evolving",
    description: "Learning new tools and better approaches.",
  },
];

const About = () => {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#050505] py-24 sm:py-32 lg:py-36"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-violet-600/[0.08] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-sm text-violet-400">01</span>
          <span className="h-px w-10 bg-violet-400/50" />
          <span className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            A little about me
          </span>
        </motion.div>

        {/* Introduction */}
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="mb-7 flex items-center gap-2 text-sm text-violet-300">
              <Sparkles size={15} aria-hidden="true" />
              <span>Developer · Creator · Lifelong learner</span>
            </div>

            <h2
              id="about-heading"
              className="max-w-3xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Hello, I'm Baskar.
              <span className="mt-2 block text-zinc-600 transition-colors duration-500 hover:text-violet-300">
                I turn ideas into digital experiences.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              I'm a Full-Stack Developer who enjoys building modern web
              applications, creating clean interfaces, and turning ideas into
              practical digital products. I care about the details behind
              useful, responsive, and user-friendly experiences.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
              Every project is an opportunity to learn something new, solve a
              challenge, and become a better developer.
            </p>

            <a
              href="#work"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-medium text-white"
            >
              Explore my work
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-violet-400/60 group-hover:bg-violet-400/10">
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </motion.div>

          {/* Skills — simple editorial list */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:pt-3"
          >
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">
                My technical toolkit
              </h3>
              <span className="font-mono text-xs text-zinc-600">
                2026 / NOW
              </span>
            </div>

            {expertise.map((item, index) => (
              <motion.div
                key={item.number}
                initial={reduceMotion ? false : { opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
                className="group border-t border-white/[0.10] py-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-violet-400/80">
                    {item.number}
                  </span>

                  <h4 className="text-lg font-medium text-zinc-200 transition-colors duration-300 group-hover:text-violet-300">
                    {item.title}
                  </h4>

                  <ArrowDownRight
                    size={15}
                    className="ml-auto text-zinc-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-violet-300"
                  />
                </div>

                <p className="pl-8 text-sm leading-7 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                  {item.tech}
                </p>
              </motion.div>
            ))}

            <div className="border-t border-white/[0.10]" />
          </motion.div>
        </div>

        {/* Personal approach */}
        <div className="mt-24 border-t border-white/[0.10] pt-10 sm:mt-32">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-violet-400">
                My approach
              </p>

              <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                How I approach my work.
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-zinc-500">
              A simple mindset: build thoughtfully, keep things clear, and
              improve with every project.
            </p>
          </motion.div>

          <div className="grid gap-9 sm:grid-cols-3 sm:gap-8">
            {principles.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.1,
                  }}
                  className="group"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <Icon
                      size={19}
                      strokeWidth={1.5}
                      className="text-violet-400 transition-transform duration-300 group-hover:-translate-y-1"
                    />
                    <span className="h-px w-8 bg-white/15 transition-all duration-300 group-hover:w-12 group-hover:bg-violet-400/60" />
                  </div>

                  <h4 className="text-lg font-medium text-zinc-200 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h4>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing divider */}
        <div className="mt-20 h-px bg-gradient-to-r from-violet-400/30 via-white/[0.08] to-transparent sm:mt-28" />
      </div>
    </section>
  );
};

export default About;

