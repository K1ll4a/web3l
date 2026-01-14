import { callSoap } from "../utils/soapClient";
import { USER_SERVICE_URL } from "../utils/soap";
import { parseBooleanText, getFirstTextByLocalName } from "../utils/soap";

export async function validateSession(username: string): Promise<boolean> {
  const doc = await callSoap(
    USER_SERVICE_URL,
    `
      <ns:validateSession xmlns:ns="http://ws.k1ll4a.com/">
        <username>${username}</username>
      </ns:validateSession>
    `
  );

  return parseBooleanText(getFirstTextByLocalName(doc, "return")) ?? false;
}
