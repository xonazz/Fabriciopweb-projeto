// Server Component - Renderizado em SSG (Tempo de Build)
import './globals.css'; // Importe seus estilos globais aqui

export const metadata = {
  title: 'Organizador de Atividades PWeb',
  description: 'Um gerenciador de atividades simples feito com Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children} {/* Seu 'app/page.js' é injetado aqui */}
      </body>
    </html>
  );
}