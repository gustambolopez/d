import { AnimatePresence, cubicBezier, motion } from 'framer-motion';

interface SendButtonProps {
  show: boolean;
  isStreaming?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const customEasingFn = cubicBezier(0.4, 0, 0.2, 1);

export function SendButton({ show, isStreaming, onClick }: SendButtonProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          className="absolute flex justify-center items-center top-[24px] right-[24px] p-3 bg-gradient-to-r from-bread-accent-500 to-bread-accent-600 hover:from-bread-accent-400 hover:to-bread-accent-500 text-white rounded-2xl w-12 h-12 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
          transition={{ ease: customEasingFn, duration: 0.17 }}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          onClick={(event) => {
            event.preventDefault();
            onClick?.(event);
          }}
        >
          <div className="text-xl relative">
            {!isStreaming ? (
              <div className="i-ph:paper-plane-tilt-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"></div>
            ) : (
              <div className="i-ph:stop-circle-bold"></div>
            )}
          </div>
          {!isStreaming && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          )}
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}