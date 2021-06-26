import { Router } from 'express';

import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CreateComplimentController } from '../controllers/CreateComplimentController';
import { CreateTagController } from '../controllers/CreateTagController';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListTagsController } from '../controllers/ListTagsController';
import { ListUserReceiverComplimentsController } from '../controllers/ListUserReceiverComplimentsController';
import { ListUsersController } from '../controllers/ListUsersController';
import { ListUserSendComplimentsController } from '../controllers/ListUserSendComplimentsController';
import { ViewTagController } from '../controllers/ViewTagController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const viewTagController = new ViewTagController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiverComplimentsController =
  new ListUserReceiverComplimentsController();

router.post('/users', createUserController.handle);
router.post('/sessions', authenticateUserController.handle);
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle,
);
router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle,
);

router.get(
  '/users/compliments/send',
  ensureAuthenticated,
  listUserSendComplimentsController.handle,
);
router.get(
  '/users/compliments/receiver',
  ensureAuthenticated,
  listUserReceiverComplimentsController.handle,
);
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);
router.get('/tags/:name', ensureAuthenticated, viewTagController.handle);

export { router };
