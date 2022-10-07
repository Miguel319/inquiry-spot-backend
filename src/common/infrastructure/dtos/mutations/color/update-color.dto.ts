import { NameType } from "@/common/domain/entities";

export class UpdateColorDto {
  readonly name: NameType;
  readonly hexValue: string;
}
