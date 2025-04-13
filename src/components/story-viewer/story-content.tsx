import { StoryFE } from '../../types/common.types';

type Props = {
  currentStory: StoryFE;
  onImageLoad: () => void;
  onClickNext: () => void;
  onClickPrevious: () => void;
};

const StoryContent = (props: Props) => {
  return (
    <div className="flex-1 relative">
      <img
        src={props.currentStory.url}
        alt="Story"
        className="w-full h-full object-contain"
        onLoad={props.onImageLoad}
      />
      <button
        className="absolute top-0 left-0 w-1/2 h-full bg-transparent"
        onClick={props.onClickPrevious}
      ></button>
      <button
        className="absolute top-0 right-0 w-1/2 h-full bg-transparent"
        onClick={props.onClickNext}
      ></button>
    </div>
  );
};

export default StoryContent;
