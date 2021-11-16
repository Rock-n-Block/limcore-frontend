import ruIcon from 'assets/img/icons/countries/russia.svg';
import enIcon from 'assets/img/icons/countries/uk.svg';
import { ILanguages, Languages } from 'typings/i18n';

export const defaultLanguage: ILanguages = Languages.en;

export const languages: Record<ILanguages, string> = {
  [Languages.en]: enIcon,
  [Languages.ru]: ruIcon,
};
