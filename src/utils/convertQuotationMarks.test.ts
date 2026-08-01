import { toCurly, toStraight } from './convertQuotationMarks';

describe('toCurly', () => {
  it('converts straight double quotes to curly double quotes', () => {
    expect(toCurly('"A tiger can\'t change its stripes."')).toBe(
      '“A tiger can’t change its stripes.”',
    );
  });

  it('converts straight single quotes at word boundaries', () => {
    expect(toCurly("'hello'")).toBe('‘hello’');
  });

  it('converts apostrophes inside words', () => {
    expect(toCurly("It's a nice day, isn't it?")).toBe(
      'It’s a nice day, isn’t it?',
    );
  });

  it('handles nested quotes', () => {
    expect(toCurly('"He said \'hello\' to me."')).toBe(
      '“He said ‘hello’ to me.”',
    );
  });

  it('returns an empty string for empty input', () => {
    expect(toCurly('')).toBe('');
  });

  it('leaves text without quotes unchanged', () => {
    expect(toCurly('No quotes here.')).toBe('No quotes here.');
  });

  it('handles multiple apostrophes in one word', () => {
    expect(toCurly("'Twas the night before Halloween.")).toBe(
      '‘Twas the night before Halloween.',
    );
  });
});

describe('toStraight', () => {
  it('converts curly double quotes to straight double quotes', () => {
    expect(toStraight('“A tiger can’t change its stripes.”')).toBe(
      '"A tiger can\'t change its stripes."',
    );
  });

  it('converts curly single quotes and apostrophes to straight single quotes', () => {
    expect(toStraight('It’s ‘great’, isn’t it?')).toBe(
      "It's 'great', isn't it?",
    );
  });

  it('returns an empty string for empty input', () => {
    expect(toStraight('')).toBe('');
  });

  it('leaves text without curly quotes unchanged', () => {
    expect(toStraight('No curly quotes here.')).toBe('No curly quotes here.');
  });
});
