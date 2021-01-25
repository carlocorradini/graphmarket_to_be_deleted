import { Directive, Field, ObjectType } from 'type-graphql';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  GraphQLDateTime,
  GraphQLID,
  GraphQLNonNegativeInt,
  GraphQLPositiveInt,
} from '@graphmarket/graphql-scalars';
import { Product, ProductConditions } from '@app/product';
import { User } from '@app/user';
import { Purchase } from '@app/purchase';

/**
 * Inventory entity.
 */
@Entity('inventory')
@Unique(['product', 'seller', 'condition'])
@Check(`"price" > 0`)
@ObjectType('Inventory')
@Directive(`@key(fields: "id")`)
export default class Inventory {
  /**
   * Inventory's id.
   */
  @PrimaryGeneratedColumn('uuid')
  @Index()
  @Field(() => GraphQLID)
  id!: string;

  /**
   * Product's price in cents.
   */
  @Column({ type: 'integer' })
  @Field(() => GraphQLPositiveInt)
  price!: number;

  /**
   * Product's quantity.
   */
  @Column({ type: 'integer' })
  @Field(() => GraphQLNonNegativeInt)
  quantity!: number;

  /**
   * Product's condition.
   */
  @Column({ type: 'enum', enum: ProductConditions })
  @Field(() => ProductConditions)
  condition!: ProductConditions;

  /**
   * Inventory creation date and time.
   */
  @CreateDateColumn({ name: 'created_at', update: false })
  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  /**
   * Inventory last updated date and time.
   */
  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => GraphQLDateTime)
  updatedAt!: Date;

  /**
   * Product.
   */
  @ManyToOne(() => Product, (product) => product.inventories, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  /**
   * Product id.
   */
  @RelationId((inventory: Inventory) => inventory.product)
  productId!: string;

  /**
   * Product's seller.
   */
  @ManyToOne(() => User, (seller) => seller.inventories, { nullable: false })
  @JoinColumn({ name: 'seller_id' })
  seller!: User;

  /**
   * Product's seller id.
   */
  @RelationId((inventory: Inventory) => inventory.seller)
  sellerId!: string;

  /**
   * Product's purchases.
   */
  @OneToMany(() => Purchase, (purchase) => purchase.inventory)
  purchases!: Purchase[];

  /**
   * Product's purchases ids.
   */
  @RelationId((inventory: Inventory) => inventory.purchases)
  purchasesIds!: string[];
}