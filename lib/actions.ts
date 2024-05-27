"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";

export interface ErrorMessage {
  error?: string;
}

export async function createTodo(data: FormData): Promise<ErrorMessage> {
  const content = data.get("content")?.toString() ?? "";

  if (content.length === 0) {
    return {
      error: "Content required",
    };
  }

  try {
    await prisma.todo.create({
      data: {
        content,
      },
    });
  } catch (e) {
    console.error(e);
    return {
      error: "Ops... Something went wrong",
    };
  }

  revalidatePath("/");

  return {};
}

export async function changeDoneState(todoId: number, done: boolean) {
  await prisma.todo.update({
    data: {
      done,
    },
    where: {
      id: todoId,
    },
  });

  revalidatePath("/");
}
