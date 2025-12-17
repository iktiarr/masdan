'use client';

type FooterProps = {
  brand?: string;
  owner?: string;
};

export default function Footer({
  brand = 'MDeveloper',
  owner = 'Iktiar Ramadani',
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative border-t py-6
        transition-colors
        border-gray-200 dark:border-white/5
        bg-gray-100/50 dark:bg-black/20
      "
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p
          className="
            text-xs font-mono uppercase tracking-wider
            text-gray-500 dark:text-gray-500
          "
        >
          © {year} {brand}. All rights reserved.
          <span className="text-gray-400 dark:text-gray-600 mx-2">|</span>
          Dilindungi oleh {owner}
        </p>
      </div>
    </footer>
  );
}
