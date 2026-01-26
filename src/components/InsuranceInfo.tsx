import Card, { CardBody } from './ui/Card';

interface InsuranceInfoProps {
  insuranceText: string;
}

export default function InsuranceInfo({ insuranceText }: InsuranceInfoProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Kostenübernahme durch Ihre Versicherung
              </h2>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {insuranceText}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Teilkaskoversicherung</h3>
                    <p className="text-slate-600 text-sm">Glasschäden sind standardmäßig abgedeckt.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Nur Selbstbeteiligung laut Vertrag</h3>
                    <p className="text-slate-600 text-sm">Beim Scheibenwechsel zahlen Sie nur Ihre vereinbarte SB.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Direkte Abrechnung</h3>
                    <p className="text-slate-600 text-sm">Wir rechnen für Sie direkt mit der Versicherung ab.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Card */}
            <Card variant="glass" className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-100">
              <CardBody className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Versicherung übernimmt
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Scheibenwechsel mit Teilkasko* abgedeckt
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                      <span className="text-2xl font-bold text-orange-500">1-2</span>
                      <span className="text-slate-600 text-sm ml-1">Stunden</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                      <span className="text-2xl font-bold text-orange-500">100%</span>
                      <span className="text-slate-600 text-sm ml-1">Mobil</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
