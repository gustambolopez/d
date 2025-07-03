import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames(
        'flex items-center bg-gradient-to-r from-bread-elements-background-depth-1 to-bread-elements-background-depth-2 backdrop-blur-xl border-b px-6 py-4 h-[var(--header-height)] transition-all duration-300',
        {
          'border-transparent shadow-none': !chat.started,
          'border-bread-elements-borderColor shadow-lg shadow-bread-elements-shadow/5': chat.started,
        },
      )}
    >
      <div className="flex items-center gap-3 z-logo text-bread-elements-textPrimary cursor-pointer group">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-bread-accent-500 to-bread-accent-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-br from-bread-accent-500 to-bread-accent-600 rounded-sm"></div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-bread-orange-400 to-bread-orange-500 rounded-full animate-pulse"></div>
        </div>
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-bread-elements-textPrimary to-bread-elements-textSecondary bg-clip-text text-transparent hover:from-bread-accent-500 hover:to-bread-accent-600 transition-all duration-300">
          Bread.ai
        </a>
        <div className="px-2 py-1 bg-gradient-to-r from-bread-accent-500/10 to-bread-accent-600/10 rounded-full text-xs font-medium text-bread-accent-600 border border-bread-accent-500/20">
          Beta
        </div>
      </div>
      
      <span className="flex-1 px-6 truncate text-center text-bread-elements-textPrimary">
        <ClientOnly>{() => <ChatDescription />}</ClientOnly>
      </span>
      
      {chat.started && (
        <ClientOnly>
          {() => (
            <div className="mr-1">
              <HeaderActionButtons />
            </div>
          )}
        </ClientOnly>
      )}
    </header>
  );
}