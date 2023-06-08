import { prisma } from '@/lib/prisma';

export default async function page() {
  prisma.$connect();
  var user = await prisma.user.findFirst({ where: { name: 'yuumis father' } });
  return <div className="flex flex-row gap-8">hello working</div>;
}
