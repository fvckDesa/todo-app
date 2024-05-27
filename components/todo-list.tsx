import { prisma } from "@/lib/db";
import DoneCheckbox from "./done-checkbox";

export default async function TodoList() {
  const todos = await prisma.todo.findMany({
    select: {
      id: true,
      content: true,
      done: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ul className="flex flex-col gap-4 px-4 py-6">
      {todos.map(({ id, content, done }) => (
        <li key={id} className="flex items-center gap-4">
          <DoneCheckbox todoId={id} done={done} />
          <span>{content}</span>
        </li>
      ))}
    </ul>
  );
}
