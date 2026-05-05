import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        User Button
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Yassine</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
