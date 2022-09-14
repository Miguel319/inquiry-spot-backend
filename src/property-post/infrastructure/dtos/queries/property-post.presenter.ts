import { Address, Price } from "@/domain/types";
import { BuyingOption, PropertyStatus } from "@/property-post/domain";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "../../../../infrastructure/presenters/base-presenter";
import { PropertyPost } from "../../persistence/schemas";

export class PropertyPostPresenter extends Presenter {
  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  bathroomCount: number;

  @ApiProperty({ required: true })
  bedroomCount: number;

  @ApiProperty({ required: true })
  parkingLotCount: number;

  @ApiProperty({ required: true })
  price: Price;

  @ApiProperty({ required: true })
  seller: string;

  @ApiProperty()
  territory: number;

  @ApiProperty({ required: true })
  buyingOption: BuyingOption;

  @ApiProperty({ required: true })
  propertyStatus: PropertyStatus;

  @ApiProperty({ required: true })
  primaryImage: string;

  @ApiProperty({ required: true })
  secondaryImages: string[];

  @ApiProperty({ required: true })
  additionalInfo: string[];

  @ApiProperty({ required: true })
  address: Address;

  private constructor(post: PropertyPost) {
    super(post);

    this.additionalInfo = post.additionalInfo;
    this.address = post.address;
    this.bathroomCount = post.bathroomCount;
    this.bedroomCount = post.bedroomCount;
    this.buyingOption = post.buyingOption;
    this.description = post.description;
    this.parkingLotCount = post.parkingLotCount;
    this.price = post.price;
    this.primaryImage = post.primaryImage;
    this.propertyStatus = post.propertyStatus;
    this.secondaryImages = post.secondaryImages;
    this.seller = post.seller;
    this.territory = post.territory;
  }

  public static create(propertyPost: PropertyPost): PropertyPostPresenter {
    return new PropertyPostPresenter(propertyPost);
  }
}
