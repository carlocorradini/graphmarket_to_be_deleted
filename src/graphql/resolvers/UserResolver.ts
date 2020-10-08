import { Repository } from 'typeorm';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User, Recipe } from '@app/entities';
import { CryptUtil } from '@app/util';
import { JWTHelper } from '@app/helper';
import { GraphQLNonEmptyString, GraphQLUUID, GraphQLVoid } from '../scalars';
import { PaginationArgs } from '../args';
import { UserCreateInput, UserUpdateInput } from '../inputs';

@Resolver(User)
@Service()
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>,
  ) {}

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => GraphQLUUID) id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  @Query(() => [User])
  users(@Args() { skip, take }: PaginationArgs): Promise<User[]> {
    return this.userRepository.find({ skip, take });
  }

  // @ts-ignore
  @Mutation(() => User)
  createUser(@Arg('data') userInput: UserCreateInput): Promise<User> {
    // TODO cambiare
    // eslint-disable-next-line no-param-reassign
    userInput.id = '12aad751-ec02-4c96-9441-1866a1c67f54';
    return this.userRepository.save(this.userRepository.create(userInput));
  }

  @Mutation(() => User)
  async updateUser(@Arg('data') userInput: UserUpdateInput): Promise<User> {
    const user: User = this.userRepository.create(userInput);
    // TODO cambiare
    user.id = '12aad751-ec02-4c96-9441-1866a1c67f54';
    await this.userRepository.save(user);
    return this.userRepository.findOneOrFail(user.id);
  }

  @Mutation(() => User)
  async deleteUser(): Promise<User> {
    // TODO cambiare
    const id = '12aad751-ec02-4c96-9441-1866a1c67f54';
    const user: User = await this.userRepository.findOneOrFail(id);
    await this.userRepository.delete(user.id);
    return user;
  }

  // TODO migliorare error
  @Mutation(() => String)
  async signIn(
    @Arg('username', () => GraphQLNonEmptyString) username: string,
    @Arg('password', () => GraphQLNonEmptyString) password: string,
  ): Promise<string> {
    const user: User | undefined = await this.userRepository.findOne(
      { username },
      { select: ['id', 'username', 'password'] },
    );
    if (!user) return '';
    if (!(await CryptUtil.compare(password, user.password!))) return '';
    return JWTHelper.sign({ id: user.id, username: user.username });
  }

  // TODO implementare
  @Mutation(() => GraphQLVoid)
  async signOut(): Promise<void> {
    // TODO delete
    this.userRepository.findOne('');
  }

  @FieldResolver()
  recipes(@Root() user: User): Promise<Recipe[]> {
    return this.recipeRepository.findByIds(user.recipes_ids);
  }
}
