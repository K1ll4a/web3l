import { callSoap } from "../utils/soapClient";
import {
  HISTORY_SERVICE_URL,
  getAllByLocalName,
  getFirstTextByLocalName,
  parseBooleanText,
} from "../utils/soap";
import type { Hit } from "../store/hitStore";

function buildGetXml(username: string) {
  return `<ns:getHistory xmlns:ns="http://ws.k1ll4a.com/">
    <username>${username}</username>
  </ns:getHistory>`;
}

function buildClearXml(username: string) {
  return `<ns:clearHistory xmlns:ns="http://ws.k1ll4a.com/">
    <username>${username}</username>
  </ns:clearHistory>`;
}

export async function getHistory(username: string): Promise<Hit[]> {
  // Выполняем SOAP-запрос и сохраняем сырой XML для устойчивого парсинга
  const body = buildGetXml(username);
  const envelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        ${body}
      </soap:Body>
    </soap:Envelope>
  `.trim();

  const res = await fetch(HISTORY_SERVICE_URL, {
    method: "POST",
    headers: { "Content-Type": "text/xml;charset=utf-8" },
    body: envelope,
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("[SOAP] history error", res.status, text.slice(0, 500));
    throw new Error(`SOAP error: ${res.status}`);
  }

  console.log("[SOAP] history raw:", text.slice(0, 2000));

  // Пытаемся распарсить через DOMParser с namespace-агностичными запросами
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/xml");

  const returnEls = Array.from(doc.getElementsByTagNameNS("*", "return"));

  const domItems: Hit[] = returnEls.map((el) => {
    const val = (tag: string) => {
      const node = el.getElementsByTagNameNS("*", tag)[0];
      return node?.textContent?.trim() ?? "";
    };
    const idText = val("id");
    const x = Number(val("x") || "0");
    const y = Number(val("y") || "0");
    const r = Number(val("r") || "1");
    const hit = (val("hit") || "").toLowerCase() === "true";
    const createdAt = val("createdAt") || undefined;
    console.log("[SOAP] parsed via DOM", { idText, x, y, r, hit, createdAt });
    return { id: idText ? Number(idText) : undefined, x, y, r, hit, createdAt };
  });

  if (domItems.length > 0) return domItems;

  // Фоллбек: regex, если DOMParser не помог
  const returnBlocks: string[] = [];
  const returnRe = /<\s*(?:\w+:)?return[^>]*>([\s\S]*?)<\/\s*(?:\w+:)?return\s*>/gi;
  let m: RegExpExecArray | null;
  while ((m = returnRe.exec(text)) !== null) {
    returnBlocks.push(m[1]);
  }

  const getVal = (block: string, tag: string) => {
    const re = new RegExp(`<\\s*(?:\\w+:)?${tag}[^>]*>([\\s\\S]*?)<\\/\\s*(?:\\w+:)?${tag}\\s*>`, "i");
    const mm = block.match(re);
    return mm ? mm[1].trim() : "";
  };

  const items: Hit[] = returnBlocks.map((b) => {
    const idText = getVal(b, "id");
    const x = Number(getVal(b, "x") || "0");
    const y = Number(getVal(b, "y") || "0");
    const r = Number(getVal(b, "r") || "1");
    const hit = (getVal(b, "hit") || "").toLowerCase() === "true";
    const createdAt = getVal(b, "createdAt") || undefined;
    console.log("[SOAP] parsed via regex", { idText, x, y, r, hit, createdAt });
    return {
      id: idText ? Number(idText) : undefined,
      x,
      y,
      r,
      hit,
      createdAt,
    };
  });

  return items;

  return items;
}

export async function clearHistory(username: string): Promise<boolean> {
  const body = buildClearXml(username);
  const doc = await callSoap(HISTORY_SERVICE_URL, body);
  return parseBooleanText(getFirstTextByLocalName(doc, "return")) ?? false;
}
