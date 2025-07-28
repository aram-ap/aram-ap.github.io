import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
const customTheme = {
  'code[class*="language-"]': {
    color: '#e6e6e6',
    background: 'transparent',
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    fontSize: '14px',
    lineHeight: '1.5',
  },
  'pre[class*="language-"]': {
    color: '#e6e6e6',
    background: '#1a1a1a',
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    fontSize: '14px',
    lineHeight: '1.5',
    padding: '16px',
    borderRadius: '8px',
    overflow: 'auto',
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#2a2a2a',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  comment: {
    color: '#6a737d',
  },
  prolog: {
    color: '#6a737d',
  },
  doctype: {
    color: '#6a737d',
  },
  cdata: {
    color: '#6a737d',
  },
  punctuation: {
    color: '#e6e6e6',
  },
  '.namespace': {
    opacity: 0.7,
  },
  property: {
    color: '#79b8ff',
  },
  tag: {
    color: '#79b8ff',
  },
  boolean: {
    color: '#f97583',
  },
  number: {
    color: '#f97583',
  },
  constant: {
    color: '#f97583',
  },
  symbol: {
    color: '#f97583',
  },
  deleted: {
    color: '#f97583',
  },
  selector: {
    color: '#b392f0',
  },
  'attr-name': {
    color: '#b392f0',
  },
  string: {
    color: '#85e89d',
  },
  char: {
    color: '#85e89d',
  },
  builtin: {
    color: '#85e89d',
  },
  inserted: {
    color: '#85e89d',
  },
  operator: {
    color: '#d1d5da',
  },
  entity: {
    color: '#d1d5da',
  },
  url: {
    color: '#d1d5da',
  },
  '.language-css .token.string': {
    color: '#d1d5da',
  },
  '.style .token.string': {
    color: '#d1d5da',
  },
  variable: {
    color: '#d1d5da',
  },
  atrule: {
    color: '#b392f0',
  },
  'attr-value': {
    color: '#85e89d',
  },
  function: {
    color: '#b392f0',
  },
  'class-name': {
    color: '#b392f0',
  },
  keyword: {
    color: '#f97583',
  },
  regex: {
    color: '#f97583',
  },
  important: {
    color: '#f97583',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};
import styled from 'styled-components';

const CodeBlock = styled.div`
  margin: ${(props) => props.theme.spacing.md} 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  /* Custom styling for the syntax highlighter */
  .react-syntax-highlighter {
    margin: 0 !important;
    border-radius: 8px !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    background: transparent !important;
  }
  
  /* Ensure proper overflow handling */
  pre {
    margin: 0 !important;
    padding: ${(props) => props.theme.spacing.md} !important;
    overflow-x: auto !important;
    word-wrap: break-word !important;
    white-space: pre-wrap !important;
    background: transparent !important;
  }
  
  /* Style the code content */
  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
    word-break: break-all !important;
    white-space: pre-wrap !important;
    overflow-wrap: break-word !important;
  }
  
  /* Hover effect for copy button */
  &:hover .copy-button {
    opacity: 1;
  }
`;

const InlineCode = styled.code`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.accent};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  word-break: break-all;
  white-space: pre-wrap;
`;

const CopyButton = styled(motion.button)`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: ${(props) => props.theme.colors.accentDark};
  }
  
  &.copied {
    background: #10b981;
  }
`;

const SyntaxHighlighterComponent = ({ children, className, ...props }) => {
  const [copied, setCopied] = useState(false);
  
  // Check if this is an inline code block
  if (!className) {
    return <InlineCode {...props}>{children}</InlineCode>;
  }

  // Extract language from className (format: language-{lang})
  const language = className.replace('language-', '');
  
  // If no language is specified, try to auto-detect or use 'text'
  const detectedLanguage = language || 'text';
  
  // Map common language aliases
  const languageMap = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'scss',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sql': 'sql',
    'bash': 'bash',
    'sh': 'bash',
    'shell': 'bash',
    'jsx': 'jsx',
    'tsx': 'tsx',
    'txt': 'text',
    'text': 'text',
    'plain': 'text',
    'plaintext': 'text',
  };
  
  // Enhanced language detection
  let finalLanguage = languageMap[detectedLanguage] || detectedLanguage;
  
  // Auto-detect language based on content patterns
  if (finalLanguage === 'text' || finalLanguage === '') {
    let content = children?.toString() || '';
    
    // Handle escaped newlines and normalize content
    content = content.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    
    // Detect file structure patterns (including with escaped newlines)
    if (content.includes('src/') || content.includes('components/') || content.includes('pages/') || 
        content.includes('styles/') || content.includes('.jsx') || content.includes('.js') || 
        content.includes('.css') || content.includes('.tsx')) {
      finalLanguage = 'bash'; // Use bash for file structures
    }
    // Detect JSON patterns
    else if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
      finalLanguage = 'json';
    }
    // Detect HTML patterns
    else if (content.includes('<') && content.includes('>')) {
      finalLanguage = 'html';
    }
    // Detect CSS patterns
    else if (content.includes('{') && content.includes('}') && content.includes(':')) {
      finalLanguage = 'css';
    }
    // Detect JavaScript patterns
    else if (content.includes('function') || content.includes('const') || content.includes('let') || content.includes('var')) {
      finalLanguage = 'javascript';
    }
    // Default to text if no patterns match
    else {
      finalLanguage = 'text';
    }
  }
  
  // Process content to handle escaped characters
  const contentString = typeof children === 'string' ? children : children?.toString() || '';
  const processedContent = contentString.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  
  // Handle copy functionality
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = processedContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <CodeBlock>
      <CopyButton
        className={`copy-button ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {copied ? <FiCheck /> : <FiCopy />}
        {copied ? 'Copied!' : 'Copy'}
      </CopyButton>
      <SyntaxHighlighter
        language={finalLanguage}
        style={customTheme}
        customStyle={{
          margin: 0,
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.5',
          background: 'transparent',
        }}
        wrapLongLines={true}
        showLineNumbers={false}
        {...props}
      >
        {processedContent}
      </SyntaxHighlighter>
    </CodeBlock>
  );
};

export default SyntaxHighlighterComponent; 