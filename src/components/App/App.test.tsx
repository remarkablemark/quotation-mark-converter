import { act, fireEvent, render, screen } from '@testing-library/react';

import { App } from '.';

const writeText = vi.fn();

Object.defineProperty(window.navigator, 'clipboard', {
  configurable: true,
  value: {
    writeText,
  },
  writable: true,
});

describe('App component', () => {
  beforeEach(() => {
    writeText.mockClear();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders heading, input, output, and action buttons', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /quotation mark converter/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/input/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/output/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /straight → curly/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /curly → straight/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^copy$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('converts straight quotes to curly quotes by default', () => {
    render(<App />);

    const straightToCurlyButton = screen.getByRole('button', {
      name: /straight → curly/i,
    });
    fireEvent.click(straightToCurlyButton);

    const input = screen.getByLabelText(/input/i);
    fireEvent.change(input, {
      target: { value: '"A tiger can\'t change its stripes."' },
    });

    const output = screen.getByLabelText(/output/i);
    expect(output).toHaveValue('“A tiger can’t change its stripes.”');
  });

  it('toggles direction to convert curly quotes to straight quotes', () => {
    render(<App />);

    const curlyToStraightButton = screen.getByRole('button', {
      name: /curly → straight/i,
    });
    fireEvent.click(curlyToStraightButton);

    const input = screen.getByLabelText(/input/i);
    fireEvent.change(input, {
      target: { value: '“A tiger can’t change its stripes.”' },
    });

    const output = screen.getByLabelText(/output/i);
    expect(output).toHaveValue('"A tiger can\'t change its stripes."');
  });

  it('copies the output to clipboard', async () => {
    render(<App />);

    const input = screen.getByLabelText(/input/i);
    fireEvent.change(input, { target: { value: "'hello'" } });

    vi.useFakeTimers();

    const copyButton = screen.getByRole('button', { name: /^copy$/i });
    await act(async () => {
      await Promise.resolve();
      fireEvent.click(copyButton);
    });

    expect(writeText).toHaveBeenCalledWith('‘hello’');
    expect(copyButton).toHaveTextContent(/copied!/i);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(copyButton).toHaveTextContent(/^copy$/i);

    vi.useRealTimers();
  });

  it('clears input and output', () => {
    render(<App />);

    const input = screen.getByLabelText(/input/i);
    fireEvent.change(input, { target: { value: '"hello"' } });

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(screen.getByLabelText(/output/i)).toHaveValue('');
  });

  it('logs an error when copy fails', async () => {
    const error = new Error('Copy failed');
    writeText.mockRejectedValueOnce(error);
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    render(<App />);

    const input = screen.getByLabelText(/input/i);
    fireEvent.change(input, { target: { value: "'hello'" } });

    const copyButton = screen.getByRole('button', { name: /^copy$/i });
    await act(async () => {
      await Promise.resolve();
      fireEvent.click(copyButton);
    });

    expect(consoleError).toHaveBeenCalledWith(
      'Failed to copy to clipboard:',
      error,
    );

    consoleError.mockRestore();
  });
});
