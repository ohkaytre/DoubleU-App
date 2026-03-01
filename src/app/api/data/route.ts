import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // This is where you put the logic that used to be in your server action
  const body = await request.json();

  // Perform your database operations here

  return NextResponse.json({ message: "Data received successfully" });
}

