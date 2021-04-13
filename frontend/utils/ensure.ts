import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { parseCookies } from './parseCookie';

type typeOfRoutes = 'public' | 'auth' | 'private' | 'staff';

export const ensureAuth = (ctx: GetServerSidePropsContext<ParsedUrlQuery>, route: typeOfRoutes) => {
  if (route === 'public') {
    return;
  }
  if (route === 'private') {
    const token = parseCookies(ctx.req)?.token;
    if (!token) {
      ctx.res.writeHead(302, { Location: '/login/?redirected=true' });
      ctx.res.end();
    }
  }
  if (route === 'auth') {
    const token = parseCookies(ctx.req)?.token;
    if (token) {
      ctx.res.writeHead(302, { Location: '/control/?redirected=true' });
      ctx.res.end();
    }
  }
  if (route === 'staff') {
    const isStaff = parseCookies(ctx.req)?.isStaff === 'true';
    if (!isStaff) {
      ctx.res.writeHead(302, { Location: '/control/?redirected=true' });
      ctx.res.end();
    }
  }
  return;
}
