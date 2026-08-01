const STRAIGHT_DOUBLE_QUOTE = '"';
const LEFT_DOUBLE_QUOTATION_MARK = '“';
const RIGHT_DOUBLE_QUOTATION_MARK = '”';

const STRAIGHT_SINGLE_QUOTE = "'";
const LEFT_SINGLE_QUOTATION_MARK = '‘';
const RIGHT_SINGLE_QUOTATION_MARK = '’';

const APOSTROPHE = RIGHT_SINGLE_QUOTATION_MARK;

/**
 * Convert straight quotation marks and apostrophes to curly typographic ones.
 *
 * - `"..."` becomes `“...”`.
 * - `'...'` at word boundaries becomes `‘...’`.
 * - `'` inside a word (apostrophe) becomes `’`.
 */
export function toCurly(text: string): string {
  let result = text;

  result = result.replace(/(?<=[a-zA-Z])'(?=[a-zA-Z])/gu, APOSTROPHE);

  let isOpening = true;
  result = result.replace(new RegExp(STRAIGHT_SINGLE_QUOTE, 'gu'), () => {
    const quote = isOpening
      ? LEFT_SINGLE_QUOTATION_MARK
      : RIGHT_SINGLE_QUOTATION_MARK;
    isOpening = !isOpening;
    return quote;
  });

  let isDoubleOpening = true;
  result = result.replace(new RegExp(STRAIGHT_DOUBLE_QUOTE, 'gu'), () => {
    const quote = isDoubleOpening
      ? LEFT_DOUBLE_QUOTATION_MARK
      : RIGHT_DOUBLE_QUOTATION_MARK;
    isDoubleOpening = !isDoubleOpening;
    return quote;
  });

  return result;
}

/**
 * Convert curly typographic quotation marks and apostrophes to straight ones.
 *
 * - `“...”` becomes `"..."`.
 * - `‘...’` becomes `'...'`.
 * - `’` (curly apostrophe) becomes `'`.
 */
export function toStraight(text: string): string {
  return text
    .replace(
      new RegExp(LEFT_DOUBLE_QUOTATION_MARK, 'gu'),
      STRAIGHT_DOUBLE_QUOTE,
    )
    .replace(
      new RegExp(RIGHT_DOUBLE_QUOTATION_MARK, 'gu'),
      STRAIGHT_DOUBLE_QUOTE,
    )
    .replace(
      new RegExp(LEFT_SINGLE_QUOTATION_MARK, 'gu'),
      STRAIGHT_SINGLE_QUOTE,
    )
    .replace(
      new RegExp(RIGHT_SINGLE_QUOTATION_MARK, 'gu'),
      STRAIGHT_SINGLE_QUOTE,
    );
}
