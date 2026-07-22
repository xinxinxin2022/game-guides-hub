import { getT } from '@/lib/i18n-simple';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getT(locale, 'common');
  return {
    title: 'Privacy Policy | Palworld Guides',
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-zinc-400">
        <Link href={`/${locale}`} className="hover:text-primary-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-200">Privacy Policy</span>
      </nav>

      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm">Last updated: July 22, 2026</p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-zinc-300 mb-4">
          We collect information you provide directly to us, such as when you fill out a contact form or subscribe to our newsletter.
          This may include your name, email address, and any other information you choose to provide.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-zinc-300 mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 text-zinc-300 mb-4 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Send you technical notices and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Display relevant advertisements through Google AdSense</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Third-Party Services</h2>
        <p className="text-zinc-300 mb-4">
          We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and similar technologies
          to collect information about your visit to this and other websites in order to provide ads about goods and services of interest to you.
        </p>
        <p className="text-zinc-300 mb-4">
          For more information about Google's privacy practices, please visit:{' '}
          <a href="https://policies.google.com/privacy" className="text-primary-400 hover:text-primary-300" target="_blank" rel="noopener noreferrer">
            https://policies.google.com/privacy
          </a>
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies</h2>
        <p className="text-zinc-300 mb-4">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information.
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Contact Us</h2>
        <p className="text-zinc-300 mb-4">
          If you have any questions about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:contact@tailuopai.online" className="text-primary-400 hover:text-primary-300">
            contact@tailuopai.online
          </a>
        </p>
      </article>
    </div>
  );
}
