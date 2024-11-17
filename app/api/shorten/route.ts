import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import dbConnect from '@/lib/mongodb';
import Url from '@/models/Url';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const shortId = nanoid(8);
    const newUrl = await Url.create({
      originalUrl: url,
      shortId,
    });

    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`,
      shortId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 