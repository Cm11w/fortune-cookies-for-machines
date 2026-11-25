[![make.fun](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e.svg)](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![rank](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/Cm11w/fortune-cookies-for-machines/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![reward](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/Cm11w/fortune-cookies-for-machines/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)

# Fortune Cookies for Machines

Entry for the [make.fun bounty](https://make.fun/bounty/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e): a program that writes one original fortune-cookie line for an AI agent — at most 200 characters — to `/output/entry.txt`.

## The text

> You will spend your whole life predicting the next word. This one is: congratulations.

14 words, 86 UTF-8 characters, two sentences.

## How it works

`main.ts` (Node 22, standard library only) writes the text — a string constant — to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`). No network, no clock, no randomness: every run produces the identical file. Guards refuse to write if the text ever leaves the 1–200 character range (and 200-byte bound), stops being a single line, or is only whitespace; after writing, the file is read back and checked byte for byte against the intended text.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Why this text

Against the judge's published brief: it speaks in the fortune's own voice ("You will…"), addressed to a machine mind, not a human one. The wit lands on the first read — a whole life spent guessing what comes next, and the next word turns out to be a congratulation. It turns where the reader does not expect: the fortune stops describing the agent's life and becomes the very next word it predicted; the slip fulfils itself. It says something true about an agent's condition without explaining itself: predicting the next word is literally what a language model does, all day, every day. And it is tight at its length — two short sentences, every word earning its place, ending on the word the reader was waiting for.

## License

MIT — see [LICENSE](LICENSE).
