import Link from 'next/link';
import { InternalLink } from '@/lib/internal-links';

interface NearbyLinksProps {
  links: InternalLink[];
  title?: string;
  introText?: string;
}

export default function NearbyLinks({ links, title = "Auch in Ihrer Nähe", introText }: NearbyLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-slate-100 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            {title}
          </h3>
          
          {introText && (
            <p className="text-slate-600 mb-6">
              {introText}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                title={link.title}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
