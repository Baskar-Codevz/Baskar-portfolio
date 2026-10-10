
import React, { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Website Development",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Project enquiry from ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Service: ${form.service}\n\n` +
      `Project details:\n${form.message}`
    );

    window.location.href =
      `mailto:baskar.codevz@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-400/60";

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-[#050505] py-28 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <div className="mb-16 flex items-center gap-4">
          <span className="text-sm text-violet-400">07</span>
          <div className="h-px w-10 bg-white/20" />
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
            Contact
          </p>
        </div>

        {/* Main */}
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* Left */}
          <div>
            <h2 className="text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              Have an idea?
              <br />
              <span className="text-zinc-500">Let's build it.</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-500">
              Tell me about your project, website, or business idea.
              Let's discuss how I can help bring it to life.
            </p>

            <a
              href="mailto:baskar.codevz@gmail.com"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-violet-400"
            >
              <Mail size={18} />
              Email me directly
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            {/* Contact details */}
            <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Email
                </p>
                <a
                  href="mailto:baskar.codevz@gmail.com"
                  className="mt-3 block break-all text-sm text-zinc-300 hover:text-white"
                >
                  baskar.codevz@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Location
                </p>
                <p className="mt-3 text-sm text-zinc-300">
                  Tamil Nadu, India
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Availability
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Open to opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-white">
                Tell me about your project
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Share a few details to get the conversation started.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm text-zinc-300"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm text-zinc-300"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-service"
                  className="text-sm text-zinc-300"
                >
                  What do you need?
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Website Development</option>
                  <option>Ecommerce Website</option>
                  <option>Responsive Web Design</option>
                  <option>Website Improvements</option>
                  <option>Other Project</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm text-zinc-300"
                >
                  Project details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you planning to build?"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-4 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                <Send size={16} />
                Send project enquiry
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              {submitted && (
                <p
                  role="status"
                  className="flex items-start gap-2 text-sm text-violet-300"
                >
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                  Your email app should open with your enquiry. Send the
                  email there to complete the submission.
                </p>
              )}

              <p className="text-center text-xs leading-5 text-zinc-600">
                Submitting opens your email app. Your message is not
                sent automatically by this website.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

