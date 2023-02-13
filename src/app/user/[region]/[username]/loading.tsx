export default async function page({
  params,
  searchParams,
}: {
  params: { region: string; username: string };
  searchParams: {};
}) {
  return (
    <div>
      <p>Loading user </p>
    </div>
  );
}
