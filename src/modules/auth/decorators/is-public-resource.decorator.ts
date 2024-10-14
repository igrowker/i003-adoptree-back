import { SetMetadata } from "@nestjs/common";
import COMMON_KEYS from "../../../constants/keys";

export const IsPublicResource = () =>
  SetMetadata(COMMON_KEYS.DECORATOR_IS_PUBLIC, true);
