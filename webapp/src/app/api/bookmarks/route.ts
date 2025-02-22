import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabase.from("bookmarks").select("*");

        if (error) throw error;

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { error: 'An unknown error occurred' },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const {description, author, url,  post_timestamp, cover_img_url} = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("bookmarks")
            .insert([{ description, author, url, post_timestamp, cover_img_url }]);

        if (error) throw error;

        return NextResponse.json({ message: "Bookmark added", data }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'An unknown error occurred' },
            { status: 500 }
        );
    }
}

