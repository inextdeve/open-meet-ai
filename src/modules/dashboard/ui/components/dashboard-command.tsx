import { Dispatch, SetStateAction, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { CommandEmpty } from "cmdk";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GeneratedAvatar } from "@/components/generated-avatar";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: meetings } = useQuery(
    trpc.meetings.getMany.queryOptions({ search, pageSize: 100 }),
  );

  const { data: agents } = useQuery(
    trpc.agents.getMany.queryOptions({ search, pageSize: 100 }),
  );

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        placeholder="Find a meeting or agent"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty>
            <span className="text-muted-foreground">No meetings found.</span>
          </CommandEmpty>
          {meetings?.items.map((meeting) => (
            <CommandItem
              key={meeting.id}
              onSelect={() => {
                router.push(`/dashboard/meetings/${meeting.id}`);
                setOpen(false);
              }}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Agents">
          <CommandEmpty>
            <span className="text-muted-foreground">No agents found.</span>
          </CommandEmpty>
          {agents?.items.map((agent) => (
            <CommandItem
              key={agent.id}
              onSelect={() => {
                router.push(`/dashboard/agents/${agent.id}`);
                setOpen(false);
              }}
            >
              <GeneratedAvatar seed={agent.name} variant="botttsNeutral" />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
