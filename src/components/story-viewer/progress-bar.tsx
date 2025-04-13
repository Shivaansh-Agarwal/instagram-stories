type Props = {
  totalCount: number;
  currentIndex: number;
  progressPercentage: number;
};
const ProgressBar = (props: Props) => {
  return (
    <div className="flex flex-row justify-between gap-1 px-4 pt-4">
      {Array.from({ length: props.totalCount }).map((_, index) => {
        const isPrevious = index < props.currentIndex;
        const isCurrent = index === props.currentIndex;
        return (
          <div key={index} className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-white rounded-full transition-all duration-100`}
              style={{
                width: isPrevious ? '100%' : isCurrent ? `${props.progressPercentage}%` : '0%',
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
