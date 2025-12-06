import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // --- DEBUGGING (Cek di Terminal) ---
    console.log("--- DEBUG START ---");
    console.log("Token Loaded:", token ? "YA" : "TIDAK (Cek .env.local)");
    console.log("Chat ID Loaded:", chatId ? "YA" : "TIDAK (Cek .env.local)");
    // ----------------------------------

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Token/ID Kosong' }, { status: 500 });
    }

    const text = `
Laporan Bantuan Baru 📩:
Dari: ${name}
Email: ${email}
Subjek: ${subject}
Pesan: ${message}
Saya mohon untuk segera diperiksa dan cepat diperbaiki
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
    
    // --- LIHAT ERROR ASLI TELEGRAM ---
    console.log("Respon Telegram:", result);
    console.log("--- DEBUG END ---");
    // ---------------------------------

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      // Kembalikan error asli ke frontend biar ketahuan
      return NextResponse.json({ error: result.description }, { status: 500 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}