import { useEffect, useState } from "react";

export function useTypingEffect(words, typingSpeed = 90, deletingSpeed = 48, pause = 1250) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeWord = words[wordIndex] ?? "";
    const isWordComplete = !isDeleting && letterIndex === activeWord.length;
    const isWordCleared = isDeleting && letterIndex === 0;

    const timeout = window.setTimeout(
      () => {
        if (isWordComplete) {
          setIsDeleting(true);
          return;
        }

        if (isWordCleared) {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
          return;
        }

        setLetterIndex((current) => current + (isDeleting ? -1 : 1));
      },
      isWordComplete ? pause : isDeleting ? deletingSpeed : typingSpeed
    );

    return () => window.clearTimeout(timeout);
  }, [deletingSpeed, isDeleting, letterIndex, pause, typingSpeed, wordIndex, words]);

  return words[wordIndex]?.slice(0, letterIndex) ?? "";
}
