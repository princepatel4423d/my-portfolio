import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "@phosphor-icons/react";

export default function MagneticButton({
  children = "Magnetic Button",
  className = "",
  strength = 0.4,
  maxOffset = 50,
  ...props
}) {
  const ref = useRef(null);
  const [target, setTarget] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [current, setCurrent] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    let frame;
    const animate = () => {
      setCurrent((prev) => {
        const lerp = (a, b, n) => a + (b - a) * n;
        return {
          x: lerp(prev.x, target.x, 0.1),
          y: lerp(prev.y, target.y, 0.1),
          rotateX: lerp(prev.rotateX, target.rotateX, 0.15),
          rotateY: lerp(prev.rotateY, target.rotateY, 0.15),
        };
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // Apply strength factor
      let moveX = offsetX * strength;
      let moveY = offsetY * strength;

      // Clamp so button doesn’t move too far
      moveX = Math.max(Math.min(moveX, maxOffset), -maxOffset);
      moveY = Math.max(Math.min(moveY, maxOffset), -maxOffset);

      const rotateX = (-offsetY / rect.height) * 10;
      const rotateY = (offsetX / rect.width) * 10;

      setTarget({ x: moveX, y: moveY, rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setTarget({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <button
      ref={ref}
      className={`flex items-center justify-center gap-1 px-6 py-4 rounded-full 
        bg-black text-white hover:bg-neutral-800 
        dark:bg-white dark:text-black dark:hover:bg-neutral-200
        transition-colors duration-200 cursor-pointer
        ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${current.x}px, ${current.y}px) rotateX(${current.rotateX}deg) rotateY(${current.rotateY}deg)`,
      }}
      {...props}
    >
      {children}
      <span>
        <ArrowRight size={18} />
      </span>
    </button>
  );
}

// 2. Gray Button
export function GrayButton({ children = "Gray Button", className = "", ...props }) {
  return (
    <button
      className={`
        px-6 py-3 rounded-full 
        bg-gray-300 text-black hover:bg-gray-400 
        dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

// 3. Blue Button
export function BlueButton({ children = "Blue Button", className = "", ...props }) {
  return (
    <button
      className={`
        px-6 py-3 rounded-full 
        bg-blue-600 text-white hover:bg-blue-700
        dark:bg-blue-500 dark:hover:bg-blue-400
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}