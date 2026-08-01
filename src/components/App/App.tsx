import { useId, useState } from 'react';
import { toCurly, toStraight } from 'src/utils/convertQuotationMarks';

const DIRECTION = {
  CURLY_TO_STRAIGHT: 'curly-to-straight',
  STRAIGHT_TO_CURLY: 'straight-to-curly',
} as const;

type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

const COPY_FEEDBACK_DURATION_MS = 2_000;

export function App() {
  const [direction, setDirection] = useState<Direction>(
    DIRECTION.STRAIGHT_TO_CURLY,
  );
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const inputId = useId();
  const outputId = useId();

  const output =
    direction === DIRECTION.STRAIGHT_TO_CURLY
      ? toCurly(input)
      : toStraight(input);

  const handleCopy = async () => {
    try {
      await window.navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, COPY_FEEDBACK_DURATION_MS);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <main className="mx-auto w-full max-w-3xl p-6 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
        Quotation Mark Converter
      </h1>

      <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          aria-pressed={direction === DIRECTION.STRAIGHT_TO_CURLY}
          className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            direction === DIRECTION.STRAIGHT_TO_CURLY
              ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
          onClick={() => {
            setDirection(DIRECTION.STRAIGHT_TO_CURLY);
          }}
          type="button"
        >
          Straight → Curly
        </button>

        <button
          aria-pressed={direction === DIRECTION.CURLY_TO_STRAIGHT}
          className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            direction === DIRECTION.CURLY_TO_STRAIGHT
              ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
          onClick={() => {
            setDirection(DIRECTION.CURLY_TO_STRAIGHT);
          }}
          type="button"
        >
          Curly → Straight
        </button>
      </div>

      <label className="mb-2 block text-sm font-medium" htmlFor={inputId}>
        Input
      </label>
      <textarea
        autoFocus
        className="min-h-40 w-full resize-y rounded-lg border border-slate-300 bg-white p-4 font-serif text-base shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-700"
        id={inputId}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        placeholder="Paste or type text with straight or curly quotes..."
        value={input}
      />

      <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="block text-sm font-medium" htmlFor={outputId}>
          Output
        </label>

        <div className="flex gap-3">
          <button
            className="cursor-pointer rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
            disabled={!output}
            onClick={() => {
              void handleCopy();
            }}
            type="button"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            disabled={!input}
            onClick={handleClear}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>

      <textarea
        aria-readonly="true"
        className="min-h-40 w-full resize-y rounded-lg border border-slate-300 bg-slate-50 p-4 font-serif text-base focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-700"
        id={outputId}
        readOnly
        value={output}
      />
    </main>
  );
}
