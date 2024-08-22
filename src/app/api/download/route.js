import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  try {
    const fileUrl = `https://develop.sonduckfilm.com/wp-content/uploads/woocommerce_uploads/2022/03/53-TimerProPack-DownloadLink.pdf`;
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      throw new Error(`Failed to download file from ${fileUrl}`);
    }

    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return NextResponse.json(buffer, {
      status: 200,
      headers: {
        "Content-Type": fileResponse.headers.get("Content-Type"),
        "Content-Disposition": `attachment; filename="${fileUrl
          .split("/")
          .pop()}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
