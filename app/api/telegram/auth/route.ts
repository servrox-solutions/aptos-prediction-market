import { NextRequest, NextResponse } from "next/server";
import { validate, parse, InitData } from "@telegram-apps/init-data-node";

async function authorizeRequest(
  req: NextRequest
): Promise<InitData | undefined> {
  const authHeader = req.headers.get("authorization") || "";
  const [authType, authData = ""] = authHeader.split(" ");

  console.log("🎉 authData", authData);
  console.log("🎉 parsed", parse(authData));

  if (authType !== "tma") {
    throw new Error("Unauthorized");
  }

  validate(authData, process.env.TELEGRAM_BOT_TOKEN!, {
    expiresIn: 3600,
  });

  return parse(authData);
}

export async function POST(req: NextRequest) {
  try {
    const initData = await authorizeRequest(req);

    if (!initData) {
      return NextResponse.json(
        { error: "Init data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(initData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
