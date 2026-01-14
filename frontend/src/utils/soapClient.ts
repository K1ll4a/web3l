export async function callSoap(path: string, body: string): Promise<Document> {
  // path уже содержит полный путь типа "/ws/users" или "/ws/geometry"
  const url = path;

  const envelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        ${body}
      </soap:Body>
    </soap:Envelope>
  `.trim();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml;charset=utf-8",
    },
    body: envelope,
  });

  if (!res.ok) {
    throw new Error(`SOAP error: ${res.status}`);
  }

  const text = await res.text();
  try {
    console.debug(`[SOAP] Response from ${path}:`, text.slice(0, 2000));
  } catch {}
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/xml");
}
