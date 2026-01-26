interface ProcessStepsProps {
  steps: string[];
}

const stepIcons = ['📱', '📞', '📅', '🔧', '✅'];

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            So einfach funktioniert&apos;s
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            In nur wenigen Schritten zur reparierten Scheibe – unkompliziert und schnell.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Verbindungslinie */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg mb-4">
                    {stepIcons[index] || '📌'}
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 md:translate-x-2">
                    {index + 1}
                  </div>

                  {/* Step Text */}
                  <p className="text-slate-700 font-medium text-sm md:text-base leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
