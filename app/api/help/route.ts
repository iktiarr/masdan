import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("--- DEBUG START ---");
    console.log("Token Loaded:", token ? "YA" : "TIDAK (Cek .env.local)");
    console.log("Chat ID Loaded:", chatId ? "YA" : "TIDAK (Cek .env.local)");

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Token/ID Kosong' }, { status: 500 });
    }

    const text = `
LAPORAN BANTUAN – MASDAN.VERCEL.APP

Nama Pengirim : ${name}
Email         : ${email}
Subjek        : ${subject}

Isi Pesan:
${message}

Mohon segera ditinjau dan ditindaklanjuti.
Terima kasih.
`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    console.log("Respon Telegram:", result);
    console.log("--- DEBUG END ---");
    // ---------------------------------

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.description }, { status: 500 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}