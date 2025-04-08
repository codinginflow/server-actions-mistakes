import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl space-y-8 px-4 py-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Common Server Action Mistakes</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          This demo app showcases common developer mistakes when using server
          actions in Next.js and React 19. Watch the video on the{" "}
          <a
            href="https://www.youtube.com/c/codinginflow?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4daa57] hover:underline"
          >
            Coding in Flow YouTube channel
          </a>
          .
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Client-Side Server Action Calls</CardTitle>
            <CardDescription>
              Learn why you need to wrap client-side server action calls in
              React transitions.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button asChild className="w-full" variant="default">
              <Link href="/comments/server/client-side-action">View Demo</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useActionState Hook</CardTitle>
            <CardDescription>
              Learn how to use server actions with React 19&apos;s
              useActionState hook.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button asChild className="w-full" variant="default">
              <Link href="/comments/server/use-action-state">View Demo</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Server Actions with React Query & Infinite Loading
            </CardTitle>
            <CardDescription>
              Learn how to use server actions with React Query and why you
              should never use server actions to fetch data.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button asChild className="w-full" variant="default">
              <Link href="/comments/infinite-loading">View Demo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
