interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  height?: string;
}

export default function PageHero({ title, subtitle, image, height = 'h-[50vh]' }: PageHeroProps) {
  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-nero/70" />
      <div className="relative z-10 text-center px-6">
        {subtitle && (
          <p className="font-sans text-xs tracking-widest uppercase text-oro mb-4">{subtitle}</p>
        )}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white">{title}</h1>
        <div className="w-12 h-px bg-oro mx-auto mt-6" />
      </div>
    </section>
  );
}
