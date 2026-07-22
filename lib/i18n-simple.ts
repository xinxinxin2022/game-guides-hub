import en from '@/messages/en.json';
import zh from '@/messages/zh.json';

const messages: Record<string, any> = { en, zh };

export function getT(locale: string, namespace: string) {
  const msgs = messages[locale] || messages.en;
  
  return (key: string, values?: Record<string, any>): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split('.');
    let value: any = msgs;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // fallback
      }
    }
    
    let result = typeof value === 'string' ? value : key;
    
    // Replace {values}
    if (values) {
      for (const [k, v] of Object.entries(values)) {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    
    return result;
  };
}

export function getMessages(locale: string) {
  return messages[locale] || messages.en;
}
