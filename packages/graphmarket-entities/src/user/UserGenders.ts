import { registerEnumType } from 'type-graphql';

/**
 * User genders.
 */
enum UserGenders {
  AGENDER = 'AGENDER',
  ANDROGYNE = 'ANDROGYNE',
  ANDROGYNOUS = 'ANDROGYNOUS',
  ASEXUAL = 'ASEXUAL',
  BIGENDER = 'BIGENDER',
  CIS = 'CIS',
  CISGENDER = 'CISGENDER',
  CISGENDER_FEMALE = 'CISGENDER_FEMALE',
  CISGENDER_MALE = 'CISGENDER_MALE',
  CISGENDER_MAN = 'CISGENDER_MAN',
  CISGENDER_WOMAN = 'CISGENDER_WOMAN',
  CIS_FEMALE = 'CIS_FEMALE',
  CIS_MALE = 'CIS_MALE',
  CIS_MAN = 'CIS_MAN',
  CIS_WOMAN = 'CIS_WOMAN',
  F2M = 'F2M',
  FEMALE = 'FEMALE',
  FEMALE_TO_MALE = 'FEMALE_TO_MALE',
  FEMALE_TO_MALE_TRANSGENDER_MAN = 'FEMALE_TO_MALE_TRANSGENDER_MAN',
  FEMALE_TO_MALE_TRANSSEXUAL_MAN = 'FEMALE_TO_MALE_TRANSSEXUAL_MAN',
  FEMALE_TO_MALE_TRANS_MAN = 'FEMALE_TO_MALE_TRANS_MAN',
  FTM = 'FTM',
  GENDERQUEEN = 'GENDERQUEEN',
  GENDER_FLUID = 'GENDER_FLUID',
  GENDER_NEUTRAL = 'GENDER_NEUTRAL',
  GENDER_NONCONFORMING = 'GENDER_NONCONFORMING',
  GENDER_QUESTIONING = 'GENDER_QUESTIONING',
  GENDER_VARIANT = 'GENDER_VARIANT',
  HERMAPHRODITE = 'HERMAPHRODITE',
  INTERSEX = 'INTERSEX',
  INTERSEX_MAN = 'INTERSEX_MAN',
  INTERSEX_PERSON = 'INTERSEX_PERSON',
  INTERSEX_WOMAN = 'INTERSEX_WOMAN',
  M2F = 'M2F',
  MALE = 'MALE',
  MALE_TO_FEMALE = 'MALE_TO_FEMALE',
  MALE_TO_FEMALE_TRANSGENDER_WOMAN = 'MALE_TO_FEMALE_TRANSGENDER_WOMAN',
  MALE_TO_FEMALE_TRANSSEXUAL_WOMAN = 'MALE_TO_FEMALE_TRANSSEXUAL_WOMAN',
  MALE_TO_FEMALE_TRANS_WOMAN = 'MALE_TO_FEMALE_TRANS_WOMAN',
  MAN = 'MAN',
  MTF = 'MTF',
  NEITHER = 'NEITHER',
  NEUTROIS = 'NEUTROIS',
  NON_BINARY = 'NON_BINARY',
  OTHER = 'OTHER',
  PANGENDER = 'PANGENDER',
  POLYGENDER = 'POLYGENDER',
  TRANS = 'TRANS',
  TRANSEXUAL = 'TRANSEXUAL',
  TRANSEXUAL_FEMALE = 'TRANSEXUAL_FEMALE',
  TRANSEXUAL_MALE = 'TRANSEXUAL_MALE',
  TRANSEXUAL_MAN = 'TRANSEXUAL_MAN',
  TRANSEXUAL_PERSON = 'TRANSEXUAL_PERSON',
  TRANSEXUAL_WOMAN = 'TRANSEXUAL_WOMAN',
  TRANSGENDER_FEMALE = 'TRANSGENDER_FEMALE',
  TRANSGENDER_PERSON = 'TRANSGENDER_PERSON',
  TRANSMASCULINE = 'TRANSMASCULINE',
  TRANS_FEMALE = 'TRANS_FEMALE',
  TRANS_MALE = 'TRANS_MALE',
  TRANS_MAN = 'TRANS_MAN',
  TRANS_PERSON = 'TRABS_PERSON',
  TRANS_STAR_FEMALE = 'TRANS_STAR_FEMALE',
  TRANS_STAR_MALE = 'TRANS_STAR_MALE',
  TRANS_STAR_MAN = 'TRANS_STAR_MAN',
  TRANS_STAR_PERSON = 'TRANS_STAR_PERSON',
  TRANS_STAR_WOMAN = 'TRANS_STAR_WOMAN',
  TWO_SPIRIT = 'TWO_SPIRIT',
  TWO_SPIRIT_PERSON = 'TWO_SPIRIT_PERSON',
  TWO_STAR_PERSON = 'TWO_STAR_PERSON',
  T_STAR_MAN = 'T_STAR_MAN',
  T_STAR_WOMAN = 'T_STAR_WOMAN',
  WOMAN = 'WOMAN',
}

registerEnumType(UserGenders, { name: 'UserGenders', description: `User genders` });

export default UserGenders;
