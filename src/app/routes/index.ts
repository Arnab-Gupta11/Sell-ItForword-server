import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ListingRoutes } from '../modules/listing/listing.routes';
import { TransationRoutes } from '../modules/transaction/transaction.routes';
import { WishlistRoutes } from '../modules/wishlist/wishlist.routes';
import { MessageRoutes } from '../modules/message/message.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
  {
    path: '/transactions',
    route: TransationRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
