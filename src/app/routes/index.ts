import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ListingRoutes } from '../modules/listing/listing.routes';
import { TransationRoutes } from '../modules/transaction/transaction.routes';
import { WishlistRoutes } from '../modules/wishlist/wishlist.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';
import { MessageRoutes } from '../modules/message/message.routes';
import { ConversationRoutes } from '../modules/conversation/conversation.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { MetaRoutes } from '../modules/meta/meta.routes';

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
    path: '/category',
    route: CategoryRoutes,
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
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
  {
    path: '/conversation',
    route: ConversationRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/meta',
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
