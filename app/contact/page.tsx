import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | devblog',
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-4xl font-semibold text-white">Contact</h1>
        <p className="text-slate-400">Quick form for project ideas, speaking requests, or a simple hello.</p>
      </header>
      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="Ada Lovelace"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400" htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={4}
            className="rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="Let us build something delightful."
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-accent px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-300"
        >
          Send Note
        </button>
      </form>
    </section>
  );
}
