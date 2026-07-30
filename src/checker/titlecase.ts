import simpleLowercase from "@unicode/unicode-17.0.0/Simple_Case_Mapping/Lowercase/code-points.js";
import simpleTitlecase from "@unicode/unicode-17.0.0/Simple_Case_Mapping/Titlecase/code-points.js";
import specialLowercase from "@unicode/unicode-17.0.0/Special_Casing/Lowercase/code-points.js";
import finalSigmaLowercase from "@unicode/unicode-17.0.0/Special_Casing/Lowercase--Final_Sigma/code-points.js";
import specialTitlecase from "@unicode/unicode-17.0.0/Special_Casing/Titlecase/code-points.js";
import casedCodePoints from "@unicode/unicode-17.0.0/Binary_Property/Cased/code-points.js";
import caseIgnorableCodePoints from "@unicode/unicode-17.0.0/Binary_Property/Case_Ignorable/code-points.js";
import extendedPictographicCodePoints from "@unicode/unicode-17.0.0/Binary_Property/Extended_Pictographic/code-points.js";
import ALetterCodePoints from "@unicode/unicode-17.0.0/Word_Break/ALetter/code-points.js";
import CRCodePoints from "@unicode/unicode-17.0.0/Word_Break/CR/code-points.js";
import DoubleQuoteCodePoints from "@unicode/unicode-17.0.0/Word_Break/Double_Quote/code-points.js";
import ExtendCodePoints from "@unicode/unicode-17.0.0/Word_Break/Extend/code-points.js";
import ExtendNumLetCodePoints from "@unicode/unicode-17.0.0/Word_Break/ExtendNumLet/code-points.js";
import FormatCodePoints from "@unicode/unicode-17.0.0/Word_Break/Format/code-points.js";
import HebrewLetterCodePoints from "@unicode/unicode-17.0.0/Word_Break/Hebrew_Letter/code-points.js";
import KatakanaCodePoints from "@unicode/unicode-17.0.0/Word_Break/Katakana/code-points.js";
import LFCodePoints from "@unicode/unicode-17.0.0/Word_Break/LF/code-points.js";
import MidLetterCodePoints from "@unicode/unicode-17.0.0/Word_Break/MidLetter/code-points.js";
import MidNumCodePoints from "@unicode/unicode-17.0.0/Word_Break/MidNum/code-points.js";
import MidNumLetCodePoints from "@unicode/unicode-17.0.0/Word_Break/MidNumLet/code-points.js";
import NewlineCodePoints from "@unicode/unicode-17.0.0/Word_Break/Newline/code-points.js";
import NumericCodePoints from "@unicode/unicode-17.0.0/Word_Break/Numeric/code-points.js";
import RegionalIndicatorCodePoints from "@unicode/unicode-17.0.0/Word_Break/Regional_Indicator/code-points.js";
import SingleQuoteCodePoints from "@unicode/unicode-17.0.0/Word_Break/Single_Quote/code-points.js";
import WSegSpaceCodePoints from "@unicode/unicode-17.0.0/Word_Break/WSegSpace/code-points.js";
import ZWJCodePoints from "@unicode/unicode-17.0.0/Word_Break/ZWJ/code-points.js";
import commonCaseFold from "@unicode/unicode-17.0.0/Case_Folding/C/code-points.js";
import fullCaseFold from "@unicode/unicode-17.0.0/Case_Folding/F/code-points.js";

const sets = {
  aletter: new Set(ALetterCodePoints),
  cr: new Set(CRCodePoints),
  doubleQuote: new Set(DoubleQuoteCodePoints),
  extend: new Set(ExtendCodePoints),
  extendNumLet: new Set(ExtendNumLetCodePoints),
  format: new Set(FormatCodePoints),
  hebrew: new Set(HebrewLetterCodePoints),
  katakana: new Set(KatakanaCodePoints),
  lf: new Set(LFCodePoints),
  midLetter: new Set(MidLetterCodePoints),
  midNum: new Set(MidNumCodePoints),
  midNumLet: new Set(MidNumLetCodePoints),
  newline: new Set(NewlineCodePoints),
  numeric: new Set(NumericCodePoints),
  regionalIndicator: new Set(RegionalIndicatorCodePoints),
  singleQuote: new Set(SingleQuoteCodePoints),
  wsegSpace: new Set(WSegSpaceCodePoints),
  zwj: new Set(ZWJCodePoints),
  cased: new Set(casedCodePoints),
  caseIgnorable: new Set(caseIgnorableCodePoints),
  extendedPictographic: new Set(extendedPictographicCodePoints),
};

interface Point {
  value: number;
  text: string;
  start: number;
  end: number;
}

