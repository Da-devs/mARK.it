import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookieList: { name: string; value: string; options?: CookieOptions }[]) {
          for (const { name, value, options } of cookieList) {
            request.cookies.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          }
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}
