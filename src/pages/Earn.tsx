import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle, Clock, AlertTriangle, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const TOTAL_ADS = 6;
const AD_DURATION = 30;

const Earn = () => {
  const { toast } = useToast();
  const [completedAds, setCompletedAds] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);

  // Reset timer when user leaves
  useEffect(() => {
    if (!isVisible && isWatching) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimeLeft(AD_DURATION);
      setIsWatching(false);
      toast({
        title: "Ad Reset ⚠️",
        description: "You left the page. The timer has been reset.",
        variant: "destructive",
      });
    }
  }, [isVisible, isWatching, toast]);

  // Timer countdown
  useEffect(() => {
    if (isWatching && isVisible && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    if (timeLeft === 0 && isWatching) {
      setIsWatching(false);
      setCompletedAds((prev) => prev + 1);
      setTimeLeft(AD_DURATION);
      toast({
        title: "Ad Completed! ✓",
        description: `${completedAds + 1}/${TOTAL_ADS} ads watched today.`,
      });
    }
  }, [isWatching, isVisible, timeLeft, completedAds, toast]);

  const startAd = () => {
    if (completedAds >= TOTAL_ADS) return;
    setIsWatching(true);
    setTimeLeft(AD_DURATION);
  };

  const progress = ((AD_DURATION - timeLeft) / AD_DURATION) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold font-heading gold-gradient-text">Watch & Earn</h1>
          <p className="text-muted-foreground mt-1">Watch ads to unlock your daily profit</p>
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-foreground">Today's Progress</p>
            <p className="text-sm font-bold gold-gradient-text">{completedAds}/{TOTAL_ADS} Ads</p>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full gold-gradient-bg rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedAds / TOTAL_ADS) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {completedAds >= TOTAL_ADS && (
            <div className="flex items-center gap-2 mt-3 text-success text-sm">
              <CheckCircle className="w-4 h-4" />
              All ads completed! Daily profit unlocked.
            </div>
          )}
        </motion.div>

        {/* Ad Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden mb-6"
        >
          {isWatching ? (
            <div className="relative">
              {/* Ad placeholder */}
              <div className="aspect-video bg-secondary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="text-center relative z-10">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
                  <p className="text-foreground font-heading font-bold text-lg">Ad Playing</p>
                  <p className="text-muted-foreground text-sm mt-1">Stay on this page to earn</p>
                </div>

                {/* Ad container for real ads */}
                <div id="ad-container" className="absolute inset-0 z-20" />
              </div>

              {/* Timer bar */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{timeLeft}s remaining</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <AlertTriangle className="w-3 h-3" />
                    Don't leave this page
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full gold-gradient-bg rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              {completedAds >= TOTAL_ADS ? (
                <>
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-heading text-foreground">All Done for Today!</h3>
                  <p className="text-muted-foreground text-sm mt-2">Come back tomorrow for more ads.</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-2xl gold-gradient-bg flex items-center justify-center mx-auto mb-4 animate-float">
                    <Play className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground mb-2">
                    Watch Ad #{completedAds + 1}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Watch a 30-second ad to progress. Timer resets if you leave.
                  </p>
                  <button
                    onClick={startAd}
                    className="px-8 py-3.5 gold-gradient-bg text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all gold-glow pulse-gold"
                  >
                    Start Watching
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Ad History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-bold font-heading text-foreground mb-4">Today's Ads</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {Array.from({ length: TOTAL_ADS }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  i < completedAds
                    ? "gold-gradient-bg text-primary-foreground"
                    : i === completedAds && isWatching
                    ? "border-2 border-primary text-primary animate-pulse"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < completedAds ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Earn;
