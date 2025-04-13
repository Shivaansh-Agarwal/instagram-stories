type Props = {
  onClick: () => void;
  userName: string;
  displayPic: string;
};
const Story = (props: Props) => {
  return (
    <div onClick={props.onClick} className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <img src={props.displayPic} alt={props.userName} className="w-full h-full object-cover" />
      </div>
      <span className="text-sm text-gray-500 text-center max-w-14 truncate">{props.userName}</span>
    </div>
  );
};

export default Story;
