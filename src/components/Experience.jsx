
import React from "react";
import { ArrowUpRight, BriefcaseBusiness, Code2 } from "lucide-react";
import { motion } from "motion/react";

const experiences = [
  {
    number: "01",
    type: "Client Project",
    title: "Freelance Web Development",
    organization: "YAMA FLYS",
    period: "Client Project",
    description:
      "Designed and developed a bangle ecommerce website to help customers explore products and collections and submit their order enquiries.",
    highlights: [
      "Built the frontend using React and Tailwind CSS.",
      "Created product browsing and collection interfaces.",
      "Developed the website around the client's order enquiry requirements.",
    ],
    icon: BriefcaseBusiness,
  },
  {
    number: "02",
    type: "Personal Project",
    title: "Full-Stack Development",
    organization: "Restro",
    period: "Personal Project",
    description:
      "Built a restaurant website to practise modern frontend development, responsive layouts, and interface animations.",
    highlights: [
      "Developed reusable React components.",
      "Created responsive layouts with Tailwind CSS.",
      "Used Motion to add interface animations.",
    ],
    icon: Code2,
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="border-t border-white/10 bg-[#050505] py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 flex items-center gap-4">
          <span className="text-sm text-violet-400">04</span>

          <div className="h-px w-10 bg-white/20" />

          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
            Experience & Journey
          </p>
        </div>

        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Building experience,
            <span className="text-zinc-500"> one project at a time.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-500">
            My journey into web development through real client work,
            hands-on projects, and continuous learning.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((experience) => {
            const Icon = experience.icon;

            return (
              <motion.article
                key={experience.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-violet-400/30 sm:p-8 lg:p-10"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
                  {/* Left Side */}
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 p-3">
                        <Icon
                          size={22}
                          className="text-violet-400"
                        />
                      </div>

                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {experience.type}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-white">
                      {experience.title}
                    </h3>

                    <p className="mt-2 text-sm text-violet-300">
                      {experience.organization}
                    </p>

                    <p className="mt-3 text-sm text-zinc-600">
                      {experience.period}
                    </p>
                  </div>

                  {/* Right Side */}
                  <div>
                    <p className="leading-7 text-zinc-400">
                      {experience.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {experience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-sm leading-6 text-zinc-500"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {experience.organization === "Restro" && (
                      <a
                        href="https://github.com/Baskar-Codevz/restro-project"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm text-white transition hover:text-violet-300"
                      >
                        View source code
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

