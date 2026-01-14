import { callSoap } from "../utils/soapClient";
import { getFirstTextByLocalName, parseBooleanText } from "../utils/soap";

const USER_SERVICE_PATH = "/ws/users";

export async function register(username: string, password: string): Promise<boolean> {
  const doc = await callSoap(
    USER_SERVICE_PATH,
    `
      <ns:register xmlns:ns="http://ws.k1ll4a.com/">
        <username>${username}</username>
        <password>${password}</password>
      </ns:register>
    `
  );

  // Ожидаем <return>true|false</return>
  const ok = parseBooleanText(getFirstTextByLocalName(doc, "return"));
  return !!ok;
}

export async function login(username: string, password: string): Promise<boolean> {
  const doc = await callSoap(
    USER_SERVICE_PATH,
    `
      <ns:login xmlns:ns="http://ws.k1ll4a.com/">
        <username>${username}</username>
        <password>${password}</password>
      </ns:login>
    `
  );

  const ok = parseBooleanText(getFirstTextByLocalName(doc, "return"));
  return !!ok;
}
