import { z } from "zod";

export const playerFormSchema = z.object({
  playerName: z.string().min(2, {
    message: "Player name must be at least 2 characters.",
  }),
  sports: z.string().min(1, {
    message: "Sports is required.",
  }),
  dateOfJoin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
});

export type PlayerFormValues = z.infer<typeof playerFormSchema>;
