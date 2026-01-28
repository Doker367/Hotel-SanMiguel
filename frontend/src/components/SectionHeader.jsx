import { ScrollReveal } from './Animations.jsx';

export default function SectionHeader({ title, subtitle, light = false }) {
  return (
    <ScrollReveal className="text-center mb-16">
      <h2 className={`heading-2 mb-4 ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`text-sm tracking-wide max-w-xl mx-auto ${light ? 'text-white/70' : 'text-stone-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-12 h-px mx-auto mt-6 ${light ? 'bg-white/30' : 'bg-stone-300'}`} />
    </ScrollReveal>
  );
}
