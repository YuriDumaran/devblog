import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab Notes | devblog',
};

const notes = [
  {
    title: '01 · Sensor fusion',
    detail: 'Mapping CO₂ spikes to lighting cues inside the studio.',
  },
  {
    title: '02 · Micro frontends',
    detail: 'Exploring module federation on top of static export for dashboards.',
  },
  {
    title: '03 · Narrative data viz',
    detail: 'Experiments with scrollytelling triggered by IntersectionObserver.',
  },
];

export default function LabNotesPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-4xl font-semibold text-white">Lab Notes</h1>
        <p className="text-slate-400">
          Short-form research entries that do not fit into the main blog feed yet.
        </p>
      </header>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.title} className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{note.title}</p>
            <p className="mt-2 text-slate-200">{note.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
