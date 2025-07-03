import type { Message } from 'ai';
import React, { type RefCallback } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { Menu } from '~/components/sidebar/Menu.client';
import { IconButton } from '~/components/ui/IconButton';
import { Workbench } from '~/components/workbench/Workbench.client';
import { classNames } from '~/utils/classNames';
import { Messages } from './Messages.client';
import { SendButton } from './SendButton.client';

import styles from './BaseChat.module.scss';

interface BaseChatProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined;
  messageRef?: RefCallback<HTMLDivElement> | undefined;
  scrollRef?: RefCallback<HTMLDivElement> | undefined;
  showChat?: boolean;
  chatStarted?: boolean;
  isStreaming?: boolean;
  messages?: Message[];
  enhancingPrompt?: boolean;
  promptEnhanced?: boolean;
  input?: string;
  handleStop?: () => void;
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  enhancePrompt?: () => void;
}

const EXAMPLE_PROMPTS = [
  { text: 'Build a modern todo app with React and Tailwind CSS', icon: 'i-ph:list-checks-duotone' },
  { text: 'Create a beautiful landing page with animations', icon: 'i-ph:rocket-launch-duotone' },
  { text: 'Build a real-time chat application', icon: 'i-ph:chat-circle-duotone' },
  { text: 'Design a dashboard with charts and analytics', icon: 'i-ph:chart-line-up-duotone' },
  { text: 'Create a portfolio website with dark mode', icon: 'i-ph:user-circle-duotone' },
];

const TEXTAREA_MIN_HEIGHT = 76;

