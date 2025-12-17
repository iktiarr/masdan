import Link from "next/link";

export default function WelcomePage() {
  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Selamat Datang di Masdan App</h1>
      <p>Aplikasi manajemen materi dan pembelajaran coding.</p>
      
      <div style={{ marginTop: "20px" }}>
        <Link href="/users/page/login">
          <button style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}>Login</button>
        </Link>

        <Link href="/users/page/register">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Daftar Baru</button>
        </Link>
      </div>
    </div>
  );
}