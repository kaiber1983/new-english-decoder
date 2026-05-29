import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seedWords } from "@/lib/seedWords";
import { WordPageContent } from "@/components/WordPageContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seedWords.map((word) => ({ slug: word.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const word = seedWords.find((entry) => entry.slug === slug);

  if (!word) {
    return {};
  }

  return {
    title: `${word.word} in plain English`,
    description: `${word.word} means ${word.plainMeaning}. Logic English: ${word.logicMeaning}.`,
  };
}

export default async function WordPage({ params }: Props) {
  const { slug } = await params;
  const word = seedWords.find((entry) => entry.slug === slug);

  if (!word) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: word.word,
    description: `${word.word} means ${word.plainMeaning}. Logic English: ${word.logicMeaning}.`,
    inDefinedTermSet: "Logic English Decoder",
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <WordPageContent word={word} />
    </>
  );
}
