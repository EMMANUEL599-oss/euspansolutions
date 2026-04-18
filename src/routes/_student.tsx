import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "@/hooks/use-auth";
import { StudentLayout } from "@/components/StudentLayout";

export const Route = createFileRoute("/_student")({
  component: () => (
    <AuthProvider>
      <StudentLayout />
    </AuthProvider>
  ),
});
