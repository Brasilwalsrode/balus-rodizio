import BuchungsanfragenPage, {
  metadata as buchungsMetadata,
  type BuchungsanfragenSearchParams,
} from "@/app/buchungsanfragen/page";

export const dynamic = "force-dynamic";
export const metadata = buchungsMetadata;

export default function AnfrageAliasPage(props: { searchParams: BuchungsanfragenSearchParams }) {
  return <BuchungsanfragenPage {...props} />;
}
