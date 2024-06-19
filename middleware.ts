import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  if (request.nextUrl.pathname.startsWith('/login') && token) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (role?.value === 'Peminjam') {
      return NextResponse.redirect(new URL('/daftar-gedung', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard/jadwal', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (role?.value === 'Peminjam') {
      return NextResponse.redirect(new URL('/daftar-gedung', request.url));
    }
  }

  return response;
}
