import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CrystalizedBall from './CrystalizedBall.tsx';
import './CrystalizedBall.css';

export default function App() {
  const [target, setTarget] = useState<HTMLElement | null>(() =>
    typeof document !== 'undefined' ? document.getElementById('reveal-crystal-ball') : null
  );

  useEffect(() => {
    if (!target) {
      const el = document.getElementById('reveal-crystal-ball');
      if (el) setTarget(el);
    }
  }, [target]);

  if (!target) return null;

  return createPortal(
    <CrystalizedBall
      preset="nebula"
      color="#9478FF"
      size={0.78}
      interactive={true}
      hoverStrength={0.85}
      intro={true}
      speed={1.2}
      dustSpeed={1.2}
      className="reveal-ball-canvas"
      style={{ width: '100%', height: '100%' }}
    />,
    target
  );
}
