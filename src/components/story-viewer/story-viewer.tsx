import { useCallback, useEffect, useRef, useState } from 'react';
import { UserFE } from '../../types/common.types';
import ProgressBar from './progress-bar';
import UserInfo from './user-info';
import StoryContent from './story-content';

type Props = {
  currentUser: UserFE;
  onSelectNextUser: () => void;
  onSelectPreviousUser: () => void;
  onClose: () => void;
  markStoryAsViewed: (userId: number, storyIndex: number) => void;
};
const StoryViewer = (props: Props) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const currentStory = props.currentUser.stories[currentStoryIndex];
  const durationInMilliSeconds = currentStory.duration * 1000;
  const intervalRef = useRef<number>(0);

  const nextStory = useCallback(() => {
    setIsImageLoaded(false);
    setProgress(0);
    if (currentStoryIndex < props.currentUser.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      props.markStoryAsViewed(props.currentUser.userId, currentStoryIndex);
    } else {
      setCurrentStoryIndex(0);
      props.onSelectNextUser();
    }
  }, [currentStoryIndex, props]);

  const previousStory = useCallback(() => {
    if (currentStoryIndex !== 0) {
      setIsImageLoaded(false);
      setProgress(0);
      if (currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
        props.markStoryAsViewed(props.currentUser.userId, currentStoryIndex);
      } else {
        setCurrentStoryIndex(props.currentUser.stories.length - 1);
        props.onSelectPreviousUser();
      }
    }
  }, [currentStoryIndex, props]);

  const startProgress = useCallback(() => {
    setProgress(0);
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / durationInMilliSeconds) * 100, 100);
      // console.log('currentProgress', currentProgress);
      if (currentProgress >= 100) {
        nextStory();
        clearInterval(intervalRef.current);
      } else {
        setProgress(currentProgress);
      }
    }, 20);
  }, [durationInMilliSeconds, nextStory]);

  useEffect(() => {
    if (isImageLoaded) {
      startProgress();
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentStory, currentStoryIndex, isImageLoaded, props]);

  const handleImageLoad = useCallback(() => {
    // console.log('handleImageLoad');
    setIsImageLoaded(true);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black opacity-90 z-50 flex flex-col">
      <ProgressBar
        totalCount={props.currentUser.stories.length}
        currentIndex={currentStoryIndex}
        progressPercentage={progress}
      />
      <UserInfo currentUser={props.currentUser} onClose={props.onClose} />
      <StoryContent
        currentStory={currentStory}
        onImageLoad={handleImageLoad}
        onClickNext={nextStory}
        onClickPrevious={previousStory}
      />
    </div>
  );
};

export default StoryViewer;
