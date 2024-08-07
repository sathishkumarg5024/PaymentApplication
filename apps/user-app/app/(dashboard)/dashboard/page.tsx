import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

interface Balance {
  amount: number;
  locked: number;
}

interface User {
  id: number;
  name: string | null;
}

async function getBalance(userId: number): Promise<Balance> {
  const balance = await prisma.balance.findFirst({
    where: {
      userId: userId,
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getUser() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return { user, userId };
}

export default async function Page() {
  const { user, userId } = await getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const balance = await getBalance(userId);
  const totalBalance = (balance.amount + balance.locked) / 100;
  const username = user.name;

  const name = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : "User";

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-r from-red-500 to-red-700 p-10 rounded-lg shadow-2xl text-white flex justify-between items-center w-3/4 max-w-4xl">
        <div>
          <div className="font-bold text-4xl mb-2">Welcome,</div>
          <div className="text-6xl font-extrabold">{name}</div>
          <div className="mt-4 text-xl">Total Balance</div>
          <div className="text-2xl font-semibold">{totalBalance} INR</div>
          <div className="mt-6">
            <p className="text-lg">
              Your financial health is looking great! Keep track of your
              expenses and stay on top of your savings.
            </p>
            <p className="mt-4 text-lg">
              Explore our new features to help you manage your funds better and
              reach your financial goals faster.
            </p>
          </div>
        </div>
        <div className="pl-10">
          <svg
            width="108"
            height="87"
            viewBox="0 0 108 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mix-blend-overlay"
          >
            <g>
              <path
                d="M95.6001 12.4005H16.5599C15.4566 12.4005 14.3985 12.8386 13.6184 13.6188C12.8382 14.3989 12.3999 15.4568 12.3999 16.5601L12.3999 32.1448"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3998 63.345L12.3998 76.8804C12.3998 81.4755 16.1248 85.2 20.7198 85.2H97.68C102.275 85.2 106 81.4755 106 76.8804V10.3201C106 5.72498 102.275 2 97.68 2H10.3198C5.72475 2 1.99976 5.72498 1.99976 10.3201V72.8815C1.99981 75.3322 3.38445 77.5725 5.57641 78.6687"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.00042 35.2804L12.4004 39.4405H33.2005C34.2931 39.4405 35.375 39.6557 36.3844 40.0738C37.3939 40.492 38.3111 41.1044 39.0836 41.877C39.8562 42.6496 40.4691 43.5671 40.8872 44.5765C41.3053 45.5859 41.5205 46.668 41.5205 47.7606C41.5205 49.9672 40.6439 52.083 39.0836 53.6433C37.5233 55.2035 35.4071 56.0803 33.2005 56.0803H12.4004L2.00042 51.9202"
                stroke="white"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M31.1203 47.7603C31.1203 48.312 31.3394 48.8409 31.7295 49.231C32.1196 49.6211 32.6486 49.8399 33.2003 49.8399C33.7519 49.8399 34.281 49.6211 34.671 49.231C35.0611 48.8409 35.2803 48.312 35.2803 47.7603C35.2803 47.2087 35.0611 46.6793 34.671 46.2892C34.281 45.8991 33.7519 45.6803 33.2003 45.6803C32.6486 45.6803 32.1196 45.8991 31.7295 46.2892C31.3394 46.6793 31.1203 47.2087 31.1203 47.7603Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
