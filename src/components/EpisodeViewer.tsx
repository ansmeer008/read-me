import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';

interface EpisodeViewerProps {
  content: string;
}

const EpisodeViewer = ({ content }: EpisodeViewerProps) => {
  const MarkdownComponents: Components = {
    p({ children }) {
      return <p className="mb-6 last:mb-0 whitespace-pre-wrap">{children}</p>;
    },
    // 코드 블록 (```) 처리
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';

      const isBlock = !!match;

      return isBlock ? (
        <div className="my-8 shadow-xl rounded-lg overflow-hidden text-base font-mono">
          <div className="bg-[#1e1e1e] px-4 py-2 text-xs text-gray-400 border-b border-gray-700 flex justify-between">
            <span>{language.toUpperCase()} - SYSTEM CONSOLE</span>
            <span className="text-green-500">● Online</span>
          </div>
          <SyntaxHighlighter
          {...(props as any)}
            style={vscDarkPlus} 
            language={language}
            PreTag="div"
            customStyle={{ margin: 0, padding: '1.5rem', lineHeight: '1.5' }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        // 인라인 코드 (`) 처리
        <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-[0.9em]" {...props}>
          {children}
        </code>
      );
    },
    // 인용문 (>) 처리
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600 bg-blue-50 py-4 rounded-r">
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="markdown-viewer font-serif text-gray-800 leading-loose tracking-wide">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={MarkdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default EpisodeViewer;