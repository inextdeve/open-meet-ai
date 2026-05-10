import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = db.select().from(agents);
    // await new Promise((solve) => setTimeout(solve, 5000));
    // throw new TRPCError({ code: "BAD_GATEWAY" });
    return data;
  }),
});
