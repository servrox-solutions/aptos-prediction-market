"use client";

import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function TelegramTest() {
  const [aptosConnectUrl, setAptosConnectUrl] = useState<string | null>(null);
  const { connect } = useWallet();

  const handleConnect = async () => {
    (function () {
      const originalWindowOpen = window.open;

      window.open = function (...args) {
        const newWindow = originalWindowOpen.apply(this, args);
        if (args[0]) {
          setAptosConnectUrl(`${args[0]}`);
        }
        return newWindow;
      };
    })();

    try {
      await connect(
        "Continue with Google" as WalletName<"Continue with Google">
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Button onClick={handleConnect}>Test</Button>
        <br />
        {aptosConnectUrl && (
          <>
            <Link href={aptosConnectUrl}>
              <Button>next/link</Button>
            </Link>
            <br />
            <Button
              onClick={() => window.Telegram.WebApp.openLink(aptosConnectUrl)}
            >
              Open link in external browser
            </Button>
            <br />
            <Button
              onClick={() =>
                window.Telegram.WebApp.openLink(aptosConnectUrl, {
                  try_instant_view: true,
                })
              }
            >
              Open link inside Telegram webview
            </Button>
          </>
        )}
        <br />
        <h1>Welcome {window.Telegram.WebApp.initDataUnsafe.user?.username}</h1>
        User data:
        <pre>
          {JSON.stringify(window.Telegram.WebApp.initDataUnsafe.user, null, 2)}
        </pre>
        Eniter Web App data:
        <pre>{JSON.stringify(window.Telegram.WebApp, null, 2)}</pre>
      </div>
      )
    </div>
  );
}
