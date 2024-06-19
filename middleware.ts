// import { authMiddleware } from "@clerk/nextjs";
 
// export default authMiddleware({
//   publicRoutes: ['/', '/api/webhooks/clerk',]
// });
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  ignoredRoutes: ["/","/api/webhooks(.*)"],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};