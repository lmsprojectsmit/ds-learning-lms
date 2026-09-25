import React, { useState, useEffect, useRef } from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck
} from 'lucide-react';
import type { DSTopic } from '../types/lms';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface TopicVideoPlayerProps {
  topic: DSTopic;
  isCompleted: boolean;
  onComplete: () => void;
  onNextStep: () => void;
  isStaff?: boolean;
}

export function extractYouTubeVideoId(url: string): string {
  const match = url.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

export function parseDurationToSeconds(durationStr: string): number {
  const match = durationStr.match(/(\d+)\s*(?:min|mins|m)/i);
  if (match) {
    return parseInt(match[1], 10) * 60;
  }
  const secMatch = durationStr.match(/(\d+)\s*(?:sec|secs|s)/i);
  if (secMatch) {
    return parseInt(secMatch[1], 10);
  }
  return 600; // default 10 minutes
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const TopicVideoPlayer: React.FC<TopicVideoPlayerProps> = ({
  topic,
  isCompleted,
  onComplete,
  onNextStep,
  isStaff = false
}) => {
  const estimatedDuration = parseDurationToSeconds(topic.video.duration);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(estimatedDuration);
  const [maxWatchedTime, setMaxWatchedTime] = useState<number>(0);
  const [skipWarning, setSkipWarning] = useState<string | null>(null);

  const maxWatchedRef = useRef<number>(0);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  // Initialize completed state if already completed
  useEffect(() => {
    if (isCompleted) {
      setCurrentTime(duration);
      setMaxWatchedTime(duration);
      maxWatchedRef.current = duration;
    }
  }, [isCompleted, duration]);

  // Load YouTube IFrame API script
  useEffect(() => {
    let isMounted = true;

    const loadApi = () => {
      if (window.YT && window.YT.Player) {
        if (isMounted) initPlayer();
        return;
      }

      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        if (isMounted) initPlayer();
      };

      // Fallback poll in case callback was already consumed
      const timer = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(timer);
          if (isMounted) initPlayer();
        }
      }, 300);

      return () => clearInterval(timer);
    };

    const initPlayer = () => {
      const iframeId = `yt-iframe-${topic.id}`;
      const element = document.getElementById(iframeId);
      if (!element || playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player(iframeId, {
          width: '100%',
          height: '100%',
          events: {
            onReady: (e: any) => {
              if (!isMounted) return;
              const realDur = e.target.getDuration();
              if (realDur && realDur > 0) {
                setDuration(realDur);
              }
            },
            onStateChange: (e: any) => {
              if (!isMounted) return;
              // e.data === 0 (ENDED)
              if (e.data === 0) {
                onComplete();
              }
            }
          }
        });
      } catch (err) {
        console.warn('YouTube Player API binding:', err);
      }
    };

    loadApi();

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      try {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      } catch {
        // ignore cleanup error
      }
    };
  }, [topic.id, onComplete]);

  // Anti-skip polling and continuous progress verification
  useEffect(() => {
    if (isCompleted) return;

    intervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const cur = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration() || duration;
          if (dur > 0 && dur !== duration) {
            setDuration(dur);
          }

          if (cur > 0) {
            // Anti-skipping forward check:
            // If the user tries to jump/seek forward past what they've already watched:
            if (cur > maxWatchedRef.current + 3.0) {
              playerRef.current.seekTo(maxWatchedRef.current, true);
              setSkipWarning('⚠️ Fast-forwarding is restricted! Please watch the full video sequentially to unlock Step 3.');
              setTimeout(() => setSkipWarning(null), 3500);
            } else {
              // Valid continuous playback
              if (cur > maxWatchedRef.current) {
                maxWatchedRef.current = cur;
                setMaxWatchedTime(cur);
              }
              setCurrentTime(cur);

              // Auto-completion if 98% has been watched
              if (dur > 0 && maxWatchedRef.current >= dur - 3) {
                onComplete();
              }
            }
          }
        } catch {
          // ignore postMessage edge case
        }
      }

    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCompleted, duration, onComplete]);

  const watchedSeconds = Math.max(maxWatchedTime, isCompleted ? duration : 0);
  const progressPct = isCompleted 
    ? 100 
    : Math.min(100, Math.round((watchedSeconds / (duration || 1)) * 100));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sky-400">
          <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold">Step 2: Videos</div>
            <h3 className="text-2xl font-bold text-white">Watch Video Explanations</h3>
          </div>
        </div>

        {/* Staff quick bypass option */}
        {isStaff && !isCompleted && (
          <button
            type="button"
            onClick={onComplete}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all"
            title="Faculty / Admin bypass to inspect subsequent steps"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Faculty Preview: Unlock Step 3</span>
          </button>
        )}
      </div>

      {/* Progress & Requirement Banner */}
      {isCompleted ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center space-x-2">
                <span>Video Requirement Completed</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  100% Watched
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                You have watched the complete video explanation. Step 3 (Materials) and the remaining learning track are now fully unlocked!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNextStep}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>Proceed to Step 3</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-3.5 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-1.5">
                  <span>Mandatory Video Completion</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    Anti-Skip Enforced
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  You must watch this video explanation completely without skipping ahead to unlock Step 3 (Materials).
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sky-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <span className="text-slate-500">|</span>
              <span className="text-sky-300">{progressPct}%</span>
            </div>
          </div>

          {/* Visual Watch Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden relative p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Current Progress: <strong className="text-slate-200">{progressPct}% watched</strong></span>
              <span>Requirement: <strong className="text-amber-400">100% required to unlock</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Anti-Skip Warning Alert */}
      {skipWarning && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/60 text-rose-200 text-xs font-medium flex items-center space-x-3 shadow-lg animate-in fade-in duration-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 animate-bounce" />
          <div>
            <div className="font-bold text-rose-300">Fast-forwarding is restricted!</div>
            <div className="text-rose-200/90">{skipWarning}</div>
          </div>
        </div>
      )}

      {/* Video Player Frame - Aligned 16:9 to Screen with zero letterbox cutoff */}
      <div className="w-full flex justify-center">
        <div 
          className="video-embed-container rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-black shadow-2xl relative w-full"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#000000',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7)'
          }}
        >
          <iframe
            id={`yt-iframe-${topic.id}`}
            src={`${topic.video.url}?enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}&rel=0&modestbranding=1`}
            title={topic.video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Video Chapters / Key Highlights */}
      <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-white text-base">Key Video Highlights</h4>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-medium">
            Duration: {topic.video.duration}
          </span>
        </div>
        <div className="space-y-2">
          {topic.video.transcriptHighlights.map((hl, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
              <span className="text-sky-400 font-mono font-bold">▸</span>
              <span>{hl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
