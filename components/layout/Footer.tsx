import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('common.footer');
  const navT = useTranslations('common.nav');
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-dark-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 opacity-80" />
                <div className="absolute inset-[2px] rounded-md bg-dark-50 flex items-center justify-center">
                  <span className="text-lg font-bold text-gradient">P</span>
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                Palworld<span className="text-primary-400">Guides</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400 max-w-md">
              {t('disclaimer')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {navT('guides')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={`/${locale}/guides`} className="text-sm text-zinc-400 hover:text-primary-400 transition-colors">
                  {navT('allGuides')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/breeding`} className="text-sm text-zinc-400 hover:text-primary-400 transition-colors">
                  {navT('breeding')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/server-setup`} className="text-sm text-zinc-400 hover:text-primary-400 transition-colors">
                  {navT('serverSetup')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-zinc-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-zinc-400 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-zinc-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8">
          <p className="text-center text-sm text-zinc-500">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
