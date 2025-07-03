import { useStore } from '@nanostores/react';
import { chatStore } from '~/lib/stores/chat';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';

interface HeaderActionButtonsProps {}

export function HeaderActionButtons({}: HeaderActionButtonsProps) {
  const showWorkbench = useStore(workbenchStore.showWorkbench);
  const { showChat } = useStore(chatStore);

  const canHideChat = showWorkbench || !showChat;

  return (
    <div className="flex">
      <div className="flex bg-bread-elements-background-depth-2/50 backdrop-blur-sm border border-bread-elements-borderColor rounded-2xl overflow-hidden shadow-lg">
        <Button
          active={showChat}
          disabled={!canHideChat}
          onClick={() => {
            if (canHideChat) {
              chatStore.setKey('showChat', !showChat);
            }
          }}
        >
          <div className="i-ph:chat-circle-duotone text-lg" />
          <span className="hidden sm:inline">Chat</span>
        </Button>
        <div className="w-px bg-bread-elements-borderColor" />
        <Button
          active={showWorkbench}
          onClick={() => {
            if (showWorkbench && !showChat) {
              chatStore.setKey('showChat', true);
            }
            workbenchStore.showWorkbench.set(!showWorkbench);
          }}
        >
          <div className="i-ph:code-bold text-lg" />
          <span className="hidden sm:inline">Code</span>
        </Button>
      </div>
    </div>
  );
}

interface ButtonProps {
  active?: boolean;
  disabled?: boolean;
  children?: any;
  onClick?: VoidFunction;
}

function Button({ active = false, disabled = false, children, onClick }: ButtonProps) {
  return (
    <button
      className={classNames(
        'flex items-center gap-2 px-4 py-2.5 font-medium text-sm transition-all duration-200 relative overflow-hidden',
        {
          'bg-transparent hover:bg-bread-elements-item-backgroundActive text-bread-elements-textTertiary hover:text-bread-elements-textPrimary':
            !active && !disabled,
          'bg-gradient-to-r from-bread-accent-500 to-bread-accent-600 text-white shadow-lg': active && !disabled,
          'bg-bread-elements-item-backgroundDefault text-bread-elements-textTertiary/50 cursor-not-allowed': disabled,
        },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-bread-accent-400/20 to-bread-accent-600/20 animate-pulse" />
      )}
      <div className="relative z-10 flex items-center gap-2">
        {children}
      </div>
    </button>
  );
}