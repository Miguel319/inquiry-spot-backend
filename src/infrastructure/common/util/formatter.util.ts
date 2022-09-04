import { I18nContext } from "nestjs-i18n";

export class Formatter {
  static formatSingleMongooseError(message: string, i18n: I18nContext): string {
    return i18n.t(message.slice(message.indexOf(":") + 2));
  }

  static formatMongooseErrors(message: string, i18n: I18nContext) {
    const errors: string[] = message.split(",");

    let finalError = "";

    for (const error of errors)
      finalError += `${i18n.t(error.substring(error.indexOf(":") + 2))}, `;

    return finalError.slice(0, finalError.lastIndexOf(","));
  }

  public static trimText(
    str: string,
    length: number,
    delim: string,
    appendix: string,
  ): string {
    if (str.length <= length) return str;

    let trimmedStr: string = str.substring(0, length + delim.length);

    const lastDelimIndex: number = trimmedStr.lastIndexOf(delim);

    if (lastDelimIndex >= 0)
      trimmedStr = trimmedStr.substring(0, lastDelimIndex);

    if (trimmedStr) trimmedStr += appendix;

    return trimmedStr;
  }

  public static stripHtmlTags(text: string): string {
    return text.replace(/(<([^>]+)>)/gi, "");
  }
}
