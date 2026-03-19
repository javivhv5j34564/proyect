import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';

export default function SurprisePage() {
    const navigate = useNavigate();

    useSEO({
        title: 'Rolling the Dice... | AI Directory',
        description: 'Finding a random AI tool to surprise you with.'
    });

    useEffect(() => {
        // Roll dice for 2.5 seconds, then pick a random tool and redirect
        const timer = setTimeout(() => {
            const randomTool = tools[Math.floor(Math.random() * tools.length)];
            navigate(`/tool/${randomTool.id}`, { replace: true });
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
            <style>
                {`
                .dice-scene {
                    width: 120px;
                    height: 120px;
                    perspective: 600px;
                    margin: 0 auto 3rem auto;
                }
                .dice-cube {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                    animation: roll-dice 2.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                .dice-face {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 20px;
                    display: grid;
                    grid-template-areas:
                        "a e c"
                        "f g h"
                        "d i b";
                    padding: 16px;
                    gap: 8px;
                    box-shadow: inset 0 0 15px rgba(0,0,0,0.1);
                }
                .dark .dice-face {
                    background: #1e293b;
                    border-color: #334155;
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                }
                .dot {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: #f43f5e;
                    box-shadow: inset 0 3px 6px rgba(0,0,0,0.2);
                }
                .dark .dot { background-color: #f43f5e; box-shadow: inset 0 3px 6px rgba(0,0,0,0.5); }
                
                .front  { transform: rotateY(   0deg ) translateZ( 60px ); }
                .right  { transform: rotateY(  90deg ) translateZ( 60px ); }
                .back   { transform: rotateY( 180deg ) translateZ( 60px ); }
                .left   { transform: rotateY( -90deg ) translateZ( 60px ); }
                .top    { transform: rotateX(  90deg ) translateZ( 60px ); }
                .bottom { transform: rotateX( -90deg ) translateZ( 60px ); }
                
                @keyframes roll-dice {
                    0% { transform: translateZ(-100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.5); }
                    30% { transform: translateZ(100px) rotateX(360deg) rotateY(720deg) rotateZ(180deg) scale(1.5); }
                    70% { transform: translateZ(50px) rotateX(720deg) rotateY(1080deg) rotateZ(360deg) scale(1.2); }
                    100% { transform: translateZ(0px) rotateX(1080deg) rotateY(1440deg) rotateZ(540deg) scale(1); }
                }

                .dot:nth-child(1) { grid-area: a; }
                .dot:nth-child(2) { grid-area: b; }
                .dot:nth-child(3) { grid-area: c; }
                .dot:nth-child(4) { grid-area: d; }
                .dot:nth-child(5) { grid-area: e; }
                .dot:nth-child(6) { grid-area: f; }
                .dot:nth-child(7) { grid-area: h; }
                .dot:nth-child(8) { grid-area: i; }
                .dot:nth-child(9) { grid-area: g; }
                `}
            </style>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-500/10 dark:to-accent-500/5 animate-pulse"></div>

            <div className="z-10 text-center">
                <div className="dice-scene">
                    <div className="dice-cube">
                        <div className="dice-face front">
                            <span className="dot" style={{gridArea: 'g'}}></span>
                        </div>
                        <div className="dice-face back">
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'b'}}></span>
                            <span className="dot" style={{gridArea: 'c'}}></span>
                            <span className="dot" style={{gridArea: 'd'}}></span>
                        </div>
                        <div className="dice-face right">
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'g'}}></span>
                            <span className="dot" style={{gridArea: 'b'}}></span>
                        </div>
                        <div className="dice-face left">
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'c'}}></span>
                            <span className="dot" style={{gridArea: 'd'}}></span>
                            <span className="dot" style={{gridArea: 'b'}}></span>
                        </div>
                        <div className="dice-face top">
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'b'}}></span>
                            <span className="dot" style={{gridArea: 'c'}}></span>
                            <span className="dot" style={{gridArea: 'd'}}></span>
                            <span className="dot" style={{gridArea: 'g'}}></span>
                        </div>
                        <div className="dice-face bottom">
                            <span className="dot" style={{gridArea: 'a'}}></span>
                            <span className="dot" style={{gridArea: 'e'}}></span>
                            <span className="dot" style={{gridArea: 'c'}}></span>
                            <span className="dot" style={{gridArea: 'd'}}></span>
                            <span className="dot" style={{gridArea: 'i'}}></span>
                            <span className="dot" style={{gridArea: 'b'}}></span>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 animate-bounce">
                    🎲 Rolling the Dice...
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto">
                    Hang tight, we're picking a random AI tool from our directory just for you!
                </p>
            </div>
        </div>
    );
}
