import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, message, job } = body;

    // --- DEBUG: Cek Data Masuk ---
    console.log("1. Data diterima di Server:", { name, rating });

    // 1. Ambil Token
    const BOT_TOKEN = process.env.TELEGRAM_RATING_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_RATING_CHAT_ID;

    // --- DEBUG: Cek Token ---
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("❌ ERROR: Token Telegram Belum Diisi di .env.local");
      return NextResponse.json({ error: "Konfigurasi Server Telegram Belum Lengkap" }, { status: 500 });
    }

    // 2. Format Pesan
    const stars = "⭐".repeat(rating || 5);
    const text = `
🌟 *REVIEW BARU MASUK!*
----------------------------
👤 *Nama:* ${name}
💼 *Pekerjaan:* ${job || "Pengunjung"}
🏆 *Rating:* ${rating}/5 ${stars}
----------------------------
💬 *Pesan:*
"${message}"
`;

    // 3. Kirim ke Telegram
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    const telegramResult = await telegramRes.json();

    if (!telegramRes.ok) {
      console.error("❌ Telegram API Error:", telegramResult);
      return NextResponse.json({ error: `Gagal kirim ke Telegram: ${telegramResult.description}` }, { status: 500 });
    }

    console.log("✅ Berhasil dikirim ke Telegram!");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server internal" }, { status: 500 });
  }
}