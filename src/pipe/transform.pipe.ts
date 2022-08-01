import { ForbiddenException } from '@config/exception.config';

export class Transformation {
  public static parseStringToNumber(value: string): number | undefined {
    const explodedValues = typeof value === 'string';

    if (!explodedValues || !value) return undefined;

    if (parseInt(value) < 0) return undefined;

    return parseInt(value);
  }

  public static parseStringToFloat(value: string): number | undefined {
    const explodedValues = typeof value === 'string';

    if (!explodedValues || !value) return undefined;

    if (parseInt(value) < 0) return undefined;

    return parseFloat(value);
  }

  public static parseStringToBoolean(value: string): boolean {
    const check = Boolean(value);

    if (!check) return;

    const bool = value === 'true';

    return bool;
  }

  public static checkStringIsNumber(
    value: string,
  ): string | ForbiddenException {
    const explodedValues = +value;

    if (explodedValues === NaN) {
      return new ForbiddenException('Id wrong, please check again!');
    }

    return value;
  }
}