function points(text: string): Point[] {
  const result: Point[] = [];
  let offset = 0;
  for (const character of text) {
    const value = character.codePointAt(0);
    if (value === undefined) continue;
    result.push({ value, text: character, start: offset, end: offset + character.length });
    offset += character.length;
  }
  return result;
}

function isIgnored(value: number): boolean {
  return sets.extend.has(value) || sets.format.has(value) || sets.zwj.has(value);
}

function isNewline(value: number): boolean {
  return sets.cr.has(value) || sets.lf.has(value) || sets.newline.has(value);
}

function isAHLetter(value: number): boolean {
  return sets.aletter.has(value) || sets.hebrew.has(value);
}

function isMidLetterQ(value: number): boolean {
  return sets.midLetter.has(value) || sets.midNumLet.has(value) || sets.singleQuote.has(value);
}

function isMidNumQ(value: number): boolean {
  return sets.midNum.has(value) || sets.midNumLet.has(value) || sets.singleQuote.has(value);
}

function significant(pointsValue: Point[]): number[] {
  const result: number[] = [];
  for (let index = 0; index < pointsValue.length; index += 1) {
    const point = pointsValue[index];
    if (point !== undefined && !isIgnored(point.value)) result.push(index);
  }
  return result;
}

export function wordBoundaries(text: string): Set<number> {
  const codePoints = points(text);
  const boundaries = new Set<number>([0, text.length]);
  if (codePoints.length === 0) return boundaries;

  for (let index = 1; index < codePoints.length; index += 1) {
    const left = codePoints[index - 1];
    const right = codePoints[index];
    if (left === undefined || right === undefined) continue;
    if (sets.cr.has(left.value) && sets.lf.has(right.value)) continue;
    if (isNewline(left.value) || isNewline(right.value)) {
      boundaries.add(right.start);
      continue;
    }
    if (sets.zwj.has(left.value) && sets.extendedPictographic.has(right.value)) continue;
    if (sets.wsegSpace.has(left.value) && sets.wsegSpace.has(right.value)) continue;
    if (isIgnored(right.value)) continue;
  }

  const indexes = significant(codePoints);
  let regionalRun = 0;
  for (let position = 1; position < indexes.length; position += 1) {
    const leftIndex = indexes[position - 1];
    const rightIndex = indexes[position];
    if (leftIndex === undefined || rightIndex === undefined) continue;
    const left = codePoints[leftIndex];
    const right = codePoints[rightIndex];
    if (left === undefined || right === undefined) continue;
    if (isNewline(left.value) || isNewline(right.value)) continue;
    const rawPrevious = codePoints[rightIndex - 1];
    if (
      rawPrevious !== undefined &&
      sets.zwj.has(rawPrevious.value) &&
      sets.extendedPictographic.has(right.value)
    ) {
      continue;
    }
    const beforeIndex = indexes[position - 2];
    const afterIndex = indexes[position + 1];
    const before = beforeIndex === undefined ? undefined : codePoints[beforeIndex];
    const after = afterIndex === undefined ? undefined : codePoints[afterIndex];
    let noBreak =
      (isAHLetter(left.value) && isAHLetter(right.value)) ||
      (sets.hebrew.has(left.value) && sets.singleQuote.has(right.value)) ||
      (sets.numeric.has(left.value) && sets.numeric.has(right.value)) ||
      (isAHLetter(left.value) && sets.numeric.has(right.value)) ||
      (sets.numeric.has(left.value) && isAHLetter(right.value)) ||
      (sets.katakana.has(left.value) && sets.katakana.has(right.value)) ||
      ((isAHLetter(left.value) ||
        sets.numeric.has(left.value) ||
        sets.katakana.has(left.value) ||
        sets.extendNumLet.has(left.value)) &&
        sets.extendNumLet.has(right.value)) ||
      (sets.extendNumLet.has(left.value) &&
        (isAHLetter(right.value) || sets.numeric.has(right.value) || sets.katakana.has(right.value)));

    if (
      !noBreak &&
      before !== undefined &&
      isAHLetter(before.value) &&
      isMidLetterQ(left.value) &&
      isAHLetter(right.value)
    ) {
      noBreak = true;
    }
    if (
      !noBreak &&
      after !== undefined &&
      isAHLetter(left.value) &&
      isMidLetterQ(right.value) &&
      isAHLetter(after.value)
    ) {
      noBreak = true;
    }
    if (
      !noBreak &&
      before !== undefined &&
      sets.numeric.has(before.value) &&
      isMidNumQ(left.value) &&
      sets.numeric.has(right.value)
    ) {
      noBreak = true;
    }
    if (
      !noBreak &&
      after !== undefined &&
      sets.numeric.has(left.value) &&
      isMidNumQ(right.value) &&
      sets.numeric.has(after.value)
    ) {
      noBreak = true;
    }
    if (
      !noBreak &&
      before !== undefined &&
      sets.hebrew.has(before.value) &&
      sets.doubleQuote.has(left.value) &&
      sets.hebrew.has(right.value)
    ) {
      noBreak = true;
    }
    if (
      !noBreak &&
      after !== undefined &&
      sets.hebrew.has(left.value) &&
      sets.doubleQuote.has(right.value) &&
      sets.hebrew.has(after.value)
    ) {
      noBreak = true;
    }

    if (sets.regionalIndicator.has(left.value)) {
      regionalRun = position === 1 || !sets.regionalIndicator.has(codePoints[indexes[position - 2] ?? -1]?.value ?? -1)
        ? 1
        : regionalRun + 1;
      if (sets.regionalIndicator.has(right.value) && regionalRun % 2 === 1) noBreak = true;
    } else {
      regionalRun = 0;
    }
    if (!noBreak) boundaries.add(right.start);
  }
  return boundaries;
}

