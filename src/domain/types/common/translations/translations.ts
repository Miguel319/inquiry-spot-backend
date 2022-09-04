// import generalEnTranslations from "@/i18n/en/general";
// import exceptionsEnTranslations from "@/i18n/en/exceptions";
// import validationsEnTranslations from "@/i18n/en/validations";

// import generalEsTranslations from "@/i18n/en/general";
// import exceptionsEsTranslations from "@/i18n/en/exceptions";
// import validationsEsTranslations from "@/i18n/en/validations";

// type ConvertedToObjectType<T> = {
//   [P in keyof T]: T[P] extends string ? string : ConvertedToObjectType<T[P]>;
// };

// type TranslationJsonType =
//   typeof import("../../../../i18n/en/exceptions.json") &
//     typeof import("../../../../i18n/es/exceptions.json") &
//     typeof import("../../../../i18n/en/general.json") &
//     typeof import("../../../../i18n/es/general.json") &
//     typeof import("../../../../i18n/en/validations.json") &
//     typeof import("../../../../i18n/es/validations.json");

// export const translationsObject: TranslationJsonType = {};

// const convertLanguageJsonToObject = (
//   json: any,
//   objectToConvertTo?: TranslationJsonType,
//   current?: string,
// ) => {
//   const translations = translationsObject;

//   for (const key in json) {
//     const currentLookupKey = current ? `${current}.${key}` : key;

//     if (json[key]) {
//       translations[key] = {};
//     }
//   }
// };
