"use client";

import { ErrorMessage, createTodo } from "@/lib/actions";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function NewTodo() {
  const ref = useRef<HTMLFormElement>(null);

  async function todoFormAction(_: ErrorMessage, data: FormData) {
    ref.current?.reset();
    return createTodo(data);
  }

  const [message, formAction] = useFormState(todoFormAction, {});
  const { pending } = useFormStatus();

  return (
    <form ref={ref} action={formAction} className="flex flex-col gap-2">
      <label className="font-semibold" htmlFor="content">
        New Todo
      </label>
      <div className="flex gap-4 items-center">
        <input
          className="px-4 py-2 border-2 rounded border-black focus:border-blue-500 transition-colors focus-visible:outline-none"
          id="content"
          name="content"
          autoComplete="off"
        />
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white hover:opacity-80 transition-opacity"
          disabled={pending}
        >
          Add
        </button>
      </div>
      {message && <p>{message.error}</p>}
    </form>
  );
}