function mapPoint(mapping: Map<number, number>, special: Map<number, number[]>, value: number): string {
  const sequence = special.get(value);
  if (sequence !== undefined) return String.fromCodePoint(...sequence);
  return String.fromCodePoint(mapping.get(value) ?? value);
}

function isFinalSigma(codePoints: Point[], index: number, start: number, end: number): boolean {
  let hasCasedBefore = false;
  for (let cursor = index - 1; cursor >= start; cursor -= 1) {
    const value = codePoints[cursor]?.value;
    if (value === undefined) continue;
    if (sets.caseIgnorable.has(value)) continue;
    hasCasedBefore = sets.cased.has(value);
    break;
  }
  if (!hasCasedBefore) return false;
  for (let cursor = index + 1; cursor < end; cursor += 1) {
    const value = codePoints[cursor]?.value;
    if (value === undefined) continue;
    if (sets.caseIgnorable.has(value)) continue;
    return !sets.cased.has(value);
  }
  return true;
}

export interface ProtectedRange {
  start: number;
  end: number;
}

export function protectedCanonicalRanges(
  text: string,
  terms: readonly string[],
  existing: readonly ProtectedRange[] = [],
): ProtectedRange[] {
  const boundaries = wordBoundaries(text);
  const occupied = [...existing];
  const ordered = [...terms].sort((left, right) => right.length - left.length || left.localeCompare(right));
  for (let start = 0; start < text.length; start += 1) {
    if (!boundaries.has(start)) continue;
    for (const term of ordered) {
      const end = start + term.length;
      if (
        text.startsWith(term, start) &&
        boundaries.has(end) &&
        !occupied.some((range) => start < range.end && end > range.start)
      ) {
        occupied.push({ start, end });
        break;
      }
    }
  }
  return occupied;
}

export function toUnicode17TitleCase(
  text: string,
  protectedRanges: readonly ProtectedRange[] = [],
): string {
  const codePoints = points(text);
  const boundaries = [...wordBoundaries(text)].sort((left, right) => left - right);
  let output = "";
  for (let boundaryIndex = 0; boundaryIndex < boundaries.length - 1; boundaryIndex += 1) {
    const startOffset = boundaries[boundaryIndex];
    const endOffset = boundaries[boundaryIndex + 1];
    if (startOffset === undefined || endOffset === undefined) continue;
    const start = codePoints.findIndex((point) => point.start >= startOffset);
    let end = codePoints.findIndex((point) => point.start >= endOffset);
    if (start < 0) continue;
    if (end < 0) end = codePoints.length;
    let firstCased = true;
    for (let index = start; index < end; index += 1) {
      const point = codePoints[index];
      if (point === undefined) continue;
      const isProtected = protectedRanges.some(
        (range) => point.start < range.end && point.end > range.start,
      );
      if (isProtected || !sets.cased.has(point.value)) {
        output += point.text;
        continue;
      }
      if (firstCased) {
        output += mapPoint(simpleTitlecase, specialTitlecase, point.value);
        firstCased = false;
      } else if (point.value === 0x03a3 && isFinalSigma(codePoints, index, start, end)) {
        const final = finalSigmaLowercase.get(point.value);
        output += final === undefined ? "\u03c2" : String.fromCodePoint(...final);
      } else {
        output += mapPoint(simpleLowercase, specialLowercase, point.value);
      }
    }
  }
  return output;
}

export function defaultCaseless(value: string): string {
  let result = "";
  for (const character of value.normalize("NFD")) {
    const point = character.codePointAt(0);
    if (point === undefined) continue;
    const full = fullCaseFold.get(point);
    if (full !== undefined) result += String.fromCodePoint(...full);
    else result += String.fromCodePoint(commonCaseFold.get(point) ?? point);
  }
  return result.normalize("NFD");
}
