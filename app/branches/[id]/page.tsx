
interface BranchDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BranchDetailPage({
  params,
}: BranchDetailPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Detail Cabang</h1>
      <p>ID Cabang: {id}</p>
    </main>
  );
}
