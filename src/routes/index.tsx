import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4x4-raid" },
      { name: "description", content: "4x4-raid" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      4x4-raid
    </div>
  );
}
