/**
 * ArticleMeta Component
 * Displays E-E-A-T signals: last updated date and author attribution
 */

// Build date - consistent across all pages during a build
// Use env var if set, otherwise fall back to a fixed date
const BUILD_DATE = process.env.BUILD_DATE || '2026-01-28';

interface ArticleMetaProps {
  lastUpdated?: string;  // ISO date string (e.g. "2026-01-28")
  author?: string;
  showAuthor?: boolean;
}

// Format an ISO date string to German locale
function formatDateToGerman(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export default function ArticleMeta({ 
  lastUpdated, 
  author = 'Autoglas-Rocket Redaktion',
  showAuthor = true 
}: ArticleMetaProps) {
  // Use provided lastUpdated or fall back to BUILD_DATE
  const dateTimeValue = lastUpdated || BUILD_DATE;
  const displayDate = formatDateToGerman(dateTimeValue);
  
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 pb-4 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Aktualisiert: <time dateTime={dateTimeValue}>{displayDate}</time></span>
      </div>
      
      {showAuthor && (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Von <span className="font-medium text-slate-600">{author}</span></span>
        </div>
      )}
      
      <div className="flex items-center gap-2 ml-auto">
        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-green-600">Geprüfter Inhalt</span>
      </div>
    </div>
  );
}
