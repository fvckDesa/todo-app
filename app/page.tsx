import NewTodo from "@/components/new-todo";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className="size-full flex flex-col items-center py-8 px-10">
      <header className="px-6 py-3">
        <h1 className="mx-auto text-6xl font-extrabold size-fit">TODO APP</h1>
      </header>
      <NewTodo />
      <TodoList />
    </div>
  );
}
