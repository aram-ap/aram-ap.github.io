import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiEye, FiEdit3, FiEyeOff, FiType, FiHash, FiTrash2, FiMaximize2, FiMinimize2, FiBold, FiItalic, FiList, FiLink, FiImage, FiCode, FiMessageSquare, FiMove } from "react-icons/fi";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { search } from "@codemirror/search";
import { StreamLanguage } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighterComponent from "./SyntaxHighlighter";
import { initVimMode } from "monaco-vim";

/**
 * MarkdownEditor - Advanced markdown editor with live preview
 * Features: syntax highlighting, Vim mode, fullscreen, resizable panels, toolbar
 * Supports: edit/preview/split modes, keyboard shortcuts, markdown formatting
 */

const EditorContainer = styled.div`
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  height: ${(props) => props.height || '500px'};
  width: ${(props) => props.isFullscreen ? 'calc(100vw - 40px)' : '100%'};
  margin: ${(props) => props.isFullscreen ? '20px auto' : '0'};
  max-width: ${(props) => props.isFullscreen ? 'none' : 'none'};
  position: relative;
  ${(props) => props.$isFullscreen && `
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    z-index: 9999;
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    margin: 0;
    max-width: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 2px solid ${props.theme.colors.accent};
  `}
`;

const VerticalResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: ${(props) => props.theme.colors.border};
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  z-index: 10;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
  }

  &::after {
    content: '';
    width: 30px;
    height: 2px;
    background: ${(props) => props.theme.colors.textSecondary};
    border-radius: 1px;
  }

  ${(props) => props.$isFullscreen && `
    display: none;
  `}
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const EditorStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const EditorTitle = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background: ${(props) => props.variant === 'danger' ? '#ef4444' : props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.variant === 'danger' ? '#dc2626' : props.theme.colors.accentDark};
  }

  &.active {
    background: ${(props) => props.theme.colors.accentDark};
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  flex-wrap: wrap;
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
    color: white;
    border-color: ${(props) => props.theme.colors.accent};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const PanelContainer = styled.div`
  height: 100%;
  background: ${(props) => props.theme.colors.backgroundTertiary};
`;

const ResizeHandle = styled(PanelResizeHandle)`
  background: ${(props) => props.theme.colors.border};
  width: 4px;
  cursor: col-resize;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
  }

  &[data-resize-handle-active] {
    background: ${(props) => props.theme.colors.accent};
  }
`;

const PreviewPanel = styled.div`
  height: 100%;
  padding: ${(props) => props.theme.spacing.md};
  overflow-y: auto;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.text};
  line-height: 1.6;

  /* Markdown content styling */
  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  h1 { font-size: 1.8em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.3em; }
  
  p {
    margin-bottom: 1em;
    line-height: 1.6;
  }
  
  ul, ol {
    margin-bottom: 1em;
    padding-left: 2em;
  }
  
  li {
    margin-bottom: 0.5em;
  }
  
  code {
    background: ${(props) => props.theme.colors.backgroundSecondary};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
    word-break: break-all;
    white-space: pre-wrap;
  }
  
  pre {
    background: transparent;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1em;
    max-width: 100%;
    
    /* Ensure code blocks don't overflow horizontally */
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  
  pre code {
    background: none;
    padding: 0;
    word-break: break-all;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    max-width: 100%;
  }
  
  blockquote {
    border-left: 4px solid ${(props) => props.theme.colors.accent};
    padding-left: 1em;
    margin: 1em 0;
    font-style: italic;
  }
  
  a {
    color: ${(props) => props.theme.colors.accent};
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  strong {
    font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  }
  
  em {
    font-style: italic;
  }
`;

const VimCommandLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing.sm};
  display: ${(props) => props.$visible ? 'block' : 'none'};
  z-index: 1000;
`;

const CommandInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  outline: none;
  
  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const FullscreenBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: ${(props) => props.$visible ? 'block' : 'none'};
`;