export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
  (
    {
      textareaRef,
      messageRef,
      scrollRef,
      showChat = true,
      chatStarted = false,
      isStreaming = false,
      enhancingPrompt = false,
      promptEnhanced = false,
      messages,
      input = '',
      sendMessage,
      handleInputChange,
      enhancePrompt,
      handleStop,
    },
    ref,
  ) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

    return (
      <div
        ref={ref}
        className={classNames(
          styles.BaseChat,
          'relative flex h-full w-full overflow-hidden bg-gradient-to-br from-bread-elements-background-depth-1 via-bread-elements-background-depth-2 to-bread-elements-background-depth-1',
        )}
        data-chat-visible={showChat}
      >
        <ClientOnly>{() => <Menu />}</ClientOnly>
        <div ref={scrollRef} className="flex overflow-y-auto w-full h-full">
          <div className={classNames(styles.Chat, 'flex flex-col flex-grow min-w-[var(--chat-min-width)] h-full')}>
            {!chatStarted && (
              <div id="intro" className="mt-[20vh] max-w-chat mx-auto text-center px-6">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-bread-accent-500 to-bread-accent-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 animate-float">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-bread-accent-500 to-bread-accent-600 rounded-xl"></div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-bread-accent-500/20 to-bread-accent-600/20 rounded-full blur-3xl -z-10"></div>
                </div>
                
                <h1 className="text-6xl font-bold bg-gradient-to-r from-bread-elements-textPrimary via-bread-accent-600 to-bread-elements-textPrimary bg-clip-text text-transparent mb-4 leading-tight">
                  Where ideas become
                  <span className="block bg-gradient-to-r from-bread-accent-500 to-bread-accent-600 bg-clip-text text-transparent">
                    reality
                  </span>
                </h1>
                <p className="text-xl text-bread-elements-textSecondary mb-8 max-w-2xl mx-auto leading-relaxed">
                  Transform your ideas into production-ready applications with AI-powered development. 
                  Build, iterate, and deploy—all in your browser.
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-bread-elements-background-depth-2/50 backdrop-blur-sm rounded-full border border-bread-elements-borderColor">
                    <div className="w-2 h-2 bg-bread-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-bread-elements-textSecondary">AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-bread-elements-background-depth-2/50 backdrop-blur-sm rounded-full border border-bread-elements-borderColor">
                    <div className="w-2 h-2 bg-bread-accent-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-bread-elements-textSecondary">Real-time</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-bread-elements-background-depth-2/50 backdrop-blur-sm rounded-full border border-bread-elements-borderColor">
                    <div className="w-2 h-2 bg-bread-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-bread-elements-textSecondary">No Setup</span>
                  </div>
                </div>
              </div>
            )}
            <div
              className={classNames('pt-6 px-6', {
                'h-full flex flex-col': chatStarted,
              })}
            >
              <ClientOnly>
                {() => {
                  return chatStarted ? (
                    <Messages
                      ref={messageRef}
                      className="flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-1"
                      messages={messages}
                      isStreaming={isStreaming}
                    />
                  ) : null;
                }}
              </ClientOnly>
              <div
                className={classNames('relative w-full max-w-chat mx-auto z-prompt', {
                  'sticky bottom-0': chatStarted,
                })}
              >
                <div
                  className={classNames(
                    'relative shadow-2xl border border-bread-elements-borderColor bg-bread-elements-prompt-background/80 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:border-bread-accent-500/30',
                  )}
                >
                  <textarea
                    ref={textareaRef}
                    className={`w-full pl-6 pt-6 pr-20 pb-4 focus:outline-none resize-none text-lg text-bread-elements-textPrimary placeholder-bread-elements-textTertiary bg-transparent leading-relaxed`}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        if (event.shiftKey) {
                          return;
                        }
                        event.preventDefault();
                        sendMessage?.(event);
                      }
                    }}
                    value={input}
                    onChange={(event) => {
                      handleInputChange?.(event);
                    }}
                    style={{
                      minHeight: TEXTAREA_MIN_HEIGHT,
                      maxHeight: TEXTAREA_MAX_HEIGHT,
                    }}
                    placeholder="Describe your app idea and watch it come to life..."
                    translate="no"
                  />
                  <ClientOnly>
                    {() => (
                      <SendButton
                        show={input.length > 0 || isStreaming}
                        isStreaming={isStreaming}
                        onClick={(event) => {
                          if (isStreaming) {
                            handleStop?.();
                            return;
                          }
                          sendMessage?.(event);
                        }}
                      />
                    )}
                  </ClientOnly>
                  <div className="flex justify-between items-center text-sm px-6 pb-4 pt-2">
                    <div className="flex gap-2 items-center">
                      <IconButton
                        title="Enhance prompt with AI"
                        disabled={input.length === 0 || enhancingPrompt}
                        className={classNames(
                          'bg-gradient-to-r from-bread-accent-500/10 to-bread-accent-600/10 hover:from-bread-accent-500/20 hover:to-bread-accent-600/20 border border-bread-accent-500/20 rounded-xl px-3 py-2 transition-all duration-200',
                          {
                            'opacity-100!': enhancingPrompt,
                            'bg-gradient-to-r from-bread-accent-500 to-bread-accent-600 text-white border-bread-accent-500': promptEnhanced,
                          },
                        )}
                        onClick={() => enhancePrompt?.()}
                      >
                        {enhancingPrompt ? (
                          <>
                            <div className="i-svg-spinners:90-ring-with-bg text-bread-accent-500 text-lg"></div>
                            <div className="ml-2 text-bread-accent-600 font-medium">Enhancing...</div>
                          </>
                        ) : (
                          <>
                            <div className="i-ph:sparkle-duotone text-lg text-bread-accent-600"></div>
                            {promptEnhanced && <div className="ml-2 font-medium">Enhanced!</div>}
                          </>
                        )}
                      </IconButton>
                    </div>
                    {input.length > 3 ? (
                      <div className="text-xs text-bread-elements-textTertiary flex items-center gap-1">
                        <kbd className="px-2 py-1 bg-bread-elements-background-depth-2 rounded-lg border border-bread-elements-borderColor text-xs">⇧</kbd>
                        <span>+</span>
                        <kbd className="px-2 py-1 bg-bread-elements-background-depth-2 rounded-lg border border-bread-elements-borderColor text-xs">↵</kbd>
                        <span>for new line</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="bg-gradient-to-t from-bread-elements-background-depth-1 to-transparent pb-6 h-6">{/* Ghost Element */}</div>
              </div>
            </div>
            {!chatStarted && (
              <div id="examples" className="relative w-full max-w-4xl mx-auto mt-12 px-6 pb-12">
                <h3 className="text-2xl font-semibold text-bread-elements-textPrimary mb-8 text-center">
                  Try these examples
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {EXAMPLE_PROMPTS.map((examplePrompt, index) => {
                    return (
                      <button
                        key={index}
                        onClick={(event) => {
                          sendMessage?.(event, examplePrompt.text);
                        }}
                        className="group flex items-start gap-4 p-6 bg-bread-elements-background-depth-2/50 backdrop-blur-sm hover:bg-bread-elements-background-depth-2 border border-bread-elements-borderColor hover:border-bread-accent-500/30 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-left"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-bread-accent-500/20 to-bread-accent-600/20 rounded-xl flex items-center justify-center group-hover:from-bread-accent-500/30 group-hover:to-bread-accent-600/30 transition-all duration-300">
                          <div className={classNames(examplePrompt.icon, 'text-xl text-bread-accent-600')} />
                        </div>
                        <div className="flex-1">
                          <p className="text-bread-elements-textPrimary group-hover:text-bread-accent-600 transition-colors duration-300 font-medium">
                            {examplePrompt.text}
                          </p>
                        </div>
                        <div className="i-ph:arrow-right text-bread-elements-textTertiary group-hover:text-bread-accent-600 transition-all duration-300 group-hover:translate-x-1" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <ClientOnly>{() => <Workbench chatStarted={chatStarted} isStreaming={isStreaming} />}</ClientOnly>
        </div>
      </div>
    );
  },
);