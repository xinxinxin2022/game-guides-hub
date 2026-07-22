import enMessages from '../messages/en.json';
import zhMessages from '../messages/zh.json';

const messagesMap: Record<string, Record<string, unknown>> = {
  en: enMessages as unknown as Record<string, unknown>,
  zh: zhMessages as unknown as Record<string, unknown>,
};

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

export function getMessages(locale: string): Record<string, unknown> {
  return messagesMap[locale] || messagesMap.en;
}

export function translate(locale: string, key: string): string {
  const messages = getMessages(locale);
  return getNestedValue(messages, key);
}
