import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  email?: string;
  phone: string;
  vehicle?: string;
  damageType: string;
  message?: string;
  insurance: boolean;
  consent: boolean;
  source: string;
  cityName?: string;
  serviceName?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validierung
    if (!data.name || !data.phone || !data.damageType || !data.consent) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 }
      );
    }

    // Hier würde normalerweise die Lead-Verarbeitung stattfinden:
    // - Speichern in Datenbank
    // - E-Mail-Benachrichtigung senden
    // - CRM-Integration
    // - etc.

    console.log('Neuer Lead:', {
      ...data,
      // Telefonnummer für Logs maskieren
      phone: data.phone.replace(/\d(?=\d{4})/g, '*')
    });

    // Simulierte Verarbeitung
    // In Produktion: await saveToDatabase(data);
    // In Produktion: await sendNotificationEmail(data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead erfolgreich übermittelt',
        leadId: `LEAD-${Date.now()}`
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Lead API Error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
