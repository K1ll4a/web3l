import { callSoap } from "../utils/soapClient";
import { GEOMETRY_SERVICE_URL } from "../utils/soap";
import type { Hit } from "../store/hitStore";

function buildCheckXml(username: string, x: number, y: number, r: number) {
  return `
    <ns:checkHit xmlns:ns="http://ws.k1ll4a.com/">
      <username>${username}</username>
      <x>${x}</x>
      <y>${y}</y>
      <r>${r}</r>
    </ns:checkHit>
  `;
}

function parseHit(xmlText: string, x: number, y: number, r: number): Hit {
  // Парсер для извлечения данных из SOAP ответа
  const extractValue = (tag: string): string | null => {
    const regex = new RegExp(`<.*?${tag}>([^<]+)<`);
    const match = xmlText.match(regex);
    return match ? match[1] : null;
  };

  // Используем переданные координаты, если бэк их не вернул
  const returnedX = extractValue("x");
  const returnedY = extractValue("y");
  const returnedR = extractValue("r");

  const hit = extractValue("hit") === "true";
  const idText = extractValue("id");
  const createdAt = extractValue("createdAt") ?? undefined;

  return {
    id: idText ? Number(idText) : undefined,
    x: returnedX !== null ? Number(returnedX) : x,
    y: returnedY !== null ? Number(returnedY) : y,
    r: returnedR !== null ? Number(returnedR) : r,
    hit,
    createdAt,
  };
}

export async function checkPoint(
  username: string,
  x: number,
  y: number,
  r: number
): Promise<Hit> {
  const body = buildCheckXml(username, x, y, r);
  const response = await callSoap(GEOMETRY_SERVICE_URL, body);
  const xmlText = new XMLSerializer().serializeToString(response);
  return parseHit(xmlText, x, y, r);
}
