"use client";

import { changeDoneState } from "@/lib/actions";
import { ChangeEvent } from "react";

interface DoneCheckboxProps {
  todoId: number;
  done: boolean;
}

export default function DoneCheckbox({ todoId, done }: DoneCheckboxProps) {
  async function handleClick(e: ChangeEvent<HTMLInputElement>) {
    await changeDoneState(todoId, e.target.checked);
  }

  return <input type="checkbox" onChange={handleClick} defaultChecked={done} />;
}
