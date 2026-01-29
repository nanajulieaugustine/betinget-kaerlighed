import dynamic from "next/dynamic";

const SearchParams = dynamic(
  () => import("@/components/tidligere-versioner/SearchParams"),
  { ssr: false }
);

export default function TidligereVersioner() {
  return <SearchParams />;
}