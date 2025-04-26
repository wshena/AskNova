import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '@/styles/markdownWrapper.module.css';

interface MarkdownWrapperProps {
  content: string;
}

const MarkdownWrapper: React.FC<MarkdownWrapperProps> = ({ content }) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default MarkdownWrapper;
