export const BASE_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_BACKEND_URL) ||
  "";

export const NAMESPACE = "http://ws.k1ll4a.com/";

export const USER_SERVICE_URL = `/ws/users`;
export const GEOMETRY_SERVICE_URL = `/ws/geometry`;
export const HISTORY_SERVICE_URL = `/ws/history`;

export function xmlEscape(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildEnvelope(innerXml: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="${NAMESPACE}">
  <soapenv:Header/>
  <soapenv:Body>
    ${innerXml}
  </soapenv:Body>
</soapenv:Envelope>`;
}

/**
 * Простейший парсер одного тега из SOAP-ответа.
 * Для учебного проекта — ок.
 */
export function extractTag(xml: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const m = xml.match(re);
  return m ? m[1] : null;
}

export function parseXml(xml: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(xml, "text/xml");
}

export function getAllByLocalName(
  doc: Document | Element,
  localName: string
): Element[] {
  const root: Document | Element = doc;
  const all = Array.from(
    "getElementsByTagName" in root
      ? root.getElementsByTagName("*")
      : []
  );
  return (all as Element[]).filter((el) => el.localName === localName);
}

export function getFirstTextByLocalName(
  doc: Document | Element,
  localName: string
): string | null {
  const nodes = getAllByLocalName(doc, localName);
  if (nodes.length === 0) return null;
  const text = nodes[0].textContent;
  return text !== null ? text : null;
}

export function parseBooleanText(value: string | null | undefined): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

