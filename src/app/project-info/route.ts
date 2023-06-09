import { NextResponse } from "next/server";
import { fetchAndCompile } from "@truffle/fetch-and-compile";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const { compileResult } = await fetchAndCompile(
    searchParams.get("address")!,
    {
      network: {
        networkId: searchParams.get("networkId")!
      }
    } as any
  );
  return NextResponse.json(compileResult);
}
