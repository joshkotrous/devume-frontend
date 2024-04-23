import React, { useEffect, useState, useRef } from 'react';

const ConsoleOutput: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      originalLog(...args); // Call original console.log
      setLogs(prevLogs => [...prevLogs, args.map(arg => JSON.stringify(arg)).join(' ')]);
    };

    return () => {
      console.log = originalLog; // Restore original console.log when component unmounts
    };
  }, []); 

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);
  
  return (
    <div className='absolute right-0 bottom-0 w-[275px]'>
      <h2>Console Output</h2>
      <div ref={containerRef} className='overflow-auto max-h-[100px]'>
        <ul>
            {logs.map((log, index) => (
            <li key={index}>{log}</li>
            ))}
        </ul>
      </div>

    </div>
  );
};

export default ConsoleOutput;
