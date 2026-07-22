'use client';

import React, { createContext, useContext, useCallback } from 'react';
import enMessages from '../messages/en.json';
import zhMessages from '../messages/zh.json';

const messagesMap: Record<string, Record<string, unknown>> = {
  en: enMessages as unknown as Record<string, unknown>,
  zh: zhMessages as unknown as Record<string, unknown>,
};

interface I18nContextType {
  locale: string;
  messages: Record<string, unknown>;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  messages: enMessages as unknown as Record<string, unknown>,
});

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path; // fallback to key
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

export function I18nProvider({
  locale,
  messages: messagesProp,
  children,
}: {
  locale: string;
  messages?: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const messages = messagesProp || messagesMap[locale] || messagesMap.en;

  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale(): string {
  const ctx = useContext(I18nContext);
  return ctx.locale;
}

export function useTranslations(namespace: string) {
  const ctx = useContext(I18nContext);

  const t = useCallback(
    (key: string, values?: Record<string, string | number>): string => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      let result = getNestedValue(ctx.messages, fullKey);

      // Simple variable replacement: {year} → values.year
      if (values) {
        for (const [k, v] of Object.entries(values)) {
          result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }

      return result;
    },
    [ctx.messages, namespace]
  );

  return t;
}

export function loadMessages(locale: string): Record<string, unknown> {
  return messagesMap[locale] || messagesMap.en;
}

export function getNested(messages: Record<string, unknown>, path: string): string {
  return getNestedValue(messages, path);
}
