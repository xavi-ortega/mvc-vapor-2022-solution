import { SorterButton } from "./SorterButton";

export function SorterButtons() {
  return (
    <div>
      Sort by: <SorterButton name="title" />
      <SorterButton name="year" />
      <SorterButton name="genre" />
    </div>
  );
}
