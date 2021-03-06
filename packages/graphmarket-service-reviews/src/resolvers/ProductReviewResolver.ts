import { Args, FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { ProductExternal, Review } from '@graphmarket/entities';
import { PaginationArgs } from '@graphmarket/graphql-args';
import { ReviewService } from '@app/services';
import { GraphQLProductRating } from '@graphmarket/graphql-scalars';

/**
 * Product review resolver.
 *
 * @see ReviewService
 */
@Resolver(() => ProductExternal)
@Service()
export default class ProductReviewResolver {
  /**
   * Review service.
   */
  @Inject()
  private readonly reviewService!: ReviewService;

  /**
   * Resolves the reviews of the product.
   *
   * @param product - Product to obtain the reviews of
   * @param param1 - Pagination arguments
   * @returns Reviews of the product
   */
  @FieldResolver(() => [Review], { description: `Product's reviews` })
  reviews(
    @Root() product: ProductExternal,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Review[]> {
    return this.reviewService.read({ skip, take, productId: product.id });
  }

  /**
   * Resolves the average rating of the product from all reviews.
   *
   * @param product - Product to obtain the average rating of
   * @returns Average rating of the product
   */
  @FieldResolver(() => GraphQLProductRating, { description: `Product's average rating` })
  rating(@Root() product: ProductExternal): Promise<number> {
    return this.reviewService.productAverageRating(product.id);
  }
}
