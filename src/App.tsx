import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';

function App() {
  return (
    <div id="canvas-container" className="relative">
      <Canvas>
        <Experience />
      </Canvas>
      <div className="sticker-cta ">
        <a
          href="https://www.redbubble.com/i/sticker/Codelynx-Logo-by-LynxBubble/155590705.EJUG5?asc=u"
          className="relative max-w-xs m-auto mb-4 max-sm:mx-4 inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <div className="absolute w-fit -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          Buy my sticker
        </a>
      </div>
    </div>
  );
}

export default App;
