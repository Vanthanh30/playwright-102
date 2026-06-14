import {
  ContactFormData,
  SimpleMessageData,
  SliderData,
} from '@models/playground-scenarios';
import { TRANSLATIONS } from '@translations/translations';
import { Constants } from '@utilities/constants';

const text = TRANSLATIONS[Constants.LANGUAGE];

export const simpleMessageData: SimpleMessageData = {
  message: process.env.TEST_MESSAGE ?? 'Welcome to TestMu AI',
};

export const sliderData: SliderData = {
  initialValue: 15,
  targetValue: 95,
};

export const contactFormData: ContactFormData = {
  name: 'Nguyen Van An',
  email: 'an@example.com',
  password: 'Playwright102!',
  company: 'Test Automation Co.',
  website: 'https://example.com',
  country: text.countries.unitedStates,
  city: 'New York',
  address1: '123 Broadway',
  address2: 'Suite 100',
  state: 'New York',
  zipCode: '10001',
};
