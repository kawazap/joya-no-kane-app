import React, { useState, useEffect, useRef } from 'react';
import { Bell, Cake } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';  

const BELL_SOUND_PATH = '/static/media/kane.mp3';

const ARBellApp = () => {
  const [bellCount, setBellCount] = useState(0);
  const [showNewYear, setShowNewYear] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isRinging, setIsRinging] = useState(false);  
  const [showText, setShowText] = useState(false);
  const [showRunningSnake, setShowRunningSnake] = useState(false);
  const [showRainbowText, setShowRainbowText] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());

    const fetchInitialCount = async () => {
      try {
        const { data, error } = await supabase
          .from('bell_counts')
          .select('count')
          .single();
        
        if (error) {
          console.error('Error fetching count:', error);
          return;
        }
        
        setBellCount(data.count);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchInitialCount();

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(new Date());
      if (now.getMonth() === 0 && now.getDate() === 1 && now.getHours() >= 1) {
        setShowNewYear(true);
      }
    }, 1000);
    if (audioRef.current) {
      audioRef.current.src = BELL_SOUND_PATH;
      audioRef.current.load();
      audioRef.current.volume = 0.5;
    }

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const ringBell = async () => {
    try {
      setIsRinging(true);
      setShowText(true);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        try {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Playback failed:', error);
            });
          }
        } catch (error) {
          console.error('Audio playback error:', error);
        }
      }

  const random = Math.random();
      if (random < 0.1) {
        setShowRunningSnake(true);
        setTimeout(() => setShowRunningSnake(false), 2000);
      } else if (random < 0.14) {
        setShowRainbowText(true);
        setTimeout(() => setShowRainbowText(false), 2000);
      }

      const { data, error } = await supabase.rpc('increment_bell_count');
      if (error) {
        console.error('Error:', error);
        return;
      }
      setBellCount(data);

      setTimeout(() => {
        setIsRinging(false);
        setTimeout(() => {
          setShowText(false);
        }, 500);
      }, 500);
    } catch (err) {
      console.error('Error:', err);
      setIsRinging(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <audio 
        ref={audioRef} 
        preload="auto"
        onError={(e) => console.error('Audio loading error:', e.target.error)}
      />
    <div className={`relative h-screen w-full p-4 ${
      showNewYear 
        ? 'bg-gradient-to-b from-sky-300 to-sky-100' 
        : 'bg-black bg-opacity-50'
    }`}>
      {isMounted && currentTime && (
        <div className="absolute bottom-4 right-4 text-white">
          {currentTime.toLocaleString()}
        </div>
      )}

      <div className="flex flex-col items-center justify-center h-full">
        {showNewYear ? (
          <div className="text-center relative">
            <h1 className="text-6xl font-bold text-black mb-8 font-kaisei">謹賀新年</h1>
            <div className="relative w-48 h-48 mx-auto mb-8">
              <img 
                src="/mochi.svg" 
                alt="鏡餅" 
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                }} 
              />
            </div>
            <div className="text-black text-2xl font-kaisei mb-8">
              今年も良い一年になりますように
            </div>
            <div className="text-black text-xl font-kaisei">
              退散できた煩悩数：{bellCount}
            </div>
            <div className="absolute -bottom-20 right-4">
              <div className="animate-snake">
                <img 
                  src="/snake.svg" 
                  alt="蛇" 
                  className="w-32 h-32"
                  style={{ 
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                  }} 
                />
              </div>
          </div>
        </div>
        ) : (
          <div className="text-center">
            {showText && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className={`
                    text-black text-9xl font-kaisei animate-fade-out select-none
                    tracking-wider font-bold
                    [text-shadow:_2px_2px_0_white,_-2px_-2px_0_white,_2px_-2px_0_white,_-2px_2px_0_white]
                    ${showRainbowText ? 'animate-rainbow' : ''}
                  `}
                  style={{ 
                    writingMode: 'vertical-rl',
                    fontSize: '9rem',
                  }}
                >
                  煩悩退散
                </div>
              </div>
            )}
            {showRunningSnake && (
              <div className="fixed inset-0 pointer-events-none flex items-center">
                <div className="animate-run-snake">
                  <img 
                    src="/snake.svg" 
                    alt="蛇" 
                    className="w-32 h-32"
                    style={{ 
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    }} 
                  />
                </div>
              </div>
            )}
            <div className="relative inline-block">
              <div className={`transform origin-top ${isRinging ? 'animate-ring' : ''}`}>
                <Bell size={128} className="text-white mb-8" />
              </div>
            </div>
            <div className="text-white text-2xl mb-4">皆様から寄せられた煩悩数: {bellCount}</div>
            <button 
              onClick={ringBell}
              disabled={isRinging}
              className={`
                bg-white text-black px-8 py-4 rounded-lg text-xl font-bold 
                transition-colors
                ${isRinging ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}
              `}
            >
              鐘を突く
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ARBellApp;