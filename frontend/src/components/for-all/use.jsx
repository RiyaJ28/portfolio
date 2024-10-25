import React, { useRef , useEffect} from 'react';
import { motion, useMotionValue, useSpring, frame } from 'framer-motion';

// Define the spring configuration
const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

// Custom hook to follow pointer
function useFollowPointer(ref) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }) => {
      const element = ref.current;

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [ref, xPoint, yPoint]);

  return { x, y };
}

// Functional component that uses the custom hook
const FollowPointerComponent = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <motion.div
        ref={ref}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          borderRadius: '50%',
          position: 'absolute',
          x: x,
          y: y,
        }}
      />
    </div>
  );
};


export {FollowPointerComponent,   useFollowPointer};