const MarkdownEditor = ({ value, onChange, placeholder = "Write your content in markdown..." }) => {
  const [viewMode, setViewMode] = useState("split"); // "edit", "preview", "split"
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [vimMode, setVimMode] = useState(false);
  const [showCommandLine, setShowCommandLine] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [editorHeight, setEditorHeight] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [originalScrollPosition, setOriginalScrollPosition] = useState(0);
  const editorRef = useRef(null);
  const vimModeRef = useRef(null);
  const commandInputRef = useRef(null);

  const handleViewToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMode === "edit") {
      setViewMode("split");
    } else if (viewMode === "preview") {
      setViewMode("edit");
    } else {
      setViewMode("preview");
    }
  };

  const getViewModeText = () => {
    switch (viewMode) {
      case "edit":
        return "Edit";
      case "preview":
        return "Preview";
      case "split":
        return "Split";
      default:
        return "Split";
    }
  };

  const getViewModeIcon = () => {
    switch (viewMode) {
      case "edit":
        return <FiType />;
      case "preview":
        return <FiEdit3 />;
      case "split":
        return <FiEye />;
      default:
        return <FiType />;
    }
  };

  // Calculate word and character count
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  // Handle content change
  const handleContentChange = useCallback((val) => {
    onChange(val);
  }, [onChange]);

  // Handle clear content
  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to clear all content?")) {
      onChange("");
    }
  };

  // Handle fullscreen toggle
  const handleFullscreen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    
    setTimeout(() => {
      const editorElement = document.querySelector('.editor-container');
      if (editorElement) {
        if (newFullscreenState) {
          // Store current scroll position before entering fullscreen
          setOriginalScrollPosition(window.pageYOffset);
          // Scroll to editor when entering fullscreen
          editorElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        } else {
          // Scroll back to original position when exiting fullscreen
          window.scrollTo({
            top: originalScrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100); // Small delay to ensure the fullscreen state is applied
  };

  // Handle Vim mode toggle
  const handleVimToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVimMode(!vimMode);
  };

  // Handle vertical resize
  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  const handleResizeMove = useCallback((e) => {
    if (!isResizing) return;
    
    const container = document.querySelector('.editor-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;
    const minHeight = 500;
    
    if (newHeight >= minHeight) {
      setEditorHeight(newHeight);
    }
  }, [isResizing]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Add global mouse event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // Handle command line
  const handleCommandKey = (e) => {
    if (vimMode && e.key === ':') {
      e.preventDefault();
      setShowCommandLine(true);
      setTimeout(() => commandInputRef.current?.focus(), 0);
    }
  };

  // Handle command execution
  const handleCommandExecute = (e) => {
    if (e.key === 'Enter') {
      const command = commandInput.trim();
      setCommandInput("");
      setShowCommandLine(false);
      
      switch (command) {
        case 'bd':
          handleFormatToggle('bold');
          break;
        case 'it':
          handleFormatToggle('italic');
          break;
        case 'ul':
          handleFormatToggle('underline');
          break;
        case 'q':
          setShowCommandLine(false);
          break;
        default:
          // Unknown command
          break;
      }
    } else if (e.key === 'Escape') {
      setCommandInput("");
      setShowCommandLine(false);
    }
  };

  // Handle format toggling with better logic
  const handleFormatToggle = (formatType) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selection = editor.getSelection();
    const model = editor.getModel();
    
    if (!selection) {
      // No selection - insert format markers at cursor
      const position = editor.getPosition();
      const markers = {
        'bold': '**',
        'italic': '*',
        'underline': '__'
      };
      const marker = markers[formatType];
      const newText = `${marker}${marker}`;
      
      editor.executeEdits('format-toggle', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: newText
      }]);
      return;
    }

    // Handle selected text
    const selectedText = model.getValueInRange(selection);
    const lineText = model.getLineContent(selection.startLineNumber);
    const start = selection.startColumn;
    const end = selection.endColumn;
    
    // Define format patterns and their markers
    const formatPatterns = {
      'bold': { pattern: /\*\*(.*?)\*\*/g, marker: '**', regex: /\*\*(.*?)\*\*/g },
      'italic': { pattern: /\*(.*?)\*/g, marker: '*', regex: /\*(.*?)\*/g },
      'underline': { pattern: /__(.*?)__/g, marker: '__', regex: /__(.*?)__/g }
    };
    
    const currentFormat = formatPatterns[formatType];
    const selectedTextInLine = lineText.substring(start - 1, end - 1);
    
    // Check if the selected text is already wrapped in this exact format
    const exactFormatRegex = new RegExp(`^${currentFormat.marker.replace(/\*/g, '\\*').replace(/_/g, '_')}(.*)${currentFormat.marker.replace(/\*/g, '\\*').replace(/_/g, '_')}$`);
    const isExactMatch = exactFormatRegex.test(selectedTextInLine);
    
    let newText = '';
    
    if (isExactMatch) {
      // Remove this specific formatting
      const innerText = selectedTextInLine.replace(exactFormatRegex, '$1');
      newText = innerText;
    } else {
      // Add this formatting, but handle nested formatting intelligently
      let textToFormat = selectedTextInLine;
      
      // Remove any existing formatting of this type that might be inside
      textToFormat = textToFormat.replace(currentFormat.regex, '$1');
      
      // Now add the new formatting
      newText = `${currentFormat.marker}${textToFormat}${currentFormat.marker}`;
    }

    editor.executeEdits('format-toggle', [{
      range: selection,
      text: newText
    }]);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    // Handle Vim command line
    if (vimMode) {
      handleCommandKey(e);
      return;
    }

    // Only handle shortcuts when not in Vim mode
    const isCtrl = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    if (isCtrl) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleFormatToggle('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormatToggle('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormatToggle('underline');
          break;
        case 'k':
          e.preventDefault();
          handleFormatAction('link');
          break;
        case 'shift+k':
          e.preventDefault();
          handleFormatAction('code');
          break;
        case 'shift+i':
          e.preventDefault();
          handleFormatAction('image');
          break;
        case 'shift+l':
          e.preventDefault();
          handleFormatAction('list');
          break;
        case 'shift+q':
          e.preventDefault();
          handleFormatAction('quote');
          break;
        case '1':
          e.preventDefault();
          handleFormatAction('h1');
          break;
        case '2':
          e.preventDefault();
          handleFormatAction('h2');
          break;
        case '3':
          e.preventDefault();
          handleFormatAction('h3');
          break;
      }
    }
  }, [vimMode]);

  // Handle format actions (for non-toggle formatting)
  const handleFormatAction = (action) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selection = editor.getSelection();
    const selectedText = selection ? editor.getModel().getValueInRange(selection) : '';
    
    let replacement = '';

    switch (action) {
      case 'code':
        replacement = `\`${selectedText || 'code'}\``;
        break;
      case 'link':
        replacement = `[${selectedText || 'link text'}](url)`;
        break;
      case 'image':
        replacement = `![${selectedText || 'alt text'}](image-url)`;
        break;
      case 'list':
        replacement = `- ${selectedText || 'list item'}`;
        break;
      case 'quote':
        replacement = `> ${selectedText || 'quote'}`;
        break;
      case 'h1':
        replacement = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        replacement = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'h3':
        replacement = `### ${selectedText || 'Heading 3'}`;
        break;
      default:
        return;
    }

    if (selection) {
      editor.executeEdits('format-action', [{
        range: selection,
        text: replacement
      }]);
    } else {
      const position = editor.getPosition();
      editor.executeEdits('format-action', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: replacement
      }]);
    }
  };

  // Handle toolbar actions
  const handleToolbarAction = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (['bold', 'italic', 'underline'].includes(action)) {
      handleFormatToggle(action);
    } else {
      handleFormatAction(action);
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    
    // Initialize Vim mode if enabled
    if (vimMode) {
      vimModeRef.current = initVimMode(editor);
    }
  };

  // Monaco Editor options
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    lineNumbers: "on",
    wordWrap: "on",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    theme: "vs-dark",
  };

  // Effect to handle Vim mode changes
  useEffect(() => {
    if (editorRef.current) {
      if (vimMode && !vimModeRef.current) {
        vimModeRef.current = initVimMode(editorRef.current);
      } else if (!vimMode && vimModeRef.current) {
        vimModeRef.current.dispose();
        vimModeRef.current = null;
      }
    }
  }, [vimMode]);

  // Effect to add keyboard event listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Only handle if editor is focused
      if (document.activeElement === editorRef.current?.getDomNode()) {
        handleKeyDown(e);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleKeyDown]);

  // Render markdown preview
  const renderMarkdownPreview = () => {
    return (
      <PreviewPanel>
        <ReactMarkdown
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              return (
                <SyntaxHighlighterComponent
                  className={inline ? undefined : className}
                  {...props}
                >
                  {children}
                </SyntaxHighlighterComponent>
              );
            },
          }}
        >
          {value}
        </ReactMarkdown>
      </PreviewPanel>
    );
  };

  return (
    <>
      <FullscreenBackdrop $visible={isFullscreen} />
      <EditorContainer
        className="editor-container"
        $isFullscreen={isFullscreen}
        height={`${editorHeight}px`}
      >
      <EditorHeader>
        <div>
          <EditorTitle>Markdown Editor</EditorTitle>
          <EditorStats>
            <StatItem>
              <FiType />
              {wordCount} words
            </StatItem>
            <StatItem>
              <FiHash />
              {charCount} chars
            </StatItem>
          </EditorStats>
        </div>
        <ButtonGroup>
          <ActionButton
            onClick={handleVimToggle}
            className={vimMode ? 'active' : ''}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiCode />
            {vimMode ? 'Vim' : 'Normal'}
          </ActionButton>
          <ActionButton
            onClick={handleFullscreen}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </ActionButton>
          <ActionButton
            variant="danger"
            onClick={handleClear}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiTrash2 />
            Clear
          </ActionButton>
          <ActionButton
            onClick={handleViewToggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {getViewModeIcon()}
            {getViewModeText()}
          </ActionButton>
        </ButtonGroup>
      </EditorHeader>

      {(viewMode === "edit" || viewMode === "split") && (
        <Toolbar>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'h1')} title="Heading 1 (Ctrl+1)">H1</ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'h2')} title="Heading 2 (Ctrl+2)">H2</ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'h3')} title="Heading 3 (Ctrl+3)">H3</ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'bold')} title="Bold (Ctrl+B)"><FiBold /></ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'italic')} title="Italic (Ctrl+I)"><FiItalic /></ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'underline')} title="Underline (Ctrl+U)">U</ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'code')} title="Code (Ctrl+Shift+K)"><FiCode /></ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'link')} title="Link (Ctrl+K)"><FiLink /></ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'image')} title="Image (Ctrl+Shift+I)"><FiImage /></ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'list')} title="List (Ctrl+Shift+L)"><FiList /></ToolbarButton>
          <ToolbarButton onClick={(e) => handleToolbarAction(e, 'quote')} title="Quote (Ctrl+Shift+Q)"><FiMessageSquare /></ToolbarButton>
        </Toolbar>
      )}
      
      {viewMode === "edit" && (
        <PanelContainer>
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={value}
            onChange={handleContentChange}
            onMount={handleEditorDidMount}
            options={editorOptions}
            placeholder={placeholder}
          />
        </PanelContainer>
      )}

      {viewMode === "preview" && (
        <PanelContainer>
          {renderMarkdownPreview()}
        </PanelContainer>
      )}

      {viewMode === "split" && (
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={20}>
            <PanelContainer>
              <Editor
                height="100%"
                defaultLanguage="markdown"
                value={value}
                onChange={handleContentChange}
                onMount={handleEditorDidMount}
                options={editorOptions}
                placeholder={placeholder}
              />
            </PanelContainer>
          </Panel>
          <ResizeHandle />
          <Panel defaultSize={50} minSize={20}>
            {renderMarkdownPreview()}
          </Panel>
        </PanelGroup>
      )}

      <VimCommandLine $visible={showCommandLine}>
        <CommandInput
          ref={commandInputRef}
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleCommandExecute}
          placeholder="Enter Vim command (bd, it, ul, q)"
        />
      </VimCommandLine>

      <VerticalResizeHandle 
        $isFullscreen={isFullscreen} 
        onMouseDown={handleResizeStart}
      />
    </EditorContainer>
    </>
  );
};

export default MarkdownEditor; 