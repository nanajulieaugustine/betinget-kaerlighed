import dynamic from "next/dynamic";

const SearchParams = dynamic(
  () => import("@/components/tidligere-versioner/SearchParams"),
  { ssr: true }
);

export default function TidligereVersioner() {
  return <SearchParams />;
}