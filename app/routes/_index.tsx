import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'Bread.ai - Where Ideas Become Reality' }, 
    { name: 'description', content: 'Transform your ideas into production-ready applications with AI-powered development. Build, iterate, and deploy—all in your browser.' },
    { property: 'og:title', content: 'Bread.ai - AI-Powered Development Platform' },
    { property: 'og:description', content: 'Build full-stack applications with AI assistance. No setup required.' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
};

export const loader = () => json({});

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-bread-elements-background-depth-1 via-bread-elements-background-depth-2 to-bread-elements-background-depth-1">
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}