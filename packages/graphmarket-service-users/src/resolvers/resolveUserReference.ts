import { Container } from 'typedi';
import { User } from '@graphmarket/entities';
import { UserService } from '@app/services';

const userService: UserService = Container.get(UserService);

export default async function resolveUserReference(reference: Pick<User, 'id'>): Promise<User> {
  return userService.readOneOrFail(reference.id);
}